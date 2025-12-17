import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { VehicleCard } from './VehicleCard';
import { MetricCard } from './MetricCard';
import { AgentNode } from './AgentNode';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Activity, Zap, AlertTriangle,
  Car, Grid3x3, Eye
} from 'lucide-react';
import { fetchVehicleRun } from '../api/autoAI';

/* =========================
   STATIC FLEET (CRITICAL)
   ========================= */
const FLEET_IDS = [
  'V001','V002','V003','V004','V005',
  'V006','V007','V008','V009','V010'
];

/* =========================
   MOCK TIME SERIES (UNCHANGED)
   ========================= */
const engineData = [
  { time: '00:00', temp: 85, rpm: 1200, voltage: 12.6 },
  { time: '04:00', temp: 88, rpm: 1500, voltage: 12.5 },
  { time: '08:00', temp: 92, rpm: 2200, voltage: 12.4 },
  { time: '12:00', temp: 95, rpm: 2800, voltage: 12.3 },
  { time: '16:00', temp: 98, rpm: 3200, voltage: 12.2 },
  { time: '20:00', temp: 102, rpm: 2900, voltage: 12.1 },
  { time: '24:00', temp: 105, rpm: 2400, voltage: 12.0 },
];

export function Dashboard({
  onSelectVehicle,
  }: {
  onSelectVehicle: (vehicle: any) => void;
  }) {
  const [view, setView] = useState<'fleet' | 'single'>('fleet');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [upcomingServices, setUpcomingServices] = useState<any[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([]);

  /* =========================
     LOAD BACKEND DATA
     ========================= */
  useEffect(() => {
    async function loadFleet() {
      const built: any[] = [];
      const services: any[] = [];
      const security: any[] = [];

      for (const id of FLEET_IDS) {
        try {
          const run = await fetchVehicleRun(id);

          const confidence = run?.signal?.confidence ?? 0.3;
          const healthScore = Math.round((1 - confidence) * 100);

          let alerts = 0;
          if (run?.ueba_alert) alerts++;
          if (run?.signal?.severity === 'CRITICAL') alerts++;
          if (run?.decision === 'ENGAGE_CUSTOMER') alerts++;
          if (healthScore < 40) alerts += 2;       // critical risk
          else if (healthScore < 70) alerts += 1;  // warning

          if (healthScore < 40) {
          security.push({
          time: 'Just now',
          message: `Critical health risk detected (${healthScore}%) for ${id}`,
          severity: 'high',
         });
         } else if (healthScore < 70) {
          security.push({
          time: 'Just now',
          message: `Degrading health detected (${healthScore}%) for ${id}`,
          severity: 'medium',
        });
         }

          if (run?.booking) {
            services.push({
              vehicle: id,
              service: run.diagnosis?.failure ?? 'Service Required',
              date: run.booking.slot,
              location: run.booking.service_center,
            });
          }

          if (run?.ueba_alert) {
            security.push({
              time: 'Just now',
              message: run.ueba_alert,
              severity: 'high',
            });
          }

          built.push({
            id,
            model: 'Electric Vehicle',
            location: 'India',
            healthScore,
            alerts,
            nextService: run?.booking?.slot ?? 'Not scheduled',
            run,
          });
        } catch (e) {
          console.error('Backend error for', id, e);
        }
      }

      setVehicles(built);
      if (built.length > 0) {
      setSelectedVehicleId(built[0].id);
      onSelectVehicle(built[0]); 
      }
      setUpcomingServices(services);
      setSecurityAlerts(security);
    }

    loadFleet();
  }, []);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  /* =========================
     METRICS
     ========================= */
  const activeAlerts = vehicles.reduce((a, v) => a + v.alerts, 0);
  const avgHealth =
    vehicles.length > 0
      ? Math.round(vehicles.reduce((a, v) => a + v.healthScore, 0) / vehicles.length)
      : 0;

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl mb-2 text-primary">Live Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time vehicle health monitoring and agent activity
            </p>
          </div>

          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList>
              <TabsTrigger value="fleet" className="gap-2">
                <Grid3x3 className="w-4 h-4" />
                Fleet View
              </TabsTrigger>
              <TabsTrigger value="single" className="gap-2">
                <Eye className="w-4 h-4" />
                Single Vehicle
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Active Vehicles" value={vehicles.length.toString()} icon={Car} />
          <MetricCard title="Active Alerts" value={activeAlerts.toString()} icon={AlertTriangle} />
          <MetricCard title="Avg Health Score" value={`${avgHealth}%`} icon={Activity} />
          <MetricCard title="AI Agents Active" value="6/6" icon={Zap} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">

            {/* FLEET VIEW */}
            {view === 'fleet' && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="mb-4 text-primary">Fleet Overview</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {vehicles.map((v, i) => (
                    <div
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicleId(v.id);
                         onSelectVehicle(v);   
                        setView('single');
                      }}
                    >
                      <VehicleCard {...v} delay={i * 0.05} />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* SINGLE VIEW */}
            {view === 'single' && selectedVehicle && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-primary">{selectedVehicle.model}</h3>
                    <p className="text-sm text-muted-foreground">{selectedVehicle.id}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={selectedVehicleId ?? ''}
                      onChange={(e) => {
                      const id = e.target.value;
                      setSelectedVehicleId(id);

                      const vehicle = vehicles.find(v => v.id === id);
                      if (vehicle) onSelectVehicle(vehicle);
                      }}

                      className="bg-muted/30 border border-border/40 rounded-md px-2 py-1 text-sm"
                    >
                      {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.id}</option>
                      ))}
                    </select>

                    <Badge
                   variant={
                   selectedVehicle.healthScore < 40 ? 'destructive': selectedVehicle.healthScore < 70 ? 'secondary': 'default'
                   }>
                    Health: {selectedVehicle.healthScore}%
                   </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={engineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="temp" stroke="#FFB347" />
                    </AreaChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={engineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="voltage" stroke="#8FFF6F" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* MASTER AGENT CONSOLE */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="mb-4 text-primary">Master Agent Console</h3>
              <div className="relative w-full h-80">
                <AgentNode name="Master" type="master" status="active" position={{ x: 45, y: 45 }} />
                <AgentNode name="Diagnosis" type="diagnosis" status="active" position={{ x: 25, y: 12 }} />
                <AgentNode name="Customer" type="customer" status="active" position={{ x: 65, y: 12 }} />
                <AgentNode name="Scheduling" type="scheduling" status="pending" position={{ x: 75, y: 45 }} />
                <AgentNode name="Feedback" type="feedback" status="active" position={{ x: 65, y: 75 }} />
                <AgentNode name="Manufacturing" type="manufacturing" status="active" position={{ x: 25, y: 75 }} />
                <AgentNode
                  name="Security"
                  type="diagnosis"
                  status={selectedVehicle?.run?.ueba_alert ? 'anomaly' : 'active'}
                  position={{ x: 15, y: 45 }}
                />
              </div>
            </Card>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* UPCOMING SERVICES */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="mb-4 text-primary">Upcoming Services</h3>
              <div className="space-y-4">
                {upcomingServices.length === 0 && (
                  <p className="text-sm text-muted-foreground">No scheduled services</p>
                )}
                {upcomingServices.map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-sm">{s.vehicle}</p>
                    <p className="text-xs text-muted-foreground">{s.service}</p>
                    <p className="text-xs text-secondary">{s.location}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* SECURITY MONITOR */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="mb-4 text-primary">Security Monitor</h3>
              <div className="space-y-3">
                {securityAlerts.length === 0 && (
                  <p className="text-sm text-muted-foreground">No security anomalies</p>
                )}
                {securityAlerts.map((a, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-xs">{a.message}</p>
                    <p className="text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}