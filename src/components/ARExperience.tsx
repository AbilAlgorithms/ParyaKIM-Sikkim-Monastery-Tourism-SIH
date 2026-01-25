import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { QrCode, Eye, Sparkles, Camera, Clock, Users, Play, Volume2, RotateCcw, Flame } from 'lucide-react';

export function ARExperience() {
  const [activeExperience, setActiveExperience] = useState<string | null>(null);

  const arFeatures = useMemo(() => [
    {
      id: 'qr-tours',
      title: 'QR-to-AR Tours',
      description: 'Scan QR codes at monastery sites to unlock immersive 3D experiences',
      icon: QrCode,
      features: ['360° Virtual Tours', '3D Model Exploration', 'Cultural Pop-ups', 'Audio Guides'],
      image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'digital-rituals',
      title: 'Digital Rituals',
      description: 'Participate in virtual ceremonies and traditional practices',
      icon: RotateCcw,
      features: ['Prayer Wheel Spinning', 'Butter Lamp Lighting', 'Mantra Chanting', 'Virtual Offerings'],
      image: 'https://images.unsplash.com/photo-1562960364-f47d48567cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU3NTA4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'time-travel',
      title: 'Virtual Time Travel',
      description: 'Experience how monasteries looked centuries ago',
      icon: Clock,
      features: ['Historical Reconstructions', 'Timeline Overlays', 'Ancient Architecture', 'Period-accurate Details'],
      image: 'https://images.unsplash.com/photo-1676958593029-4ccb08d9d133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHByYXllciUyMGZsYWdzJTIwbW91bnRhaW58ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'mixed-reality',
      title: 'Mixed Reality Storytelling',
      description: 'AR monks guide you through meditation and teachings',
      icon: Users,
      features: ['Virtual Monk Guides', 'Interactive Meditation', 'Personalized Teachings', 'Spiritual Guidance'],
      image: 'https://images.unsplash.com/photo-1624725412168-a8e69d4f7b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBsYW5kc2NhcGUlMjBzaWtraW18ZW58MXx8fHwxNzU3NTA4NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ], []);

  const digitalRituals = useMemo(() => [
    {
      name: 'Prayer Wheel Spinning',
      description: 'Spin virtual prayer wheels and release digital mantras',
      icon: RotateCcw,
      difficulty: 'Beginner',
      duration: '5-10 mins',
      participants: 1247,
    },
    {
      name: 'Butter Lamp Lighting',
      description: 'Light virtual butter lamps for spiritual merit',
      icon: Flame,
      difficulty: 'Beginner',
      duration: '3-5 mins',
      participants: 892,
    },
    {
      name: 'Meditation Session',
      description: 'Guided AR meditation with virtual monk',
      icon: Eye,
      difficulty: 'All levels',
      duration: '15-30 mins',
      participants: 2156,
    },
  ], []);

  return (
    <section id="ar-tours" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Immersive Technology
          </Badge>
          <h2 className="text-4xl font-bold mb-4">AR & Virtual Experiences</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Step into the future of cultural tourism with cutting-edge AR technology, virtual reality tours, and interactive digital rituals
          </p>
        </div>

        <Tabs defaultValue="ar-features" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ar-features">AR Features</TabsTrigger>
            <TabsTrigger value="virtual-tours">Virtual Tours</TabsTrigger>
            <TabsTrigger value="digital-rituals">Digital Rituals</TabsTrigger>
            <TabsTrigger value="mixed-reality">Mixed Reality</TabsTrigger>
          </TabsList>

          <TabsContent value="ar-features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {arFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <ImageWithFallback
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-black">
                        <Icon className="w-3 h-3 mr-1" />
                        AR Ready
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-orange-500" />
                        <span>{feature.title}</span>
                      </CardTitle>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          {feature.features.map((feat, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2 pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="flex-1">
                                <Camera className="w-4 h-4 mr-1" />
                                Try AR
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{feature.title} Demo</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                                  <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                                      <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-medium">AR Experience Preview</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Visit the monastery to access full AR features
                                      </p>
                                    </div>
                                    <Button className="mt-4">
                                      <Play className="w-4 h-4 mr-2" />
                                      Start Preview
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-medium mb-2">Requirements</h4>
                                    <ul className="space-y-1 text-muted-foreground">
                                      <li>• Modern smartphone</li>
                                      <li>• Camera permissions</li>
                                      <li>• Internet connection</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Languages</h4>
                                    <ul className="space-y-1 text-muted-foreground">
                                      <li>• English</li>
                                      <li>• Hindi</li>
                                      <li>• Nepali</li>
                                      <li>• Lepcha</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="virtual-tours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>360° Virtual Monastery Tours</CardTitle>
                <p className="text-muted-foreground">
                  Explore monasteries from anywhere in the world with our high-definition virtual reality tours
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-dashed border-muted-foreground/30">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">Rumtek Virtual Tour</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Explore the golden stupa and meditation halls
                      </p>
                      <Button size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Tour
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-muted-foreground/30">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">Pemayangtse Tour</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ancient architecture and sacred relics
                      </p>
                      <Button size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Tour
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-muted-foreground/30">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">Tashiding Experience</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sacred waters and Himalayan views
                      </p>
                      <Button size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Tour
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digital-rituals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {digitalRituals.map((ritual, index) => {
                const Icon = ritual.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{ritual.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{ritual.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Difficulty:</span>
                        <Badge variant="outline">{ritual.difficulty}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span>{ritual.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Participants:</span>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{ritual.participants.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <Play className="w-4 h-4 mr-2" />
                        Begin Ritual
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Digital Merit Collection</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Your digital ritual participation contributes to virtual merit points, which can be dedicated to global peace and healing. Join thousands of practitioners worldwide.
                </p>
                <div className="flex justify-center space-x-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">2,847</div>
                    <div className="text-sm text-muted-foreground">Global Participants Today</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600">15,692</div>
                    <div className="text-sm text-muted-foreground">Digital Mantras Chanted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">4,251</div>
                    <div className="text-sm text-muted-foreground">Virtual Lamps Lit</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mixed-reality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AR Monk Guides</CardTitle>
                <p className="text-muted-foreground">
                  Learn from virtual monks who appear through your device's camera, providing personalized spiritual guidance
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Available Guides</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Venerable Tenzin</h4>
                          <p className="text-sm text-muted-foreground">Meditation Master • 30 years experience</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-4 h-4 mr-1" />
                          English
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Lama Pemba</h4>
                          <p className="text-sm text-muted-foreground">Cultural Historian • Ritual Expert</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-4 h-4 mr-1" />
                          Nepali
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Geshe Lobsang</h4>
                          <p className="text-sm text-muted-foreground">Philosophy Teacher • Debate Master</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-4 h-4 mr-1" />
                          Hindi
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">AR Guide Preview</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                          Experience personalized teachings through your camera
                        </p>
                      </div>
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Start AR Session
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}