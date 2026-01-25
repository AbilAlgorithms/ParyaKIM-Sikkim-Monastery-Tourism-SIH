import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { VideoUpload } from './VideoUpload';
import { Users, Star, Trophy, Calendar, MessageCircle, BookOpen, Award, Zap, Target, Gift, Map, PenTool, Send, MapPin } from 'lucide-react';

export function CommunityHub() {
  const [userLevel] = useState(7);
  const [xpPoints] = useState(3450);
  const [nextLevelXP] = useState(4000);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');

  const achievements = useMemo(() => [
    { id: 1, name: 'First Steps', description: 'Visited your first monastery', icon: Target, earned: true },
    { id: 2, name: 'Peaceful Mind', description: 'Completed 5 meditation sessions', icon: Award, earned: true },
    { id: 3, name: 'Cultural Explorer', description: 'Learned about 3 different traditions', icon: BookOpen, earned: true },
    { id: 4, name: 'AR Pioneer', description: 'Used AR features 10 times', icon: Zap, earned: false },
    { id: 5, name: 'Community Helper', description: 'Helped 5 fellow travelers', icon: Users, earned: false },
    { id: 6, name: 'Monastery Master', description: 'Visited all 10 major monasteries', icon: Trophy, earned: false },
  ], []);

  const treasureHunts = [
    {
      id: 1,
      title: 'Hidden Mantras of Rumtek',
      description: 'Find 7 sacred mantras hidden throughout Rumtek Monastery',
      difficulty: 'Medium',
      participants: 234,
      reward: '500 XP + Rare Badge',
      progress: 3,
      total: 7,
      image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Prayer Flag Quest',
      description: 'Document prayer flags across 5 different monasteries',
      difficulty: 'Easy',
      participants: 456,
      reward: '300 XP + Cultural Badge',
      progress: 1,
      total: 5,
      image: 'https://images.unsplash.com/photo-1676958593029-4ccb08d9d133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHByYXllciUyMGZsYWdzJTIwbW91bnRhaW58ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Ancient Symbols Mystery',
      description: 'Decode ancient Buddhist symbols using AR scanning',
      difficulty: 'Hard',
      participants: 128,
      reward: '750 XP + Master Badge',
      progress: 0,
      total: 12,
      image: 'https://images.unsplash.com/photo-1562960364-f47d48567cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU3NTA4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '/api/placeholder/32/32',
      location: 'Pemayangtse Monastery',
      time: '2 hours ago',
      content: 'The sunrise meditation at Pemayangtse was absolutely magical! The golden light illuminating the prayer hall created such a peaceful atmosphere. 🙏',
      image: 'https://images.unsplash.com/photo-1624725412168-a8e69d4f7b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBsYW5kc2NhcGUlMjBzaWtraW18ZW58MXx8fHwxNzU3NTA4NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 24,
      comments: 8,
      badges: ['First Visit', 'Early Bird'],
    },
    {
      id: 2,
      author: 'Monk Tenzin',
      avatar: '/api/placeholder/32/32',
      location: 'Rumtek Monastery',
      time: '5 hours ago',
      content: 'Welcome to all our visitors today! Remember, the true journey is within. Each step in mindfulness brings you closer to inner peace.',
      likes: 67,
      comments: 15,
      badges: ['Monastery Guide', 'Wisdom Keeper'],
    },
    {
      id: 3,
      author: 'Alex Kumar',
      avatar: '/api/placeholder/32/32',
      location: 'Enchey Monastery',
      time: '1 day ago',
      content: 'Completed my first AR treasure hunt today! Found all 5 hidden mantras. The technology really enhances the spiritual experience.',
      likes: 43,
      comments: 12,
      badges: ['AR Explorer', 'Treasure Hunter'],
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Karma Dolma', level: 12, xp: 8500, badge: 'Monastery Master' },
    { rank: 2, name: 'David Wilson', level: 11, xp: 7800, badge: 'Cultural Scholar' },
    { rank: 3, name: 'Priya Sharma', level: 10, xp: 7200, badge: 'AR Pioneer' },
    { rank: 4, name: 'You', level: userLevel, xp: xpPoints, badge: 'Peaceful Explorer' },
    { rank: 5, name: 'Liam Brown', level: 8, xp: 5400, badge: 'Community Helper' },
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Community & Gamification
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Community Hub</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow travelers, participate in cultural treasure hunts, and track your spiritual journey with gamified experiences
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="treasure-hunts">Treasure Hunts</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Profile Card */}
              <Card className="md:col-span-1">
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <CardTitle>Spiritual Explorer</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="secondary">Level {userLevel}</Badge>
                    <Badge variant="outline">Peaceful Explorer</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>XP Progress</span>
                      <span>{xpPoints}/{nextLevelXP} XP</span>
                    </div>
                    <Progress value={(xpPoints / nextLevelXP) * 100} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">5</div>
                      <div className="text-xs text-muted-foreground">Monasteries Visited</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-xs text-muted-foreground">Achievements</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">28</div>
                      <div className="text-xs text-muted-foreground">Meditation Minutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-xs text-muted-foreground">Treasure Hunts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spiritual Journey Tracker */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Spiritual Journey Tracker</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Meditation Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Goal</span>
                          <span>15/20 minutes</span>
                        </div>
                        <Progress value={75} />
                        <div className="flex justify-between text-sm">
                          <span>Weekly Streak</span>
                          <Badge variant="outline">5 days</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Cultural Learning</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Traditions Learned</span>
                          <span>8/12</span>
                        </div>
                        <Progress value={67} />
                        <div className="flex justify-between text-sm">
                          <span>Rituals Practiced</span>
                          <Badge variant="outline">4 types</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Recent Activities</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Completed morning meditation at Rumtek</span>
                        <Badge variant="outline" className="text-xs">+50 XP</Badge>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Learned about prayer wheel significance</span>
                        <Badge variant="outline" className="text-xs">+25 XP</Badge>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Participated in virtual butter lamp lighting</span>
                        <Badge variant="outline" className="text-xs">+75 XP</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center p-6">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">7</div>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </Card>
              <Card className="text-center p-6">
                <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">23</div>
                <p className="text-sm text-muted-foreground">Shared Insights</p>
              </Card>
              <Card className="text-center p-6">
                <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Rewards Earned</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treasure-hunts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {treasureHunts.map((hunt) => (
                <Card key={hunt.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <ImageWithFallback
                      src={hunt.image}
                      alt={hunt.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-black/80 text-white">
                      {hunt.difficulty}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{hunt.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{hunt.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{hunt.progress}/{hunt.total}</span>
                    </div>
                    <Progress value={(hunt.progress / hunt.total) * 100} />
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{hunt.participants} participants</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm font-medium text-orange-600 mb-3">
                        🏆 {hunt.reward}
                      </p>
                      <Button className="w-full" disabled={hunt.progress === 0}>
                        {hunt.progress === 0 ? 'Start Hunt' : 'Continue Hunt'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{post.author}</h4>
                          {post.badges.map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Map className="w-3 h-3" />
                          <span>{post.location}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{post.content}</p>
                    {post.image && (
                      <div className="aspect-video relative rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt="Post image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <Star className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-accent" />
                    <span>Share Video Experience</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Upload videos of your monastery visits, ceremonies, or spiritual moments
                  </p>
                </CardHeader>
                <CardContent>
                  <VideoUpload 
                    onVideoUploaded={(file) => {
                      console.log('Video uploaded:', file.name);
                      // Handle video upload
                    }}
                    maxSizeMB={50}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Text Post Creation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PenTool className="w-5 h-5 text-primary" />
                    <span>Share Your Story</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Write about your spiritual journey, insights, or monastery experiences
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      placeholder="e.g. My First Visit to Rumtek Monastery"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="post-location"
                        placeholder="e.g. Rumtek Monastery, Sikkim"
                        value={newPostLocation}
                        onChange={(e) => setNewPostLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Your Experience</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your thoughts, feelings, learnings, or any spiritual insights from your visit..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={!newPostTitle.trim() || !newPostContent.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Share Story
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewPostTitle('');
                        setNewPostContent('');
                        setNewPostLocation('');
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground border-t pt-3">
                    <p className="mb-2">💡 <strong>Tips for engaging posts:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Share specific moments that moved you</li>
                      <li>• Describe the atmosphere and your feelings</li>
                      <li>• Include any cultural insights you gained</li>
                      <li>• Mention interactions with monks or locals</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Community Guidelines */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Community Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">🙏 Respectful Content</p>
                    <p>Share experiences that honor the sacred nature of monasteries and respect local customs</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">📸 Photography Ethics</p>
                    <p>Only share videos/photos where photography is permitted and respects privacy</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">🌍 Cultural Sensitivity</p>
                    <p>Be mindful of cultural differences and share insights that promote understanding</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card key={achievement.id} className={`${achievement.earned ? 'bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 border-orange-200' : 'opacity-60'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-orange-500 to-pink-600' 
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-medium mb-2">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge className="bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Global Leaderboard</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Top spiritual explorers this month</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className={`flex items-center space-x-4 p-3 rounded-lg ${
                      user.name === 'You' 
                        ? 'bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 border border-orange-200' 
                        : 'hover:bg-muted/50'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        user.rank === 1 ? 'bg-yellow-500' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-orange-600' :
                        'bg-gray-600'
                      }`}>
                        {user.rank}
                      </div>
                      
                      <Avatar>
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">{user.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">Level {user.level}</Badge>
                          <Badge variant="secondary" className="text-xs">{user.badge}</Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">{user.xp.toLocaleString()} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}