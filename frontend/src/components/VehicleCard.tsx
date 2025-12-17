import { motion } from 'motion/react';
import { Car, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface VehicleCardProps {
  id: string;
  model: string;
  location: string;
  healthScore: number;
  alerts: number;
  nextService: string;
  delay?: number;
}

export function VehicleCard({ id, model, location, healthScore, alerts, nextService, delay = 0 }: VehicleCardProps) {
  const healthColor = healthScore >= 80 ? '#8FFF6F' : healthScore >= 50 ? '#FFB347' : '#FF4466';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring' }}
    >
      <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-foreground">{model}</h4>
                <p className="text-xs text-muted-foreground">{id}</p>
              </div>
            </div>
            {alerts > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {alerts}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Health Score</span>
              <span className="text-sm" style={{ color: healthColor }}>{healthScore}%</span>
            </div>
            <Progress value={healthScore} className="h-2" style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
            }} />
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {location}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              Next Service
            </div>
            <span className="text-xs text-secondary">{nextService}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
