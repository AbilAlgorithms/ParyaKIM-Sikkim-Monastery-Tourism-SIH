import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  User, 
  Trophy, 
  MapPin, 
  Star, 
  Camera, 
  Mountain, 
  Calendar,
  Target,
  Award,
  Shield,
  Compass,
  Heart
} from 'lucide-react';

export function Profile() {
  const userStats = {
    name: "Tenzin Norbu",
    level: "Spiritual Explorer",
    monastariesVisited: 12,
    totalMonasteries: 28,
    arToursCompleted: 8,
    treasureHunts: 5,
    culturalBadges: 15,
    nextLevelProgress: 75
  };

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Visit your first monastery",
      icon: <MapPin className="w-6 h-6" />,
      completed: true,
      date: "Nov 15, 2024",
      rarity: "common"
    },
    {
      id: 2,
      name: "AR Pioneer",
      description: "Complete 5 AR monastery tours",
      icon: <Camera className="w-6 h-6" />,
      completed: true,
      date: "Dec 2, 2024",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Mountain Seeker",
      description: "Visit monasteries above 4000m",
      icon: <Mountain className="w-6 h-6" />,
      completed: true,
      date: "Dec 8, 2024",
      rarity: "epic"
    },
    {
      id: 4,
      name: "Cultural Guardian",
      description: "Complete 10 treasure hunts",
      icon: <Shield className="w-6 h-6" />,
      completed: false,
      progress: 5,
      total: 10,
      rarity: "legendary"
    },
    {
      id: 5,
      name: "Monastery Master",
      description: "Visit all 28 monasteries in Sikkim",
      icon: <Trophy className="w-6 h-6" />,
      completed: false,
      progress: 12,
      total: 28,
      rarity: "legendary"
    }
  ];

  const recentActivities = [
    {
      type: "monastery_visit",
      title: "Visited Rumtek Monastery",
      date: "2 hours ago",
      icon: <MapPin className="w-4 h-4" />
    },
    {
      type: "ar_tour",
      title: "Completed AR Tour of Prayer Hall",
      date: "5 hours ago",
      icon: <Camera className="w-4 h-4" />
    },
    {
      type: "achievement",
      title: "Earned 'Mountain Seeker' badge",
      date: "1 day ago",
      icon: <Award className="w-4 h-4" />
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-500 border-gray-200';
      case 'rare': return 'text-blue-500 border-blue-200';
      case 'epic': return 'text-purple-500 border-purple-200';
      case 'legendary': return 'text-orange-500 border-orange-200';
      default: return 'text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-6 pb-24">
      <div className="container mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{userStats.name}</h1>
                <p className="text-muted-foreground">{userStats.level}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Level 3</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{userStats.culturalBadges} Badges</span>
                  </Badge>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level 4</span>
                <span>{userStats.nextLevelProgress}%</span>
              </div>
              <Progress value={userStats.nextLevelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">{userStats.monastariesVisited}</p>
              <p className="text-sm text-muted-foreground">Monasteries Visited</p>
              <p className="text-xs text-muted-foreground">of {userStats.totalMonasteries} total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Camera className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{userStats.arToursCompleted}</p>
              <p className="text-sm text-muted-foreground">AR Tours</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Compass className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{userStats.treasureHunts}</p>
              <p className="text-sm text-muted-foreground">Treasure Hunts</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold">847</p>
              <p className="text-sm text-muted-foreground">Cultural Points</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center space-x-4 p-3 rounded-lg border ${
                  achievement.completed 
                    ? 'bg-muted/30' 
                    : 'bg-background'
                } ${getRarityColor(achievement.rarity)}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.completed 
                    ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.completed ? (
                    <p className="text-xs text-green-600">Completed {achievement.date}</p>
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress 
                        value={(achievement.progress! / achievement.total!) * 100} 
                        className="h-1 flex-1" 
                      />
                      <span className="text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                  )}
                </div>
                <Badge variant={achievement.completed ? "default" : "outline"} className="text-xs">
                  {achievement.rarity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}