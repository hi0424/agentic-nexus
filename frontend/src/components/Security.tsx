import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { AgentNode } from './AgentNode';
import { AlertTriangle, CheckCircle, Shield, Eye, Activity } from 'lucide-react'

const agentActivity = [
  { time: '14:32:15', agent: 'Master Agent', action: 'System health check initiated', risk: 'low' },
  { time: '14:31:45', agent: 'Diagnosis Agent', action: 'Vehicle scan completed - VH-2024-003', risk: 'low' },
  { time: '14:30:22', agent: 'Customer Agent', action: 'Appointment booking request', risk: 'medium' },
  { time: '14:29:18', agent: 'Scheduling Agent', action: 'Service center availability check', risk: 'low' },
  { time: '14:28:55', agent: 'UEBA Monitor', action: 'Behavioral pattern analysis complete', risk: 'low' },
  { time: '14:27:33', agent: 'Customer Agent', action: 'Unusual API call pattern detected', risk: 'high' },
  { time: '14:26:10', agent: 'Master Agent', action: 'Security audit triggered', risk: 'medium' },
  { time: '14:25:42', agent: 'UEBA Monitor', action: 'Anomaly investigation completed', risk: 'low' },
];

interface SecurityAlert {
  title: string
  description: string
  action: string
  riskScore: number
  status: 'verified' | 'cleared'
  source: 'UEBA' | 'Derived'
}

export function Security({
  selectedVehicle,
}: {
  selectedVehicle?: { id: string; run: any; healthScore: number }
}) {
  const [alert, setAlert] = useState<SecurityAlert | null>(null)
  useEffect(() => {
    if (!selectedVehicle) {
      setAlert(null)
      return
    }

    const run = selectedVehicle.run || {}
    const diagnosis = run.diagnosis
    const ueba = run.ueba_alert
    const health = selectedVehicle.healthScore
  
    // 1️⃣ True UEBA anomaly
    if (ueba) {
      setAlert({
        title: ueba.title || 'UEBA Anomaly Detected',
        description: ueba.description,
        action: ueba.action,
        riskScore: ueba.risk_score ?? 70,
        status: 'verified',
        source: 'UEBA',
      })
      return
    }

    // 2️⃣ Derived operational security risk
    if (health < 45 || diagnosis?.priority === 'HIGH') {
      setAlert({
        title: 'Operational Risk Escalation',
        description: `Vehicle ${selectedVehicle.id} shows high failure probability.`,
        action:
          'Vehicle flagged for continuous monitoring and escalation.',
        riskScore: 60,
        status: 'verified',
        source: 'Derived',
      })
      return
    }

    // 3️⃣ Clean state
    setAlert({
      title: 'No Active Security Threats',
      description: 'All monitored parameters are within safe limits.',
      action: 'Continuous monitoring active.',
      riskScore: 20,
      status: 'cleared',
      source: 'Derived',
    })
  }, [selectedVehicle?.id])

  if (!alert) {
    return (
      <div className="min-h-screen bg-background p-6">
        <p className="text-muted-foreground">
          Select a vehicle to view security intelligence.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl text-primary mb-2">Security & UEBA</h1>
          <p className="text-muted-foreground">
            Behavioral and operational threat intelligence
          </p>
        </motion.div>

        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-accent animate-pulse" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-accent">{alert.title}</h3>
                <Badge variant="outline">
                  {alert.source === 'UEBA' ? 'Live UEBA' : 'Derived Intelligence'}
                </Badge>
              </div>

              <p className="text-sm mb-2">{alert.description}</p>
              <p className="text-sm text-secondary mb-3">
                <strong>Action:</strong> {alert.action}
              </p>

              <div className="flex justify-between">
                <Badge
                  variant={alert.riskScore >= 70 ? 'destructive' : 'outline'}
                >
                  Risk Score: {alert.riskScore}
                </Badge>
                <Badge className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {alert.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agent Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-primary">Agent Behavior Network</h2>
                <Badge variant="outline" className="ml-auto">Live Monitoring</Badge>
              </div>
              
              <div className="relative w-full h-[500px]">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />

                {/* Center glow */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* UEBA Monitor connections */}
                  {[
                    { x1: '50%', y1: '20%', x2: '50%', y2: '50%' },
                    { x1: '50%', y1: '20%', x2: '25%', y2: '35%' },
                    { x1: '50%', y1: '20%', x2: '75%', y2: '35%' },
                    { x1: '50%', y1: '20%', x2: '20%', y2: '65%' },
                    { x1: '50%', y1: '20%', x2: '80%', y2: '65%' },
                    { x1: '50%', y1: '20%', x2: '40%', y2: '80%' },
                    { x1: '50%', y1: '20%', x2: '60%', y2: '80%' },
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#00FFFF"
                      strokeWidth="1.5"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  ))}
                  
                  {/* Data flow animation */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.circle
                      key={i}
                      r="3"
                      fill="#8FFF6F"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        cx: ['50%', i === 0 ? '50%' : i === 1 ? '25%' : i === 2 ? '75%' : i === 3 ? '20%' : i === 4 ? '80%' : i === 5 ? '40%' : '60%'],
                        cy: ['20%', i === 0 ? '50%' : i === 1 ? '35%' : i === 2 ? '35%' : i === 3 ? '65%' : i === 4 ? '65%' : i === 5 ? '80%' : '80%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </svg>

                {/* UEBA Monitor - Top Center */}
                <AgentNode name="UEBA Monitor" type="master" status="active" position={{ x: 45, y: 12 }} />
                
                {/* Master Agent - Center */}
                <AgentNode name="Master Agent" type="master" status="active" position={{ x: 45, y: 45 }} />
                
                {/* Worker Agents in circle */}
                <AgentNode name="Diagnosis" type="diagnosis" status="active" position={{ x: 20, y: 30 }} />
                <AgentNode name="Customer" type="customer" status="active" position={{ x: 70, y: 30 }} />
                <AgentNode name="Scheduling" type="scheduling" status="active" position={{ x: 15, y: 60 }} />
                <AgentNode name="Feedback" type="feedback" status="active" position={{ x: 75, y: 60 }} />
                <AgentNode name="Manufacturing" type="manufacturing" status="active" position={{ x: 35, y: 75 }} />
                <AgentNode name="Security" type="diagnosis" status="active" position={{ x: 55, y: 75 }} />
              </div>

              <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <p className="text-sm text-secondary">All agents operating within expected behavioral parameters</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Agent Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-primary" />
                <h2 className="text-primary">Activity Timeline</h2>
              </div>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {agentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="relative pl-6 pb-3 border-l-2 border-border/30 last:border-l-0"
                  >
                    <div 
                      className={`absolute left-[-5px] top-0 w-3 h-3 rounded-full ${
                        activity.risk === 'high' ? 'bg-destructive' :
                        activity.risk === 'medium' ? 'bg-accent' :
                        'bg-secondary'
                      }`}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <Badge variant="outline" className="text-[10px] h-5">
                          {activity.agent}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          activity.risk === 'high' ? 'bg-destructive' :
                          activity.risk === 'medium' ? 'bg-accent' :
                          'bg-secondary'
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">{activity.risk} risk</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
        <Card className="p-6 text-center bg-card/50">
          <Shield className="w-8 h-8 mx-auto text-secondary mb-2" />
          <p className="text-sm text-muted-foreground">
            Security engine continuously evaluates behavioral and operational
            signals.
          </p>
        </Card>
      </div>
    </div>
  )
}
