import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Star, Clock, Users, Camera, Navigation, QrCode, Eye } from 'lucide-react';

export function MonasteryMap() {
  const [selectedMonastery, setSelectedMonastery] = useState<string | null>(null);

  const monasteries = useMemo(() => [
    {
      id: 'rumtek',
      name: 'Rumtek Monastery',
      location: 'Gangtok',
      description: 'The largest monastery in Sikkim, seat of the Karmapa',
      difficulty: 'Easy',
      duration: '2-3 hours',
      highlights: ['Golden Stupa', 'Ancient Manuscripts', 'Meditation Hall'],
      position: { top: '30%', left: '60%' },
      image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
    },
    {
      id: 'enchey',
      name: 'Enchey Monastery',
      location: 'Gangtok',
      description: '200-year-old monastery with stunning city views',
      difficulty: 'Easy',
      duration: '1-2 hours',
      highlights: ['City Views', 'Prayer Wheels', 'Local Culture'],
      position: { top: '25%', left: '55%' },
      image: 'https://images.unsplash.com/photo-1724650117579-fcf227cd872e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBoaW1hbGF5YW4lMjBidWRkaGlzdHxlbnwxfHx8fDE3NTc0NDUwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
    },
    {
      id: 'pemayangtse',
      name: 'Pemayangtse Monastery',
      location: 'Pelling',
      description: 'Perfect sublime lotus - one of the oldest monasteries',
      difficulty: 'Moderate',
      duration: '3-4 hours',
      highlights: ['Ancient Architecture', 'Mountain Views', 'Sacred Relics'],
      position: { top: '50%', left: '35%' },
      image: 'https://images.unsplash.com/photo-1676958593029-4ccb08d9d133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHByYXllciUyMGZsYWdzJTIwbW91bnRhaW58ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
    },
    {
      id: 'tashiding',
      name: 'Tashiding Monastery',
      location: 'West Sikkim',
      description: 'Most sacred monastery, built on a heart-shaped hill',
      difficulty: 'Moderate',
      duration: '2-3 hours',
      highlights: ['Sacred Waters', 'Himalayan Views', 'Spiritual Significance'],
      position: { top: '45%', left: '30%' },
      image: 'https://images.unsplash.com/photo-1562960364-f47d48567cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU3NTA4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
    },
    {
      id: 'phodong',
      name: 'Phodong Monastery',
      location: 'North Sikkim',
      description: 'Rebuilt monastery with beautiful murals',
      difficulty: 'Easy',
      duration: '1-2 hours',
      highlights: ['Ancient Murals', 'Peaceful Environment', 'Traditional Architecture'],
      position: { top: '20%', left: '50%' },
      image: 'https://images.unsplash.com/photo-1624725412168-a8e69d4f7b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBsYW5kc2NhcGUlMjBzaWtraW18ZW58MXx8fHwxNzU3NTA4NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
    },
  ], []);

  const getSelectedMonastery = useMemo(() => {
    return monasteries.find(m => m.id === selectedMonastery);
  }, [monasteries, selectedMonastery]);

  return (
    <section id="monasteries" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
            <MapPin className="w-4 h-4 mr-2" />
            Interactive Discovery
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 300, color: '#1a2332' }}>
            Sacred <span style={{ fontWeight: 600 }}>Monastery Map</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover Sikkim's most revered monasteries with our interactive map featuring real-time crowd data and AI-powered recommendations
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-xl" style={{ fontWeight: 500 }}>
                    <span>Interactive Monastery Map</span>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-green-50 text-green-700">Live Data</Badge>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        <Navigation className="w-4 h-4 mr-1" />
                        Get Directions
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-green-100 to-blue-100 h-96 overflow-hidden">
                    {/* Simple Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 opacity-50"></div>

                    {/* Monastery Markers */}
                    {monasteries.slice(0, 5).map((monastery) => (
                      <button
                        key={monastery.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{ 
                          top: monastery.position.top, 
                          left: monastery.position.left 
                        }}
                        onClick={() => setSelectedMonastery(monastery.id)}
                      >
                        <div className={`relative ${selectedMonastery === monastery.id ? 'scale-125' : 'hover:scale-110'} transition-transform`}>
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          {selectedMonastery === monastery.id && (
                            <div className="absolute -top-2 -left-2 w-12 h-12 bg-orange-500/20 rounded-full animate-ping" />
                          )}
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {monastery.name}
                        </div>
                      </button>
                    ))}

                    {/* Crowd Level Indicators */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <h4 className="text-sm font-medium mb-2">Crowd Levels</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Low (Best time)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>Moderate</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monastery Details */}
            <div className="space-y-6">
              {selectedMonastery ? (
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                      <ImageWithFallback
                        src={getSelectedMonastery()?.image || ''}
                        alt={getSelectedMonastery()?.name || ''}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-black/80 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {getSelectedMonastery()?.rating}
                      </Badge>
                    </div>
                    <CardTitle>{getSelectedMonastery()?.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {getSelectedMonastery()?.location}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{getSelectedMonastery()?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{getSelectedMonastery()?.duration}</span>
                      </div>
                      <Badge variant={getSelectedMonastery()?.difficulty === 'Easy' ? 'secondary' : 'outline'}>
                        {getSelectedMonastery()?.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Highlights</h4>
                      <div className="space-y-1">
                        {getSelectedMonastery()?.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex items-center space-x-1">
                            <QrCode className="w-4 h-4" />
                            <span>AR Tour</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>AR Monastery Experience</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>Scan the QR code at the monastery to unlock:</p>
                            <ul className="space-y-2 text-sm">
                              <li>• 360° immersive virtual tour</li>
                              <li>• Digital prayer wheel spinning</li>
                              <li>• Historical timeline overlay</li>
                              <li>• Guided meditation sessions</li>
                              <li>• Cultural stories and legends</li>
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Virtual Tour</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h3 className="text-xl mb-3" style={{ fontWeight: 500 }}>Select a Monastery</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Click on any monastery marker to explore detailed information, crowd levels, and available experiences.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl" style={{ fontWeight: 500 }}>Today's Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Weather</span>
                    <Badge variant="secondary">Sunny, 18°C</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Best visiting time</span>
                    <Badge variant="outline">6 AM - 9 AM</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Active visitors</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>23 people</span>
                    </div>
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