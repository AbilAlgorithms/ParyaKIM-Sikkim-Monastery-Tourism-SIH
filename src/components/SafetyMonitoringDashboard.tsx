import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Cloud, 
  AlertTriangle, 
  Wifi, 
  MapPin
} from 'lucide-react';

export const SafetyMonitoringDashboard = React.memo(() => {
  const routeConditions = React.useMemo(() => [
    { route: 'Gangtok → Rumtek', status: 'Clear', color: 'text-green-600', bgColor: 'bg-green-50' },
    { route: 'Gangtok → Tashiding', status: 'Caution', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { route: 'Pelling → Pemayangtse', status: 'Clear', color: 'text-green-600', bgColor: 'bg-green-50' }
  ], []);

  return (
    <section className="py-12 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Safety Status */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-foreground">
                Safety Status: <span className="text-green-600">All Clear</span>
              </h2>
            </div>

            {/* Weather Card */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Cloud className="w-5 h-5 text-primary" />
                  <span>Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gangtok, Sikkim</span>
                  <Badge className="bg-green-100 text-green-700 border-0">Safe</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Partly Cloudy • 18°C • Good Visibility
                </div>
              </CardContent>
            </Card>

            {/* Route Conditions */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Route Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {routeConditions.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm text-foreground">{route.route}</span>
                    <Badge className={`${route.bgColor} ${route.color} border-0 text-xs`}>
                      {route.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alerts & GPS */}
          <div className="space-y-4">
            {/* Active Alert */}
            <Card className="border-0 shadow-md bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 mt-1 text-orange-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Active Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      Light rainfall expected at Tashiding Monastery between 2–4 PM.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GPS Tracking */}
            <Card className="border-0 shadow-md bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Wifi className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Live GPS Tracking</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emergency services can reach you within 15 minutes.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
});