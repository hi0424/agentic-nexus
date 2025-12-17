import { motion } from 'motion/react';
import { Activity, Brain, Calendar, MessageSquare, Settings, Factory } from 'lucide-react';

interface AgentNodeProps {
  name: string;
  type: 'master' | 'diagnosis' | 'customer' | 'scheduling' | 'feedback' | 'manufacturing';
  status: 'active' | 'pending' | 'anomaly';
  position?: { x: number; y: number };
  delay?: number;
}

const icons = {
  master: Brain,
  diagnosis: Activity,
  customer: MessageSquare,
  scheduling: Calendar,
  feedback: Settings,
  manufacturing: Factory,
};

const statusColors = {
  active: '#8FFF6F',
  pending: '#FFB347',
  anomaly: '#FF4466',
};

export function AgentNode({ name, type, status, position = { x: 0, y: 0 }, delay = 0 }: AgentNodeProps) {
  const Icon = icons[type];
  const isMaster = type === 'master';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className="absolute flex flex-col items-center gap-2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <motion.div
        className={`relative ${isMaster ? 'w-20 h-20' : 'w-14 h-14'} rounded-full flex items-center justify-center bg-card border-2`}
        style={{ borderColor: statusColors[status] }}
        animate={{
          boxShadow: [
            `0 0 20px ${statusColors[status]}`,
            `0 0 30px ${statusColors[status]}`,
            `0 0 20px ${statusColors[status]}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          style={{ backgroundColor: statusColors[status] }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Icon className={isMaster ? 'w-10 h-10' : 'w-7 h-7'} style={{ color: statusColors[status] }} />
      </motion.div>
      <div className="text-center">
        <p className="text-xs text-foreground/90">{name}</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColors[status] }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-muted-foreground capitalize">{status}</span>
        </div>
      </div>
    </motion.div>
  );
}
