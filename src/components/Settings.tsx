import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Globe, 
  Bell, 
  Shield, 
  Moon, 
  Volume2, 
  MapPin, 
  Wifi,
  Download,
  Users,
  Camera,
  AlertTriangle,
  Smartphone
} from 'lucide-react';

export function Settings() {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    weatherUpdates: true,
    monasteryUpdates: false,
    culturalEvents: true,
    communityMessages: false
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEffects: true,
    offlineMode: false,
    locationSharing: true,
    cameraPermission: true
  });

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'lep', name: 'Lepcha', native: 'Lepcha' }
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background pt-6 pb-24">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your spiritual journey experience</p>
        </div>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Language & Region</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">App Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center space-x-2">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">({lang.native})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                AI assistant and voice guidance will use this language
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Voice Assistant</h4>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <Button 
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage(lang.code)}
                  >
                    {lang.native}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications & Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Emergency Alerts</span>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Weather warnings, safety alerts, and emergency notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.emergencyAlerts}
                  onCheckedChange={(value) => handleNotificationChange('emergencyAlerts', value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Weather Updates</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time weather conditions and forecasts
                  </p>
                </div>
                <Switch
                  checked={notifications.weatherUpdates}
                  onCheckedChange={(value) => handleNotificationChange('weatherUpdates', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">Monastery Updates</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Special events, festivals, and monastery news
                  </p>
                </div>
                <Switch
                  checked={notifications.monasteryUpdates}
                  onCheckedChange={(value) => handleNotificationChange('monasteryUpdates', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Cultural Events</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Local festivals, ceremonies, and cultural activities
                  </p>
                </div>
                <Switch
                  checked={notifications.culturalEvents}
                  onCheckedChange={(value) => handleNotificationChange('culturalEvents', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Community Messages</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Messages from other travelers and community updates
                  </p>
                </div>
                <Switch
                  checked={notifications.communityMessages}
                  onCheckedChange={(value) => handleNotificationChange('communityMessages', value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>App Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Moon className="w-4 h-4" />
                  <span className="font-medium">Dark Mode</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Switch to dark theme for better visibility
                </p>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(value) => handlePreferenceChange('darkMode', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="font-medium">Sound Effects</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  App sounds and meditation audio
                </p>
              </div>
              <Switch
                checked={preferences.soundEffects}
                onCheckedChange={(value) => handlePreferenceChange('soundEffects', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Offline Mode</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Download content for offline access
                </p>
              </div>
              <Switch
                checked={preferences.offlineMode}
                onCheckedChange={(value) => handlePreferenceChange('offlineMode', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy & Permissions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Location Sharing</span>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share location for safety features and navigation
                </p>
              </div>
              <Switch
                checked={preferences.locationSharing}
                onCheckedChange={(value) => handlePreferenceChange('locationSharing', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span className="font-medium">Camera Access</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Required for AR experiences and QR scanning
                </p>
              </div>
              <Switch
                checked={preferences.cameraPermission}
                onCheckedChange={(value) => handlePreferenceChange('cameraPermission', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Settings */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-700 dark:text-red-300">
                Emergency Contact
              </label>
              <Button variant="outline" className="w-full justify-start">
                <span>+91-9876543210 (Family)</span>
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-700 dark:text-red-300">
                Medical Information
              </label>
              <Button variant="outline" className="w-full justify-start">
                <span>Add Medical Details</span>
              </Button>
            </div>

            <div className="text-center pt-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Test Emergency SOS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground space-y-2">
            <p>Sikkim Monasteries AI v2.1.0</p>
            <p>Last updated: December 10, 2024</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="ghost" size="sm">Privacy Policy</Button>
              <Button variant="ghost" size="sm">Terms of Service</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}