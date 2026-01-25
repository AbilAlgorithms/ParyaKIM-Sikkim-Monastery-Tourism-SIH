import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Shield, AlertTriangle, MapPin, Phone, Cloud, Route, Navigation, Heart, Zap } from 'lucide-react';

export function SafetySystem() {
  const [sosActive, setSosActive] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState(false);

  const safetyAlerts = useMemo(() => [
    {
      type: 'weather',
      severity: 'low',
      title: 'Light Rain Expected',
      description: 'Light rainfall expected at Rumtek Monastery area from 2-4 PM',
      time: '2 hours ago',
      icon: Cloud,
      color: 'blue',
    },
    {
      type: 'traffic',
      severity: 'medium',
      title: 'Road Construction',
      description: 'Alternative route suggested for Pemayangtse Monastery',
      time: '30 minutes ago',
      icon: Route,
      color: 'yellow',
    },
    {
      type: 'crowd',
      severity: 'low',
      title: 'Peak Hours',
      description: 'High visitor volume at Enchey Monastery, best time: 6-8 AM',
      time: '1 hour ago',
      icon: MapPin,
      color: 'green',
    },
  ], []);

  const emergencyServices = useMemo(() => [
    {
      name: 'STNM Hospital',
      type: 'Primary Healthcare',
      distance: '2.3 km',
      phone: '+91-3592-202303',
      available: true,
    },
    {
      name: 'Sikkim Police',
      type: 'Emergency Services',
      distance: '1.8 km',
      phone: '100',
      available: true,
    },
    {
      name: 'Tourist Helpline',
      type: 'Tourism Support',
      distance: 'Remote',
      phone: '+91-3592-202721',
      available: true,
    },
    {
      name: 'Mountain Rescue',
      type: 'Specialized Rescue',
      distance: '5.2 km',
      phone: '+91-3592-280123',
      available: true,
    },
  ], []);

  const handleSOS = () => {
    setSosActive(true);
    // Simulate emergency activation
    setTimeout(() => {
      setSosActive(false);
      setEmergencyContacts(true);
    }, 3000);
  };

  return (
    <section id="safety" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Intelligent Safety
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Smart Safety System</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced predictive safety with real-time alerts, emergency assistance, and intelligent route optimization for secure monastery exploration
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Emergency SOS */}
            <div className="lg:col-span-1">
              <Card className={`${sosActive ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Emergency SOS</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Instant emergency assistance with live location sharing
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!sosActive && !emergencyContacts && (
                    <div className="text-center space-y-4">
                      <Button 
                        size="lg"
                        className="w-full h-16 bg-red-600 hover:bg-red-700 text-white text-lg"
                        onClick={handleSOS}
                      >
                        <Zap className="w-6 h-6 mr-2" />
                        Emergency SOS
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Press and hold for 3 seconds to activate
                      </p>
                    </div>
                  )}

                  {sosActive && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-red-600">SOS Activated</h3>
                        <p className="text-sm">Contacting emergency services...</p>
                      </div>
                      <Progress value={75} className="w-full" />
                    </div>
                  )}

                  {emergencyContacts && (
                    <div className="space-y-3">
                      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                        <Shield className="w-4 h-4" />
                        <AlertDescription>
                          Emergency services contacted. Help is on the way.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Your Location Shared With:</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>STNM Hospital Emergency</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Tourist Police Gangtok</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span>Emergency Contact: Mom</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Location</span>
                      <Badge variant="outline">GPS Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Rumtek Monastery Road, 2.3km from hospital
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Emergency Contacts */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Emergency Contacts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emergencyServices.slice(0, 2).map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <h4 className="text-sm font-medium">{service.name}</h4>
                        <p className="text-xs text-muted-foreground">{service.distance}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Safety Alerts & Route Optimization */}
            <div className="lg:col-span-2 space-y-6">
              {/* Real-time Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Real-time Safety Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {safetyAlerts.map((alert, index) => {
                    const Icon = alert.icon;
                    return (
                      <Alert key={index} className={`border-l-4 ${
                        alert.severity === 'high' ? 'border-l-red-500 bg-red-50 dark:bg-red-950/20' :
                        alert.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
                        'border-l-green-500 bg-green-50 dark:bg-green-950/20'
                      }`}>
                        <Icon className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <AlertDescription className="mt-1">
                            {alert.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    );
                  })}

                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full">
                      View All Alerts (3 new)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Route Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-blue-500" />
                    <span>Smart Route Optimization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Current Route</h4>
                        <Badge variant="secondary">Optimized</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Gangtok → Rumtek → Enchey → Return
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Distance:</span>
                          <span>28.5 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Time:</span>
                          <span>4h 30m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Safety Score:</span>
                          <Badge variant="outline" className="text-green-600">95/100</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Alternative Route</h4>
                        <Badge variant="outline">Suggested</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Gangtok → Enchey → Rumtek → Return
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Distance:</span>
                          <span>26.2 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Time:</span>
                          <span>4h 15m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avoids:</span>
                          <span className="text-orange-600">Construction</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        Switch Route
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      Live Traffic
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Cloud className="w-4 h-4 mr-1" />
                      Weather Radar
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="w-4 h-4 mr-1" />
                          All Contacts
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Emergency Services Directory</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {emergencyServices.map((service, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">{service.type}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <MapPin className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{service.distance}</span>
                                  {service.available && (
                                    <Badge variant="outline" className="text-green-600">Available</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Button size="sm">
                                  <Phone className="w-3 h-3 mr-1" />
                                  Call
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Navigation className="w-3 h-3 mr-1" />
                                  Navigate
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Crowd Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Smart Crowd Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">15</span>
                      </div>
                      <h4 className="text-sm font-medium">Rumtek</h4>
                      <p className="text-xs text-green-600">Low crowd</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">42</span>
                      </div>
                      <h4 className="text-sm font-medium">Enchey</h4>
                      <p className="text-xs text-yellow-600">Moderate</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">78</span>
                      </div>
                      <h4 className="text-sm font-medium">Tashiding</h4>
                      <p className="text-xs text-red-600">High crowd</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge variant="outline">Best time to visit: 6-8 AM, 4-6 PM</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}