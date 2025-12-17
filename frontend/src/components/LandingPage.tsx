import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AgentNode } from './AgentNode';
import { Wrench, Bot, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';

export function LandingPage({
  onStart,
}: {
  onStart: () => void;
}) {
  const features = [
    {
      icon: Wrench,
      title: 'Predict Failures Before They Happen',
      description: 'AI-powered diagnostics analyze thousands of data points in real-time',
      color: '#00FFFF',
    },
    {
      icon: Bot,
      title: 'Autonomous Voice Agent Scheduling',
      description: 'Natural conversation for seamless service booking and updates',
      color: '#8FFF6F',
    },
    {
      icon: TrendingUp,
      title: 'RCA/CAPA Feedback to Manufacturing',
      description: 'Close the loop with actionable insights to improve vehicle design',
      color: '#FFB347',
    },
    {
      icon: Shield,
      title: 'UEBA Security & Trust Layer',
      description: 'Behavioral analytics ensure every action is verified and secure',
      color: '#9D4EDD',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760012945940-74d6bf54c0fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2FyJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA2MjEyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Futuristic car technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Powered by Agentic AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Smarter Drive, Safer Future
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Autonomous Predictive Maintenance with Agentic AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Try Demo <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10" onClick={onStart}>
              Monitor Your Fleet
            </Button>
            <Button size="lg" variant="ghost" className="gap-2 text-foreground hover:bg-muted">
              Learn How It Works
            </Button>
          </motion.div>

          {/* Agent Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative w-full max-w-2xl h-80 mx-auto mb-20"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full" />
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              {[
                { x1: '50%', y1: '50%', x2: '50%', y2: '15%' },
                { x1: '50%', y1: '50%', x2: '85%', y2: '30%' },
                { x1: '50%', y1: '50%', x2: '85%', y2: '70%' },
                { x1: '50%', y1: '50%', x2: '50%', y2: '85%' },
                { x1: '50%', y1: '50%', x2: '15%', y2: '70%' },
                { x1: '50%', y1: '50%', x2: '15%', y2: '30%' },
              ].map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#00FFFF"
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Master Agent */}
            <AgentNode name="Master Agent" type="master" status="active" position={{ x: 45, y: 45 }} delay={0.8} />
            
            {/* Worker Agents */}
            <AgentNode name="Diagnosis" type="diagnosis" status="active" position={{ x: 45, y: 5 }} delay={1.0} />
            <AgentNode name="Customer" type="customer" status="active" position={{ x: 80, y: 25 }} delay={1.1} />
            <AgentNode name="Scheduling" type="scheduling" status="pending" position={{ x: 80, y: 65 }} delay={1.2} />
            <AgentNode name="Feedback" type="feedback" status="active" position={{ x: 45, y: 80 }} delay={1.3} />
            <AgentNode name="Manufacturing" type="manufacturing" status="active" position={{ x: 10, y: 65 }} delay={1.4} />
            <AgentNode name="Security" type="diagnosis" status="active" position={{ x: 10, y: 25 }} delay={1.5} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4 text-primary">Intelligent Automation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our agentic AI system works autonomously to keep your vehicles running at peak performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative overflow-hidden p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: feature.color }}
                />
                
                <div className="relative">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  
                  <h3 className="mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative">
              <h2 className="text-4xl mb-4 text-primary">Ready to Transform Your Fleet?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join leading automotive companies using AI to predict, prevent, and optimize vehicle maintenance
              </p>
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
