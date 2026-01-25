import { useState } from 'react';
import * as React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  QrCode, 
  Shield, 
  Sparkles,
  Home,
  Settings,
  Camera,
  Phone,
  Calendar,
  BookOpen,
  Users
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

export function BottomNavigation({ onNavigate, activeTab: currentActiveTab }: { onNavigate?: (tab: string) => void; activeTab?: string }) {
  const [activeTab, setActiveTab] = useState(currentActiveTab || 'home');

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      href: '#home'
    },
    {
      id: 'events',
      label: 'Events',
      icon: <Calendar className="w-5 h-5" />,
      href: '#events'
    },
    {
      id: 'heritage',
      label: 'Heritage',
      icon: <BookOpen className="w-5 h-5" />,
      href: '#heritage'
    },
    {
      id: 'community',
      label: 'Community',
      icon: <Users className="w-5 h-5" />,
      href: '#community',
      badge: 'New'
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: <Phone className="w-5 h-5" />,
      href: '#emergency'
    }
  ];

  const handleTabClick = (tabId: string, href: string) => {
    const newActiveTab = currentActiveTab || tabId;
    setActiveTab(newActiveTab);
    
    // If onNavigate prop is provided, use it for navigation
    if (onNavigate) {
      onNavigate(tabId);
    } else {
      // Fallback to smooth scroll for sections that exist
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Update local state when currentActiveTab prop changes
  React.useEffect(() => {
    if (currentActiveTab) {
      setActiveTab(currentActiveTab);
    }
  }, [currentActiveTab]);

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
        <div className="flex items-center justify-around py-2 px-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.href)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 text-xs px-1 py-0 h-4 min-w-4 flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <Button 
          size="lg" 
          className="rounded-full w-14 h-14 shadow-lg text-white"
          style={{ background: 'linear-gradient(135deg, #F5A623, #E67E22)' }}
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}