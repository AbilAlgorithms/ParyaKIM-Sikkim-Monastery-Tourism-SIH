import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  QrCode,
  Camera,
  Scan,
  Sparkles,
  RotateCcw,
  Zap,
  Volume2,
  Eye,
  Hand,
  Lightbulb,
  X,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Share,
  Heart
} from 'lucide-react';

interface ARExperience {
  id: string;
  name: string;
  description: string;
  type: 'ritual' | 'exploration' | 'meditation' | 'history';
  duration: string;
  isActive: boolean;
}

export function ARScanner() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'found' | 'loading' | 'active'>('idle');
  const [progress, setProgress] = useState(0);
  const [detectedMonastery, setDetectedMonastery] = useState<string | null>(null);
  const [activeExperience, setActiveExperience] = useState<ARExperience | null>(null);
  const [scanAnimation, setScanAnimation] = useState(false);

  const monasteries = {
    'rumtek': {
      name: 'Rumtek Monastery',
      description: 'The Golden Dharma Chakra Centre',
      experiences: [
        { id: 'prayer-wheel', name: 'Spin Prayer Wheel', description: 'Interactive prayer wheel with mantras', type: 'ritual', duration: '2 min', isActive: false },
        { id: 'butter-lamp', name: 'Light Butter Lamp', description: 'Virtual butter lamp lighting ceremony', type: 'ritual', duration: '3 min', isActive: false },
        { id: '3d-tour', name: '3D Virtual Tour', description: 'Explore every corner in 360°', type: 'exploration', duration: '10 min', isActive: false },
        { id: 'meditation', name: 'Guided Meditation', description: 'Peaceful meditation with monks', type: 'meditation', duration: '15 min', isActive: false },
        { id: 'history', name: 'Historical Timeline', description: 'Journey through time', type: 'history', duration: '8 min', isActive: false }
      ]
    },
    'enchey': {
      name: 'Enchey Monastery',
      description: 'The Solitary Monastery',
      experiences: [
        { id: 'prayer-flags', name: 'Prayer Flag AR', description: 'Virtual prayer flags in the wind', type: 'ritual', duration: '3 min', isActive: false },
        { id: 'chanting', name: 'Monk Chanting', description: 'Experience traditional chants', type: 'meditation', duration: '12 min', isActive: false },
        { id: 'architecture', name: 'Architectural Details', description: 'Detailed building exploration', type: 'exploration', duration: '7 min', isActive: false }
      ]
    }
  };

  // Simulate QR scanning process
  useEffect(() => {
    if (scanState === 'scanning') {
      setScanAnimation(true);
      const scanTimer = setTimeout(() => {
        setScanState('found');
        setDetectedMonastery('rumtek');
        setScanAnimation(false);
      }, 3000);
      
      return () => clearTimeout(scanTimer);
    }
  }, [scanState]);

  // Simulate loading AR experience
  useEffect(() => {
    if (scanState === 'loading') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('active');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [scanState]);

  const startScan = () => {
    setScanState('scanning');
    setProgress(0);
  };

  const startExperience = (experience: ARExperience) => {
    setActiveExperience({ ...experience, isActive: true });
    setScanState('loading');
    setProgress(0);
  };

  const stopExperience = () => {
    setActiveExperience(null);
    setScanState('found');
    setProgress(0);
  };

  const resetScanner = () => {
    setScanState('idle');
    setDetectedMonastery(null);
    setActiveExperience(null);
    setProgress(0);
  };

  const getExperienceIcon = (type: string) => {
    switch (type) {
      case 'ritual': return <Hand className="w-5 h-5" />;
      case 'exploration': return <Eye className="w-5 h-5" />;
      case 'meditation': return <Heart className="w-5 h-5" />;
      case 'history': return <Lightbulb className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getExperienceColor = (type: string) => {
    switch (type) {
      case 'ritual': return 'from-primary to-accent';
      case 'exploration': return 'from-blue-500 to-cyan-500';
      case 'meditation': return 'from-green-500 to-emerald-500';
      case 'history': return 'from-purple-500 to-violet-500';
      default: return 'from-primary to-accent';
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Camera View */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
        {/* Mock Camera Feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetScanner}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <QrCode className="w-3 h-3 mr-1" />
                AR Scanner
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scanning States */}
        {scanState === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="mx-6 bg-black/70 backdrop-blur-lg border-white/20 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-medium">Scan QR Code</h2>
                  <p className="text-white/70">
                    Point your camera at a monastery QR code to unlock immersive AR experiences
                  </p>
                </div>
                <Button 
                  onClick={startScan}
                  size="lg"
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Scanning Animation */}
            <div className="relative">
              <div className="w-64 h-64 border-4 border-white/30 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-xl" />
                
                {/* Scanning Line */}
                <div className={`absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent ${scanAnimation ? 'animate-pulse' : ''}`} 
                     style={{ 
                       top: '50%',
                       animation: scanAnimation ? 'scan 2s ease-in-out infinite' : 'none'
                     }} 
                />
                
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-xl" />
                <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-xl" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-xl" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-xl" />
              </div>
              
              <div className="text-center mt-6">
                <div className="flex items-center justify-center space-x-2 text-white mb-2">
                  <Scan className="w-5 h-5 animate-pulse" />
                  <span className="text-lg">Scanning...</span>
                </div>
                <p className="text-white/70 text-sm">Position QR code within the frame</p>
              </div>
            </div>
          </div>
        )}

        {scanState === 'found' && detectedMonastery && (
          <div className="absolute inset-0 flex items-end pb-8">
            <Card className="mx-6 mb-6 bg-black/80 backdrop-blur-lg border-white/20 text-white w-full">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium mb-1">
                    {monasteries[detectedMonastery as keyof typeof monasteries].name}
                  </h2>
                  <p className="text-white/70 text-sm">
                    {monasteries[detectedMonastery as keyof typeof monasteries].description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-center mb-4">Choose Your Experience</h3>
                  {monasteries[detectedMonastery as keyof typeof monasteries].experiences.map((experience) => (
                    <Button
                      key={experience.id}
                      onClick={() => startExperience(experience)}
                      variant="outline"
                      className="w-full p-4 h-auto text-left bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${getExperienceColor(experience.type)}`}>
                          {getExperienceIcon(experience.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{experience.name}</div>
                          <div className="text-sm text-white/70">{experience.description}</div>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                          {experience.duration}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {scanState === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="mx-6 bg-black/80 backdrop-blur-lg border-white/20 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-8 h-8 text-white animate-bounce" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-medium">Loading AR Experience</h2>
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-white/70">
                      {progress < 30 && "Initializing AR engine..."}
                      {progress >= 30 && progress < 60 && "Loading 3D models..."}
                      {progress >= 60 && progress < 90 && "Calibrating spatial tracking..."}
                      {progress >= 90 && "Almost ready!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {scanState === 'active' && activeExperience && (
          <div className="absolute inset-0">
            {/* AR Experience Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            
            {/* Experience Controls - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Card className="bg-black/80 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getExperienceColor(activeExperience.type)}`}>
                        {getExperienceIcon(activeExperience.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{activeExperience.name}</h3>
                        <p className="text-sm text-white/70">Now experiencing</p>
                      </div>
                    </div>
                    <Button
                      onClick={stopExperience}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/20"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/20"
                    >
                      <Volume2 className="w-4 h-4 mr-1" />
                      Audio
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/20"
                    >
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AR Interaction Hints */}
            <div className="absolute top-24 left-6 right-6">
              {activeExperience.type === 'ritual' && (
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-white text-center">
                  <Hand className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm">Tap and hold to spin the prayer wheel</p>
                </div>
              )}
              
              {activeExperience.type === 'exploration' && (
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-white text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm">Move your device to explore the monastery</p>
                </div>
              )}
              
              {activeExperience.type === 'meditation' && (
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-white text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm">Find a quiet space and follow the breathing guide</p>
                </div>
              )}
            </div>

            {/* Floating Elements for AR Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-accent rounded-full animate-ping opacity-60" />
              <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-primary rounded-full animate-pulse opacity-40" />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-bounce opacity-50" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 50%; }
          100% { top: 90%; }
        }
      `}</style>
    </div>
  );
}