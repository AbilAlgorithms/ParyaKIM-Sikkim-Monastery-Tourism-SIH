import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy,
  Star,
  Target,
  Medal,
  Crown,
  Zap,
  Gift,
  Compass,
  Heart,
  Lotus,
  ChevronRight,
  Users,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Flame,
  Eye,
  Mountain,
  Sparkles
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  earned: boolean;
  earnedDate?: Date;
  progress?: number;
  total?: number;
  xpReward: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  xpReward: number;
  completed: boolean;
  progress: number;
  total: number;
  icon: React.ReactNode;
}

interface TreasureHunt {
  id: string;
  name: string;
  location: string;
  difficulty: 'easy' | 'medium' | 'hard';
  participants: number;
  cluesFound: number;
  totalClues: number;
  timeRemaining: string;
  reward: string;
  isActive: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  badges: number;
  monasteries: number;
  country: string;
}

export function GamificationLayer() {
  const [currentXP, setCurrentXP] = useState(2847);
  const [currentLevel, setCurrentLevel] = useState(12);
  const [xpToNextLevel, setXpToNextLevel] = useState(453);
  const [totalXPForNextLevel] = useState(3300);
  const [streak, setStreak] = useState(7);

  const culturalBadges: Badge[] = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Visit your first monastery',
      icon: '🙏',
      rarity: 'common',
      category: 'Spiritual Journey',
      earned: true,
      earnedDate: new Date(2024, 10, 15),
      xpReward: 100
    },
    {
      id: 'prayer-wheel-master',
      name: 'Prayer Wheel Master',
      description: 'Spin 108 prayer wheels',
      icon: '☸️',
      rarity: 'rare',
      category: 'Rituals',
      earned: true,
      earnedDate: new Date(2024, 11, 2),
      progress: 108,
      total: 108,
      xpReward: 250
    },
    {
      id: 'lotus-seeker',
      name: 'Lotus Seeker',
      description: 'Meditate for 1000 minutes total',
      icon: '🪷',
      rarity: 'epic',
      category: 'Meditation',
      earned: false,
      progress: 743,
      total: 1000,
      xpReward: 500
    },
    {
      id: 'dharma-wheel',
      name: 'Dharma Wheel Guardian',
      description: 'Complete all monastery AR experiences',
      icon: '⚡',
      rarity: 'legendary',
      category: 'Technology',
      earned: false,
      progress: 18,
      total: 28,
      xpReward: 1000
    },
    {
      id: 'mountain-pilgrim',
      name: 'Mountain Pilgrim',
      description: 'Visit monasteries above 3000m altitude',
      icon: '🏔️',
      rarity: 'epic',
      category: 'Adventure',
      earned: true,
      earnedDate: new Date(2024, 11, 8),
      xpReward: 400
    },
    {
      id: 'cultural-bridge',
      name: 'Cultural Bridge',
      description: 'Connect with 10 local monks or guides',
      icon: '🌉',
      rarity: 'rare',
      category: 'Community',
      earned: false,
      progress: 6,
      total: 10,
      xpReward: 300
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'monastery-explorer',
      title: 'Monastery Explorer',
      description: 'Visit 15 different monasteries',
      category: 'Exploration',
      difficulty: 'intermediate',
      xpReward: 500,
      completed: false,
      progress: 12,
      total: 15,
      icon: <MapPin className="w-5 h-5" />
    },
    {
      id: 'meditation-master',
      title: 'Meditation Master',
      description: 'Complete 30 guided meditation sessions',
      category: 'Spirituality',
      difficulty: 'advanced',
      xpReward: 750,
      completed: true,
      progress: 30,
      total: 30,
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 'ar-pioneer',
      title: 'AR Pioneer',
      description: 'Experience 20 AR monastery tours',
      category: 'Technology',
      difficulty: 'intermediate',
      xpReward: 400,
      completed: false,
      progress: 15,
      total: 20,
      icon: <Eye className="w-5 h-5" />
    },
    {
      id: 'cultural-ambassador',
      title: 'Cultural Ambassador',
      description: 'Share 50 cultural insights',
      category: 'Community',
      difficulty: 'advanced',
      xpReward: 600,
      completed: false,
      progress: 32,
      total: 50,
      icon: <Users className="w-5 h-5" />
    }
  ];

  const activeHunts: TreasureHunt[] = [
    {
      id: 'rumtek-mystery',
      name: 'The Golden Stupa Mystery',
      location: 'Rumtek Monastery',
      difficulty: 'medium',
      participants: 23,
      cluesFound: 3,
      totalClues: 5,
      timeRemaining: '2h 34m',
      reward: '500 XP + Rare Badge',
      isActive: true
    },
    {
      id: 'enchey-legends',
      name: 'Enchey Legends Quest',
      location: 'Enchey Monastery',
      difficulty: 'easy',
      participants: 45,
      cluesFound: 4,
      totalClues: 4,
      timeRemaining: 'Complete!',
      reward: '300 XP + Cultural Insight',
      isActive: false
    },
    {
      id: 'pemayangtse-sacred',
      name: 'Sacred Lotus Challenge',
      location: 'Pemayangtse Monastery',
      difficulty: 'hard',
      participants: 12,
      cluesFound: 1,
      totalClues: 7,
      timeRemaining: '4h 18m',
      reward: '1000 XP + Epic Badge',
      isActive: true
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'Tenzin Lama',
      avatar: '👨‍🦳',
      level: 28,
      xp: 15420,
      badges: 42,
      monasteries: 28,
      country: '🇮🇳'
    },
    {
      rank: 2,
      name: 'Sarah Johnson',
      avatar: '👩',
      level: 24,
      xp: 12890,
      badges: 35,
      monasteries: 25,
      country: '🇺🇸'
    },
    {
      rank: 3,
      name: 'Pemba Sherpa',
      avatar: '👨',
      level: 22,
      xp: 11245,
      badges: 31,
      monasteries: 22,
      country: '🇳🇵'
    },
    {
      rank: 4,
      name: 'You',
      avatar: '🧑',
      level: 12,
      xp: 2847,
      badges: 15,
      monasteries: 12,
      country: '🇮🇳'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAchievementDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      case 'master': return 'bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Stats */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-foreground">Spiritual Journey</h1>
            <p className="text-muted-foreground">Track your progress through Sikkim's sacred lands</p>
          </div>

          {/* Level Progress */}
          <Card className="border-0 shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium">Level {currentLevel}</h2>
                    <p className="text-muted-foreground">Spiritual Seeker</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-primary">{currentXP.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {currentLevel + 1}</span>
                  <span>{xpToNextLevel} XP needed</span>
                </div>
                <Progress value={((totalXPForNextLevel - xpToNextLevel) / totalXPForNextLevel) * 100} className="h-3" />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                <div className="text-center">
                  <div className="text-xl font-medium text-primary">{streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-medium text-primary">{culturalBadges.filter(b => b.earned).length}</div>
                  <div className="text-xs text-muted-foreground">Badges Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-medium text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Monasteries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="hunts">Treasure Hunts</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-6 mt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium">Cultural Badges</h2>
              <p className="text-muted-foreground">Celebrate your spiritual milestones with traditional symbols</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culturalBadges.map((badge) => (
                <Card key={badge.id} className={`border-2 transition-all hover:shadow-lg ${
                  badge.earned ? 'border-primary/20 bg-primary/5' : 'border-border'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl ${
                        badge.earned ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'
                      }`}>
                        {badge.earned ? badge.icon : '❓'}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <h3 className={`font-medium ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                            {badge.name}
                          </h3>
                          <Badge variant="outline" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {badge.description}
                        </p>
                        
                        <div className="text-xs text-muted-foreground">
                          {badge.category} • {badge.xpReward} XP
                        </div>

                        {badge.earned && badge.earnedDate && (
                          <div className="text-xs text-green-600 font-medium">
                            ✓ Earned {badge.earnedDate.toLocaleDateString()}
                          </div>
                        )}

                        {!badge.earned && badge.progress !== undefined && (
                          <div className="space-y-2">
                            <Progress value={(badge.progress / badge.total!) * 100} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              {badge.progress} / {badge.total}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium">Spiritual Achievements</h2>
              <p className="text-muted-foreground">Major milestones in your journey of discovery</p>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`border-2 transition-all hover:shadow-lg ${
                  achievement.completed ? 'border-green-200 bg-green-50' : 'border-border'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg flex-shrink-0 ${
                        achievement.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-medium text-lg ${
                              achievement.completed ? 'text-green-700' : 'text-foreground'
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className="text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getAchievementDifficultyColor(achievement.difficulty)}>
                              {achievement.difficulty}
                            </Badge>
                            <Badge variant="secondary">
                              {achievement.xpReward} XP
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{achievement.category}</span>
                            <span className="font-medium">
                              {achievement.progress} / {achievement.total}
                            </span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.total) * 100} 
                            className={`h-2 ${achievement.completed ? 'bg-green-100' : ''}`}
                          />
                        </div>

                        {achievement.completed && (
                          <div className="flex items-center space-x-2 text-green-600">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Achievement Unlocked!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hunts" className="space-y-6 mt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium">Cultural Treasure Hunts</h2>
              <p className="text-muted-foreground">Discover hidden stories and earn rewards</p>
            </div>

            <div className="space-y-4">
              {activeHunts.map((hunt) => (
                <Card key={hunt.id} className={`border-0 shadow-lg ${
                  hunt.isActive ? 'border-l-4 border-l-primary' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium">{hunt.name}</h3>
                          <Badge variant="outline" className={getDifficultyColor(hunt.difficulty)}>
                            {hunt.difficulty}
                          </Badge>
                          {!hunt.isActive && (
                            <Badge className="bg-green-100 text-green-700">Completed</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hunt.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{hunt.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Reward</div>
                        <div className="font-medium text-primary">{hunt.reward}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Clues Progress</span>
                        <span className="text-sm font-medium">
                          {hunt.cluesFound} / {hunt.totalClues}
                        </span>
                      </div>
                      <Progress 
                        value={(hunt.cluesFound / hunt.totalClues) * 100} 
                        className="h-2"
                      />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            {hunt.isActive ? `${hunt.timeRemaining} remaining` : 'Completed'}
                          </span>
                        </div>
                        {hunt.isActive && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Continue Hunt
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6 mt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium">Global Leaderboard</h2>
              <p className="text-muted-foreground">See how you rank among spiritual travelers worldwide</p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                {leaderboard.map((entry, index) => (
                  <div key={entry.rank} className={`p-4 border-b last:border-b-0 ${
                    entry.name === 'You' ? 'bg-primary/5 border-primary/20' : ''
                  } ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                          entry.rank === 2 ? 'bg-gray-300 text-gray-700' :
                          entry.rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {entry.rank <= 3 ? (
                            entry.rank === 1 ? '👑' : 
                            entry.rank === 2 ? '🥈' : '🥉'
                          ) : (
                            entry.rank
                          )}
                        </div>
                        <div className="text-2xl">{entry.avatar}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${entry.name === 'You' ? 'text-primary' : ''}`}>
                              {entry.name}
                            </span>
                            <span>{entry.country}</span>
                            {entry.name === 'You' && (
                              <Badge variant="secondary" className="text-xs">You</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Level {entry.level} • {entry.xp.toLocaleString()} XP
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1" />
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-sm font-medium">{entry.badges}</div>
                          <div className="text-xs text-muted-foreground">Badges</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{entry.monasteries}</div>
                          <div className="text-xs text-muted-foreground">Monasteries</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Leaderboard updates daily • Compete with travelers from around the world
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}