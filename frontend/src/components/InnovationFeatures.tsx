import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  Sparkles, 
  QrCode, 
  Box, 
  TrendingUp, 
  Wrench, 
  Shield, 
  Trophy,
  Cpu,
  Eye,
  Layers,
  Zap,
  ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'Augmented Reality Diagnostic View',
    description: 'Scan your vehicle QR code to see live health overlay in 3D. Point your phone at any component to get real-time diagnostics, temperature, wear levels, and predictive alerts.',
    color: '#00FFFF',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1760553120930-316de067c79c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZGFzaGJvYXJkJTIwbmlnaHR8ZW58MXx8fHwxNzYwNjM4NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Box,
    title: 'Digital Twin Visualization',
    description: '3D holographic model of your vehicle updating in real-time. Watch as sensor data flows through the digital twin, identifying stress points and optimizing performance.',
    color: '#8FFF6F',
    status: 'Beta',
    image: 'https://images.unsplash.com/photo-1653491887161-aaf72d4514f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBkZXRhaWx8ZW58MXx8fHwxNzYwNTU3MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: TrendingUp,
    title: 'Fleet Optimization AI',
    description: 'ML-powered recommendations for ideal maintenance intervals and load balancing. Reduce downtime by 45% and extend vehicle lifespan by optimizing service schedules.',
    color: '#FFB347',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwxfHx8fDE3NjA2MzYzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Wrench,
    title: 'AI Mechanic Coach',
    description: 'Step-by-step repair guidance with voice instructions and AR overlays. The AI coach detects your progress and adapts instructions in real-time for complex repairs.',
    color: '#9D4EDD',
    status: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2FyJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA2MjEyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Shield,
    title: 'Counterfeit Detection Module',
    description: 'Blockchain-verified part authenticity scanner. Every genuine component comes with a digital certificate stored on distributed ledger for tamper-proof verification.',
    color: '#00FFFF',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwxfHx8fDE3NjA2MzYzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Trophy,
    title: 'Gamified Maintenance Rewards',
    description: 'Earn "Health Points" for timely servicing and safe driving. Unlock achievements, compete on leaderboards, and redeem rewards for premium services.',
    color: '#FFB347',
    status: 'Beta',
    image: 'https://images.unsplash.com/photo-1760553120930-316de067c79c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZGFzaGJvYXJkJTIwbmlnaHR8ZW58MXx8fHwxNzYwNjM4NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const techStack = [
  { name: 'Edge Computing', description: 'On-device processing for instant diagnostics', icon: Cpu },
  { name: 'Computer Vision', description: 'Visual defect detection and part recognition', icon: Eye },
  { name: 'Digital Twin Tech', description: 'Real-time 3D model synchronization', icon: Layers },
  { name: 'Predictive ML', description: 'Failure prediction with 95% accuracy', icon: Zap },
];

export function InnovationFeatures() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Next-Gen Features</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Innovation Features
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Cutting-edge technologies transforming automotive maintenance into an intelligent, 
            seamless experience
          </p>
        </motion.div>
      </section>

      {/* Main Features */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 ${
                i % 2 === 0 ? '' : ''
              }`}>
                <div className={`grid lg:grid-cols-2 gap-6 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-80 lg:h-auto ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent z-10" />
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
                      style={{ backgroundColor: feature.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className={`p-8 flex flex-col justify-center ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-14 h-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                      </div>
                      <Badge 
                        variant={feature.status === 'Available' ? 'default' : feature.status === 'Beta' ? 'secondary' : 'outline'}
                      >
                        {feature.status}
                      </Badge>
                    </div>

                    <h2 className="mb-4" style={{ color: feature.color }}>
                      {feature.title}
                    </h2>

                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>

                    <Button 
                      variant="outline" 
                      className="w-fit gap-2"
                      style={{ borderColor: `${feature.color}50`, color: feature.color }}
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-primary">Powered By Advanced Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages cutting-edge AI and computing technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="relative overflow-hidden p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <tech.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-foreground">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="relative overflow-hidden p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative">
              <h2 className="text-4xl text-center mb-12 text-primary">Impact Metrics</h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { value: '45%', label: 'Downtime Reduction' },
                  { value: '95%', label: 'Prediction Accuracy' },
                  { value: '3x', label: 'Faster Diagnostics' },
                  { value: '60%', label: 'Cost Savings' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-5xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="p-12 bg-card/50 backdrop-blur-sm border-primary/30">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl mb-4 text-primary">Experience the Future Today</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading automotive companies leveraging AI-powered innovation for smarter maintenance
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Request Demo <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                View Documentation
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
