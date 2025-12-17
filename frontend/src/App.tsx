import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import {VoiceAgent} from './components/VoiceAgent';
import { ManufacturingInsights } from './components/ManufacturingInsights';
import { Security } from './components/Security';
import { InnovationFeatures } from './components/InnovationFeatures';
import { Button } from './components/ui/button';
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Factory,
  Shield,
  Sparkles,
  Menu,
  X,
  Zap,
} from 'lucide-react';

type Page =
  | 'landing'
  | 'dashboard'
  | 'voice-agent'
  | 'manufacturing'
  | 'security'
  | 'innovation';

const navigation = [
  { id: 'landing' as Page, label: 'Home', icon: Home },
  { id: 'dashboard' as Page, label: 'Live Dashboard', icon: LayoutDashboard },
  { id: 'voice-agent' as Page, label: 'Voice Agent', icon: MessageSquare },
  { id: 'manufacturing' as Page, label: 'Manufacturing', icon: Factory },
  { id: 'security' as Page, label: 'Security & UEBA', icon: Shield },
  { id: 'innovation' as Page, label: 'Innovation', icon: Sparkles },
];

export default function App() {
  // ✅ HOOKS MUST LIVE INSIDE THE COMPONENT
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentPage('dashboard')} />;;

      case 'dashboard':
        return (
          <Dashboard
            onSelectVehicle={setSelectedVehicle}
          />
        );

      case 'voice-agent':
         return <VoiceAgent selectedVehicle={selectedVehicle} />

      case 'manufacturing':
        return <ManufacturingInsights />;

      case 'security':
        return <Security selectedVehicle={selectedVehicle} />;

      case 'innovation':
        return <InnovationFeatures />;

      default:
        return <LandingPage onStart={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setCurrentPage('landing');
                setMobileMenuOpen(false);
              }}
            >
              <div className="relative w-10 h-10">
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                      '0 0 30px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-background" />
                </div>
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AutoAI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Predictive Maintenance
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  className="gap-2"
                  onClick={() => setCurrentPage(item.id)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navigation.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[73px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
