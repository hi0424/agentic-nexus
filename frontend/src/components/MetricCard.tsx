import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
  delay?: number;
}

export function MetricCard({ title, value, icon: Icon, trend, color = '#00FFFF', delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring' }}
    >
      <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
        <div 
          className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: color }}
        />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            {trend && (
              <span className="text-xs text-secondary">
                {trend}
              </span>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl" style={{ color }}>{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
