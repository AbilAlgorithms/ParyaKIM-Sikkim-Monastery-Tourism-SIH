import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Phone, 
  Shield, 
  Heart, 
  MapPin, 
  AlertTriangle, 
  PhoneCall
} from 'lucide-react';

export const EmergencyContacts = React.memo(() => {
  const emergencyServices = React.useMemo(() => [
    {
      title: 'Police Emergency',
      number: '100',
      description: 'For immediate police assistance',
      color: '#E74C3C',
      bgColor: '#FCE8E8'
    },
    {
      title: 'Medical Emergency', 
      number: '108',
      description: 'Ambulance and medical services',
      color: '#E74C3C',
      bgColor: '#FCE8E8'
    },
    {
      title: 'Tourist Helpline',
      number: '+91-3592-202425',
      description: 'Tourism assistance 24/7',
      color: '#4A90E2',
      bgColor: '#EAF6FB'
    }
  ], []);

  return (
    <div className="min-h-screen pb-8 bg-muted">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Phone className="w-8 h-8 text-destructive" />
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
              Emergency Contacts
            </h1>
          </div>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Quick access to emergency services for your Sikkim journey
          </p>
        </div>

        {/* Emergency Services */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 flex items-center space-x-2 font-semibold text-foreground">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span>Emergency Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyServices.map((service, index) => (
              <Card 
                key={service.number}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                style={{
                  backgroundColor: service.bgColor,
                  borderRadius: '12px'
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {index === 0 && <Shield className="w-6 h-6" style={{ color: service.color }} />}
                    {index === 1 && <Heart className="w-6 h-6" style={{ color: service.color }} />}
                    {index === 2 && <MapPin className="w-6 h-6" style={{ color: service.color }} />}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <div 
                    className="text-2xl mb-3 font-bold"
                    style={{ color: service.color }}
                  >
                    {service.number}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Button 
                    className="w-full border-0"
                    style={{
                      backgroundColor: service.color,
                      color: '#ffffff'
                    }}
                  >
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <Card className="border-0 shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-foreground">
              <Shield className="w-6 h-6 text-primary" />
              <span>Safety Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-foreground">Emergency Preparedness</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Keep emergency numbers saved in your phone</li>
                  <li>• Share your itinerary with family/friends</li>
                  <li>• Carry a fully charged power bank</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-foreground">High Altitude Safety</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Stay hydrated and avoid alcohol</li>
                  <li>• Ascend gradually to prevent altitude sickness</li>
                  <li>• Check weather conditions before travel</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});