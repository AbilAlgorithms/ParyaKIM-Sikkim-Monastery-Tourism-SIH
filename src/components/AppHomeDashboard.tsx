import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Compass,
  Brain,
  Map,
  BookOpen,
  Calendar,
  Phone,
  QrCode,
  Sparkles,
  Users,
  Leaf,
  Shield,
  Heart,
  Star,
  ArrowRight,
  MapPin,
  Clock,
  Globe
} from 'lucide-react';

interface AppHomeDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AppHomeDashboard: React.FC<AppHomeDashboardProps> = ({ onNavigate }) => {
  const quickActions = [
    {
      id: 'explore',
      title: 'Explore Monasteries',
      subtitle: 'Discover sacred places',
      icon: Compass,
      color: '#4A90E2',
      bgColor: '#E3F2FD'
    },
    {
      id: 'planner',
      title: 'AI Trip Planner',
      subtitle: 'Build your itinerary',
      icon: Brain,
      color: '#F5A623',
      bgColor: '#FEF5E7'
    },
    {
      id: 'map',
      title: 'Interactive Map',
      subtitle: 'Navigate with ease',
      icon: Map,
      color: '#2ECC71',
      bgColor: '#E8F5E8'
    },
    {
      id: 'heritage',
      title: 'Cultural Heritage',
      subtitle: 'Learn traditions',
      icon: BookOpen,
      color: '#8B4513',
      bgColor: '#F5DEB3'
    }
  ];

  const featuredExperiences = [
    {
      title: 'AR Monastery Tours',
      description: 'Immersive 3D experiences',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3',
      badge: 'New',
      action: () => console.log('AR Tours')
    },
    {
      title: 'Cultural Events',
      description: 'Festivals & ceremonies',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3',
      badge: 'Live',
      action: () => onNavigate('events')
    },
    {
      title: 'Safety Dashboard',
      description: 'Real-time monitoring',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3',
      badge: 'Safe',
      action: () => onNavigate('emergency')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Welcome Section */}
      <div 
        className="relative px-6 pt-8 pb-12"
        style={{
          background: 'linear-gradient(135deg, #4A90E2 0%, #2ECC71 100%)'
        }}
      >
        <div className="text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl mb-2">Welcome to Sikkim</h1>
              <p className="text-white/90">Your spiritual journey begins here</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm">Today's Weather</p>
                <p className="text-xl">16°C • Gangtok</p>
              </div>
              <div className="text-right">
                <p className="text-white/90 text-sm">Air Quality</p>
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-0"
                >
                  Good
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-10">
        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate(action.id)}
              >
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: action.bgColor }}
                  >
                    <action.icon className="w-6 h-6" style={{ color: action.color }} />
                  </div>
                  <h3 className="text-base mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Experiences */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Featured Experiences</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {featuredExperiences.map((experience, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={experience.action}
              >
                <div className="flex">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <ImageWithFallback
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      variant="secondary"
                      className="absolute top-2 left-2 text-xs"
                      style={{
                        backgroundColor: experience.badge === 'New' ? '#F5A623' : 
                                        experience.badge === 'Live' ? '#E74C3C' : '#2ECC71',
                        color: 'white'
                      }}
                    >
                      {experience.badge}
                    </Badge>
                  </div>
                  <CardContent className="flex-1 p-4">
                    <h3 className="text-base mb-1">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{experience.description}</p>
                    <div className="flex items-center text-primary">
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Community Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-lg">2,847</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Travelers</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Leaf className="w-5 h-5 text-nature-accent mr-2" />
                  <span className="text-lg">245T</span>
                </div>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Quick Access */}
        <Card 
          className="border-0 shadow-lg mb-8 cursor-pointer"
          onClick={() => onNavigate('emergency')}
          style={{ backgroundColor: '#FEF5E7' }}
        >
          <CardContent className="p-4">
            <div className="flex items-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: '#F5A623' }}
              >
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base mb-1">Emergency Assistance</h3>
                <p className="text-sm text-muted-foreground">24/7 support & safety monitoring</p>
              </div>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Your Recent Activity</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: '#E3F2FD' }}
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Visited Rumtek Monastery</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <Star className="w-4 h-4 text-accent" />
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: '#FEF5E7' }}
                  >
                    <Calendar className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Attended Losar Festival</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: '#E8F5E8' }}
                  >
                    <QrCode className="w-4 h-4 text-nature-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Completed AR Temple Tour</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">+50 XP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

AppHomeDashboard.displayName = 'AppHomeDashboard';