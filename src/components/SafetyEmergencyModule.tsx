import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Cloud, 
  Navigation, 
  Phone,
  MapPin,
  Clock,
  Thermometer,
  Wind,
  Eye,
  Car,
  Route,
  UserCheck,
  Heart,
  Zap,
  CheckCircle,
  XCircle,
  Radio,
  Satellite,
  Battery,
  Signal
} from 'lucide-react';

interface WeatherAlert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  affectedAreas: string[];
  recommendation: string;
}

interface EmergencyContact {
  name: string;
  number: string;
  type: 'police' | 'medical' | 'rescue' | 'family';
}

interface RouteAlternative {
  id: string;
  name: string;
  reason: string;
  timeSaved: number;
  difficulty: 'easier' | 'similar' | 'harder';
  conditions: string;
}

export function SafetyEmergencyModule() {
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(0);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'good' | 'weak' | 'poor'>('good');

  const weatherAlerts: WeatherAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Heavy Fog Expected',
      description: 'Dense fog likely between 6 PM - 8 AM affecting visibility',
      timestamp: new Date(),
      affectedAreas: ['Nathula Pass Route', 'Tsomgo Lake Area'],
      recommendation: 'Delay travel until morning or use alternative routes'
    },
    {
      id: '2',
      type: 'info',
      title: 'Perfect Weather Window',
      description: 'Clear skies and moderate temperatures for next 4 hours',
      timestamp: new Date(),
      affectedAreas: ['All monastery routes'],
      recommendation: 'Ideal time for outdoor monastery visits'
    }
  ];

  const emergencyContacts: EmergencyContact[] = [
    { name: 'Sikkim Police', number: '100', type: 'police' },
    { name: 'Medical Emergency', number: '108', type: 'medical' },
    { name: 'Tourist Helpline', number: '+91-3592-202303', type: 'rescue' },
    { name: 'Mountain Rescue', number: '+91-3592-280311', type: 'rescue' }
  ];

  const routeAlternatives: RouteAlternative[] = [
    {
      id: '1',
      name: 'Gangtok to Rumtek via Deorali',
      reason: 'Main route has heavy traffic',
      timeSaved: 15,
      difficulty: 'similar',
      conditions: 'Good road, slight detour'
    },
    {
      id: '2',
      name: 'Pelling approach via Gezing',
      reason: 'Landslide clearing on direct route',
      timeSaved: 0,
      difficulty: 'easier',
      conditions: 'Longer but safer mountain road'
    }
  ];

  const currentWeather = {
    temperature: 18,
    humidity: 72,
    windSpeed: 12,
    visibility: 8,
    conditions: 'Partly Cloudy'
  };

  // SOS Countdown effect
  useEffect(() => {
    if (sosCountdown > 0) {
      const timer = setTimeout(() => setSosCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (sosCountdown === 0 && sosActive) {
      // Trigger actual emergency call
      setSosActive(false);
      setEmergencyMode(true);
    }
  }, [sosCountdown, sosActive]);

  const startSOS = () => {
    setSosActive(true);
    setSosCountdown(5); // 5 second countdown
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosCountdown(0);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'weak': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (emergencyMode) {
    return (
      <div className="fixed inset-0 bg-red-600 z-50 text-white">
        <div className="flex flex-col h-full">
          {/* Emergency Header */}
          <div className="bg-red-700 p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-8 h-8 animate-pulse" />
              <h1 className="text-2xl font-bold">EMERGENCY ACTIVE</h1>
            </div>
            <p className="text-red-100">Your location is being shared with emergency services</p>
          </div>

          {/* Emergency Info */}
          <div className="flex-1 p-6 space-y-6">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium">Your Current Location</h3>
                    <p className="text-sm text-red-100">27.3389° N, 88.6065° E</p>
                    <p className="text-sm text-red-100">Near Rumtek Monastery, Sikkim</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Location Accuracy</span>
                  <Badge className="bg-green-500 text-white">±5 meters</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Emergency Contacts Called</h3>
                <div className="space-y-3">
                  {emergencyContacts.slice(0, 3).map((contact, index) => (
                    <div key={contact.number} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{contact.name}</span>
                      </div>
                      <Badge className="bg-green-500 text-white text-xs">
                        {index === 0 ? 'Calling...' : 'Notified'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Emergency Information Sent</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Medical conditions:</span>
                    <span>None reported</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency contact:</span>
                    <span>+91-9876543210</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last known destination:</span>
                    <span>Rumtek Monastery</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel companions:</span>
                    <span>Solo traveler</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Actions */}
          <div className="p-6 bg-red-700 space-y-4">
            <div className="text-center mb-4">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="text-sm">Help is on the way</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => window.location.href = 'tel:108'}
                className="bg-white text-red-600 hover:bg-red-50"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call 108
              </Button>
              <Button 
                onClick={() => setEmergencyMode(false)}
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                Cancel Emergency
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-medium text-foreground">Safety Center</h1>
          <p className="text-muted-foreground">Your personal safety companion for spiritual journeys</p>
        </div>

        {/* Connection Status */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-muted ${getConnectionColor(connectionStatus)}`}>
                  <Signal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Connection Status</h3>
                  <p className="text-sm text-muted-foreground capitalize">{connectionStatus} signal strength</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Satellite className={`w-4 h-4 ${getConnectionColor(connectionStatus)}`} />
                <Battery className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Cloud className="w-5 h-5" />
              <span>Weather & Route Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weatherAlerts.map((alert) => (
              <Alert key={alert.id} className={getAlertColor(alert.type)}>
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="font-medium">{alert.title}</h4>
                    <AlertDescription className="mt-1 text-sm">
                      {alert.description}
                    </AlertDescription>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Affected: {alert.affectedAreas.join(', ')}
                    </div>
                    <div className="mt-1 text-xs font-medium">
                      💡 {alert.recommendation}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Current Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5" />
                <span>Current Conditions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">{currentWeather.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">{currentWeather.humidity}%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">{currentWeather.windSpeed}</div>
                  <div className="text-xs text-muted-foreground">Wind km/h</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">{currentWeather.visibility}</div>
                  <div className="text-xs text-muted-foreground">Visibility km</div>
                </div>
              </div>
              <div className="text-center pt-2 border-t">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {currentWeather.conditions}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Route className="w-5 h-5" />
                <span>Alternative Routes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {routeAlternatives.map((route) => (
                <div key={route.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{route.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {route.timeSaved > 0 ? `+${route.timeSaved}min saved` : 'Same time'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{route.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{route.conditions}</span>
                    <Badge variant="secondary" className={
                      route.difficulty === 'easier' ? 'bg-green-100 text-green-700' :
                      route.difficulty === 'similar' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {route.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Emergency Contacts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emergencyContacts.map((contact) => (
                <Button
                  key={contact.number}
                  variant="outline"
                  onClick={() => window.location.href = `tel:${contact.number}`}
                  className="h-auto p-4 justify-start text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      contact.type === 'police' ? 'bg-blue-100 text-blue-600' :
                      contact.type === 'medical' ? 'bg-red-100 text-red-600' :
                      contact.type === 'rescue' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.number}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Sharing */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Location Sharing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Live Location Active</h4>
                  <p className="text-xs text-muted-foreground">Sharing with emergency contacts</p>
                </div>
              </div>
              <Button
                variant={locationSharing ? "default" : "outline"}
                size="sm"
                onClick={() => setLocationSharing(!locationSharing)}
              >
                {locationSharing ? 'ON' : 'OFF'}
              </Button>
            </div>
            
            {locationSharing && (
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Location</span>
                  <Badge variant="secondary" className="text-xs">±5m accurate</Badge>
                </div>
                <p className="text-xs text-muted-foreground">27.3389° N, 88.6065° E</p>
                <p className="text-xs text-muted-foreground">Near Rumtek Monastery, East Sikkim</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency SOS */}
        <Card className={`border-0 shadow-lg ${sosActive ? 'bg-red-50 border-red-200' : ''}`}>
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                sosActive ? 'bg-red-500 animate-pulse' : 'bg-red-600'
              }`}>
                {sosActive ? (
                  <div className="text-white">
                    <div className="text-2xl font-bold">{sosCountdown}</div>
                    <div className="text-xs">CANCELLING</div>
                  </div>
                ) : (
                  <Shield className="w-12 h-12 text-white" />
                )}
              </div>
              
              {sosActive ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-red-600">Emergency SOS Activating</h2>
                  <p className="text-sm text-red-600">
                    Emergency services will be contacted in {sosCountdown} seconds
                  </p>
                  <Progress value={(5 - sosCountdown) * 20} className="w-full max-w-xs mx-auto" />
                  <Button
                    onClick={cancelSOS}
                    variant="outline"
                    size="lg"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Cancel Emergency
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium">Emergency SOS</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Press and hold for 3 seconds to activate emergency assistance. 
                    Your location will be shared with rescue services.
                  </p>
                  <Button
                    onClick={startSOS}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Emergency SOS
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Hold for 3 seconds • False alarms may result in charges
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}