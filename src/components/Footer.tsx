import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Phone, Mail, Globe, Heart, Leaf, Shield, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/60 py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Sikkim Monasteries</h3>
                  <p className="text-sm text-muted-foreground">AI-Powered Cultural Journey</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover the sacred monasteries of Sikkim with cutting-edge AI technology, 
                immersive AR experiences, and sustainable tourism practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Safe Travel
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco-Friendly
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-medium">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#monasteries" className="text-muted-foreground hover:text-primary transition-colors">Monastery Map</a></li>
                <li><a href="#ar-tours" className="text-muted-foreground hover:text-primary transition-colors">AR Experiences</a></li>
                <li><a href="#explore" className="text-muted-foreground hover:text-primary transition-colors">AI Itinerary Builder</a></li>
                <li><a href="#safety" className="text-muted-foreground hover:text-primary transition-colors">Safety System</a></li>
                <li><a href="#community" className="text-muted-foreground hover:text-primary transition-colors">Community Hub</a></li>
              </ul>
            </div>

            {/* Featured Monasteries */}
            <div className="space-y-4">
              <h4 className="font-medium">Top Monasteries</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Rumtek Monastery</li>
                <li className="text-muted-foreground">Pemayangtse Monastery</li>
                <li className="text-muted-foreground">Enchey Monastery</li>
                <li className="text-muted-foreground">Tashiding Monastery</li>
                <li className="text-muted-foreground">Phodong Monastery</li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-4">
              <h4 className="font-medium">Support</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+91-3592-202721</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">help@sikkimmonasteries.ai</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Gangtok, Sikkim, India</span>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Languages Supported</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">English</Badge>
                  <Badge variant="outline" className="text-xs">हिंदी</Badge>
                  <Badge variant="outline" className="text-xs">नेपाली</Badge>
                  <Badge variant="outline" className="text-xs">Lepcha</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Features Highlight */}
          <Card className="mb-8 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 border-orange-200 dark:border-orange-800">
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Why Choose Our Platform?</h3>
                <p className="text-muted-foreground">Experience the future of cultural tourism</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-1">AI-Powered</h4>
                  <p className="text-sm text-muted-foreground">Personalized itineraries & smart recommendations</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-1">Safety First</h4>
                  <p className="text-sm text-muted-foreground">Real-time alerts & emergency assistance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-1">Immersive AR</h4>
                  <p className="text-sm text-muted-foreground">360° tours & digital ritual experiences</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium mb-1">Sustainable</h4>
                  <p className="text-sm text-muted-foreground">Eco-friendly practices & community support</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Contacts */}
          <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">Emergency Contacts</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">24/7 assistance available</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm text-red-700 dark:text-red-300">Tourist Helpline: <strong>+91-3592-202721</strong></div>
                  <div className="text-sm text-red-700 dark:text-red-300">Emergency: <strong>100</strong></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Bottom Bar */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © 2024 Sikkim Monasteries AI Platform. Preserving culture through technology.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cultural Guidelines</a>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for preserving Sikkim's sacred heritage</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}