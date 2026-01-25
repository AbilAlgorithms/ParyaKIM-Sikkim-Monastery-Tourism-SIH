import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Leaf, TreePine, Zap, Users, Calculator, Award, Globe, Heart } from 'lucide-react';

export function SustainabilitySection() {
  const ecoStats = useMemo(() => ({
    carbonSaved: 245,
    treesPlanted: 12,
    localFamiliesSupported: 8,
    wasteReduced: 15.6,
  }), []);

  const ecoTips = useMemo(() => [
    {
      id: 1,
      title: 'Use Reusable Water Bottles',
      impact: 'Saves 8 plastic bottles per day',
      xpReward: 25,
      icon: Leaf,
    },
    {
      id: 2,
      title: 'Choose Local Homestays',
      impact: 'Supports local communities directly',
      xpReward: 50,
      impact_number: 'Reduces CO₂ by 40%',
      icon: Users,
    },
    {
      id: 3,
      title: 'Walk Between Nearby Monasteries',
      impact: 'Zero emissions + better experience',
      xpReward: 75,
      icon: TreePine,
    },
    {
      id: 4,
      title: 'Visit During Off-Peak Hours',
      impact: 'Reduces overcrowding by 60%',
      xpReward: 30,
      icon: Globe,
    },
  ], []);

  const carbonFootprint = useMemo(() => ({
    transport: 45,
    accommodation: 20,
    food: 15,
    activities: 10,
    total: 90,
  }), []);

  const sustainabilityBadges = useMemo(() => [
    { name: 'Carbon Neutral', earned: true, icon: Leaf },
    { name: 'Local Supporter', earned: true, icon: Heart },
    { name: 'Waste Warrior', earned: false, icon: Zap },
    { name: 'Eco Explorer', earned: false, icon: TreePine },
    { name: 'Green Guide', earned: false, icon: Globe },
  ], []);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Leaf className="w-4 h-4 mr-2" />
            Sustainable Tourism
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Eco-Impact Tracker</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Travel responsibly while preserving Sikkim's pristine monasteries and supporting local communities through our sustainability program
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Carbon Footprint Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-green-500" />
                    <span>Your Carbon Footprint</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Track and offset your environmental impact during your monastery visits
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Transportation</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={carbonFootprint.transport} className="w-24" />
                        <span className="text-sm font-medium">{carbonFootprint.transport} kg CO₂</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accommodation</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={carbonFootprint.accommodation} className="w-24" />
                        <span className="text-sm font-medium">{carbonFootprint.accommodation} kg CO₂</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Food & Dining</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={carbonFootprint.food} className="w-24" />
                        <span className="text-sm font-medium">{carbonFootprint.food} kg CO₂</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Activities</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={carbonFootprint.activities} className="w-24" />
                        <span className="text-sm font-medium">{carbonFootprint.activities} kg CO₂</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Carbon Footprint</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{carbonFootprint.total} kg CO₂</div>
                        <Badge variant="outline" className="text-green-600 border-green-600 mt-1">
                          40% below average
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TreePine className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-700 dark:text-green-300">Carbon Offset Options</h4>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                      Offset your {carbonFootprint.total} kg CO₂ by supporting local environmental projects
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                        Plant 4 Trees ($12)
                      </Button>
                      <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                        Solar Project ($18)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eco-friendly Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span>Eco-Friendly Travel Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ecoTips.map((tip) => {
                      const Icon = tip.icon;
                      return (
                        <div key={tip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{tip.impact}</p>
                              <Badge variant="outline" className="text-xs">
                                +{tip.xpReward} Green XP
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sustainability Dashboard */}
            <div className="space-y-6">
              {/* Eco Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span>Your Eco Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">{ecoStats.carbonSaved}</div>
                    <p className="text-sm text-muted-foreground">kg CO₂ saved this year</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{ecoStats.treesPlanted}</div>
                      <p className="text-xs text-muted-foreground">Trees planted</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{ecoStats.localFamiliesSupported}</div>
                      <p className="text-xs text-muted-foreground">Families supported</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">{ecoStats.wasteReduced} kg</div>
                    <p className="text-xs text-muted-foreground">Waste reduced</p>
                  </div>
                </CardContent>
              </Card>

              {/* Sustainability Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Green Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sustainabilityBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <div key={index} className={`flex items-center space-x-3 p-2 rounded ${
                        badge.earned 
                          ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800' 
                          : 'opacity-50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          badge.earned 
                            ? 'bg-gradient-to-br from-green-500 to-blue-600' 
                            : 'bg-gray-300 dark:bg-gray-700'
                        }`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{badge.name}</h4>
                        </div>
                        {badge.earned && (
                          <Badge variant="secondary" className="text-xs">Earned</Badge>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Crowd Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <span>Smart Crowd Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <h4 className="font-medium mb-2">Monastery Serenity Index</h4>
                    <div className="text-2xl font-bold text-indigo-600">78%</div>
                    <p className="text-sm text-muted-foreground">Peaceful visiting conditions</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Rumtek Monastery</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Quiet</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Enchey Monastery</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Moderate</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Pemayangtse</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Busy</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-center">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                      Best time for peaceful visits
                    </p>
                    <Badge variant="outline" className="text-blue-600 border-blue-300">
                      6:00 AM - 8:00 AM
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Local Community Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span>Community Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h4 className="font-medium mb-2">Your Contributions</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Local homestays booked</span>
                      <Badge variant="outline">3 nights</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Local guides hired</span>
                      <Badge variant="outline">2 guides</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Traditional crafts purchased</span>
                      <Badge variant="outline">₹2,400</Badge>
                    </div>
                  </div>

                  <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded text-center">
                    <p className="text-sm text-pink-700 dark:text-pink-300 mb-2">
                      Impact: Supported 4 local families
                    </p>
                    <Button size="sm" variant="outline" className="text-pink-600 border-pink-300">
                      View Community Stories
                    </Button>
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