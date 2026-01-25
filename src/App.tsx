import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { HeroSection } from './components/HeroSection';
import { TopMonasteriesSection } from './components/TopMonasteriesSection';
import { AIItineraryBuilder } from './components/AIItineraryBuilder';
import { EmergencyContacts } from './components/EmergencyContacts';
import { CulturalEvents } from './components/CulturalEvents';
import { CulturalRoots } from './components/CulturalRoots';
import { CommunityHub } from './components/CommunityHub';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { Sparkles, MapPin, Heart, Compass } from 'lucide-react';

// Minimal essential features section
function EssentialFeatures() {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Sacred Journey",
      description: "Discover spiritual peace in ancient monasteries",
      color: "bg-gradient-to-br from-primary to-primary/80"
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "AI Guide",
      description: "Personalized spiritual itineraries",
      color: "bg-gradient-to-br from-accent to-accent/80"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Sacred Places",
      description: "Find nearby monasteries & meditation spots",
      color: "bg-gradient-to-br from-nature-accent to-nature-accent/80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 1]
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-sm group cursor-pointer overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div 
                    className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="mb-2 text-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {feature.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigation = (tab: string) => {
    setCurrentView(tab);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'events':
        return <CulturalEvents />;
      case 'heritage':
        return <CulturalRoots />;
      case 'community':
        return <CommunityHub />;
      case 'emergency':
        return <EmergencyContacts />;
      case 'home':
      default:
        return (
          <div className="space-y-0">
            {/* Hero - Clean and focused */}
            <section id="home" className="relative">
              <HeroSection />
            </section>
            
            {/* Essential Features - Minimal cards */}
            <EssentialFeatures />
            
            {/* Top Monasteries - Core content */}
            <section id="monasteries" className="py-16 bg-muted/30">
              <TopMonasteriesSection />
            </section>
            
            {/* AI Itinerary - Main interactive feature */}
            <section id="explore" className="py-16">
              <AIItineraryBuilder />
            </section>
            
            {/* Simple CTA Section */}
            <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="container mx-auto px-6 text-center max-w-2xl">
                <div className="space-y-6">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Your Journey
                  </Badge>
                  <h2 className="text-2xl text-foreground">
                    Ready to explore Sikkim's sacred places?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Begin your spiritual journey with personalized recommendations and local insights.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleNavigation('explore')}
                    >
                      Plan My Visit
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={() => handleNavigation('heritage')}
                    >
                      Learn Culture
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20">
        {renderCurrentView()}
      </main>
      
      <BottomNavigation onNavigate={handleNavigation} activeTab={currentView} />
      <Toaster />
    </div>
  );
}
