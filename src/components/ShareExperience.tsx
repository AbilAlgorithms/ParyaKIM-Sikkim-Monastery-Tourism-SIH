import { useState } from 'react';
import { VideoUpload } from './VideoUpload';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Share2, 
  Star,
  Award,
  Sparkles
} from 'lucide-react';

interface SharedVideo {
  id: string;
  title: string;
  monastery: string;
  thumbnail: string;
  duration: string;
  likes: number;
  views: number;
  author: string;
  date: string;
}

const featuredVideos: SharedVideo[] = [
  {
    id: '1',
    title: 'Morning Prayers at Rumtek Monastery',
    monastery: 'Rumtek Monastery',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
    duration: '3:24',
    likes: 142,
    views: 1834,
    author: 'Tenzin Norbu',
    date: '2 days ago'
  },
  {
    id: '2',
    title: 'Sunset Meditation at Pemayangtse',
    monastery: 'Pemayangtse Monastery',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    duration: '5:17',
    likes: 98,
    views: 967,
    author: 'Sarah Chen',
    date: '1 week ago'
  },
  {
    id: '3',
    title: 'Butter Lamp Ceremony',
    monastery: 'Enchey Monastery',
    thumbnail: 'https://images.unsplash.com/photo-1609779331068-c0cfcd48eae2?w=400',
    duration: '2:45',
    likes: 203,
    views: 2156,
    author: 'Lobsang Dhondup',
    date: '3 days ago'
  }
];

const monasteries = [
  'Rumtek Monastery',
  'Pemayangtse Monastery', 
  'Enchey Monastery',
  'Tashiding Monastery',
  'Dubdi Monastery',
  'Phensang Monastery',
  'Sanga Choeling',
  'Ralang Monastery',
  'Ralong Monastery',
  'Other'
];

export function ShareExperience() {
  const [activeTab, setActiveTab] = useState<'upload' | 'community'>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    monastery: '',
    experience: '',
    tags: ''
  });

  const handleVideoUploaded = (file: File) => {
    setVideoFile(file);
  };

  const handleSubmit = () => {
    if (videoFile && formData.title && formData.monastery) {
      // Handle video submission
      console.log('Submitting video:', { videoFile, ...formData });
      // Reset form or show success message
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-white py-8" style={{ background: 'linear-gradient(135deg, #4A90E2, #3A7BD5)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Camera className="w-4 h-4 mr-2" />
              Community Stories
            </Badge>
            <h1 className="text-3xl md:text-4xl mb-3" style={{ fontWeight: 600 }}>
              Share Your Spiritual Journey
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Connect with fellow travelers by sharing your monastery experiences and sacred moments
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'upload'
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Upload Video
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'community'
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Community Videos
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === 'upload' ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Upload */}
              <div>
                <VideoUpload onVideoUploaded={handleVideoUploaded} />
              </div>

              {/* Video Details Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span>Video Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Video Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Morning prayers at Rumtek Monastery"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="monastery">Monastery *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, monastery: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select monastery" />
                        </SelectTrigger>
                        <SelectContent>
                          {monasteries.map(monastery => (
                            <SelectItem key={monastery} value={monastery}>
                              {monastery}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Share your experience and what makes this moment special..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Experience Type</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="What did you capture?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prayer-ceremony">Prayer Ceremony</SelectItem>
                          <SelectItem value="meditation">Meditation Session</SelectItem>
                          <SelectItem value="architecture">Architecture & Art</SelectItem>
                          <SelectItem value="festival">Festival/Celebration</SelectItem>
                          <SelectItem value="daily-life">Daily Monastery Life</SelectItem>
                          <SelectItem value="nature">Monastery & Nature</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (optional)</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., #Buddhism #Meditation #Himalayas"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>

                    <Button 
                      onClick={handleSubmit}
                      disabled={!videoFile || !formData.title || !formData.monastery}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share with Community
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Community Videos */
          <div className="max-w-6xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">1,247</h3>
                  <p className="text-muted-foreground">Videos Shared</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">892</h3>
                  <p className="text-muted-foreground">Community Members</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">156</h3>
                  <p className="text-muted-foreground">Featured Stories</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Videos */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Featured Community Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredVideos.map(video => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                          <Star className="w-4 h-4 mr-1" />
                          Watch
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{video.monastery}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>by {video.author}</span>
                        <span>{video.date}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{video.likes}</span>
                          </span>
                          <span>{video.views} views</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}