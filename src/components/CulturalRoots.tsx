import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  User, 
  Play, 
  Volume2, 
  MapPin, 
  ShoppingBag, 
  ChefHat, 
  Upload, 
  Camera, 
  Mic,
  Heart,
  Star,
  AudioWaveform,
  Book,
  TreePine,
  Mountain
} from 'lucide-react';

export const CulturalRoots = React.memo(() => {
  const nativeWords = React.useMemo(() => [
    {
      id: 1,
      native: "གསུང་རབ།",
      script: "Tibetan",
      pronunciation: "sung-rab",
      meaning: "Sacred teachings",
      category: "Spiritual"
    },
    {
      id: 2,
      native: "དགོན་པ།",
      script: "Tibetan", 
      pronunciation: "gon-pa",
      meaning: "Monastery",
      category: "Places"
    },
    {
      id: 3,
      native: "བཀྲ་ཤིས་བདེ་ལེགས།",
      script: "Tibetan",
      pronunciation: "tashi delek",
      meaning: "Good fortune and happiness",
      category: "Greetings"
    },
    {
      id: 4,
      native: "སེམས་ཅན།",
      script: "Tibetan",
      pronunciation: "sem-chen",
      meaning: "Sentient beings",
      category: "Philosophy"
    }
  ], []);

  const artisans = React.useMemo(() => [
    {
      id: 1,
      name: "Pemba Sherpa",
      craft: "Handwoven Shawls",
      location: "Zuluk, East Sikkim",
      image: "https://images.unsplash.com/photo-1627726997943-6e397135f78a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd292ZW4lMjBzaGF3bCUyMHRleHRpbGUlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTc1MTk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      price: "₹2,500"
    },
    {
      id: 2,
      name: "Dolma Lepcha",
      craft: "Bamboo Baskets",
      location: "Dzongu, North Sikkim",
      image: "https://images.unsplash.com/photo-1699800751646-6e0584f004f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBiYXNrZXQlMjB0cmFkaXRpb25hbCUyMGNyYWZ0fGVufDF8fHx8MTc1NzUxOTU4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      price: "₹1,200"
    },
    {
      id: 3,
      name: "Tenzin Norbu",
      craft: "Prayer Wheels",
      location: "Rumtek, East Sikkim",
      image: "https://images.unsplash.com/photo-1737606985741-479bece921b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhhbmRjcmFmdCUyMGFydGlzYW4lMjB3ZWF2aW5nfGVufDF8fHx8MTc1NzUxOTU3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5.0,
      price: "₹3,800"
    }
  ], []);

  const elderRecipes = React.useMemo(() => [
    {
      id: 1,
      dish: "Buckwheat Dumplings (Momos)",
      elder: "Ama Choden, 78",
      story: "My grandmother taught me this recipe during the harvest festival. Each fold represents a prayer for prosperity.",
      image: "https://images.unsplash.com/photo-1513862153653-f8b7324e1779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGR1bXBsaW5nJTIwZm9vZCUyMGNvb2tpbmd8ZW58MXx8fHwxNzU3NTE5NTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Intermediate",
      time: "45 mins"
    },
    {
      id: 2,
      dish: "Fermented Radish Soup",
      elder: "Popo Sangay, 82",
      story: "This warming soup sustained our ancestors through harsh winters in the high mountains.",
      image: "https://images.unsplash.com/photo-1513862153653-f8b7324e1779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGR1bXBsaW5nJTIwZm9vZCUyMGNvb2tpbmd8ZW58MXx8fHwxNzU3NTE5NTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "Easy",
      time: "30 mins"
    }
  ], []);

  return (
    <div style={{ backgroundColor: '#F5F1E8', minHeight: '100vh', color: '#2C3E50' }}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-6xl mb-4"
            style={{ 
              fontFamily: 'serif',
              fontWeight: 400,
              color: '#8B4513',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Cultural Roots
          </h1>
          <p 
            className="text-xl text-center"
            style={{ 
              color: '#6B4E3D',
              fontWeight: 300,
              letterSpacing: '0.5px'
            }}
          >
            Preserve, Learn & Share Heritage
          </p>
        </div>

        {/* Featured Oral Storytelling Section */}
        <div className="mb-16">
          <Card 
            className="relative overflow-hidden border-0 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 100%)',
              borderRadius: '20px'
            }}
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1734501148369-5b08528aa0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGR1bXBsaW5nJTIwZm9vZCUyMGNvb2tpbmd8ZW58MXx8fHwxNzU3NTE5NTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Elder storytelling"
                className="w-full h-80 object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,69,19,0.7) 0%, rgba(160,82,45,0.5) 100%)'
                }}
              />
              
              <div className="absolute inset-0 flex items-end p-8">
                <div className="text-white">
                  <h2 
                    className="text-3xl mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    Oral Legends of the Lepchas
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    Experience myths passed down through generations
                  </p>
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-3"
                    style={{
                      backgroundColor: '#CD853F',
                      color: '#ffffff',
                      border: '2px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    <AudioWaveform className="w-5 h-5 mr-2" />
                    Listen Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Language & Proverbs Carousel */}
        <div className="mb-16">
          <h2 
            className="text-3xl mb-8 text-center"
            style={{ 
              fontWeight: 500, 
              color: '#8B4513'
            }}
          >
            Learn Native Words & Wisdom
          </h2>
          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
              {nativeWords.map((word) => (
                <Card
                  key={word.id}
                  className="flex-shrink-0 w-80 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: '#FFF8DC',
                    borderRadius: '16px'
                  }}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Badge 
                        variant="secondary" 
                        className="mb-4"
                        style={{ 
                          backgroundColor: '#DEB887', 
                          color: '#8B4513' 
                        }}
                      >
                        {word.category}
                      </Badge>
                      
                      <div 
                        className="text-2xl mb-3"
                        style={{ 
                          fontFamily: 'serif',
                          color: '#8B4513',
                          fontWeight: 500
                        }}
                      >
                        {word.native}
                      </div>
                      
                      <div 
                        className="text-lg mb-2"
                        style={{ color: '#A0522D', fontStyle: 'italic' }}
                      >
                        /{word.pronunciation}/
                      </div>
                      
                      <p 
                        className="text-base mb-6"
                        style={{ color: '#6B4E3D' }}
                      >
                        {word.meaning}
                      </p>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        style={{
                          borderColor: '#CD853F',
                          color: '#CD853F'
                        }}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Pronounce
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Cultural Map Preview */}
        <div className="mb-16">
          <h2 
            className="text-3xl mb-8 text-center"
            style={{ 
              fontWeight: 500, 
              color: '#8B4513'
            }}
          >
            Explore Culture by Region
          </h2>
          
          <Card 
            className="border-0 shadow-xl overflow-hidden"
            style={{ borderRadius: '20px' }}
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1734261781803-98cf4d4dbc0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlJTIwbWFwJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1NzUxOTU5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cultural heritage map"
                className="w-full h-64 object-cover"
              />
              
              {/* Interactive pins overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 w-full h-full relative">
                  <div className="absolute top-1/4 left-1/4">
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse cursor-pointer"
                      style={{ backgroundColor: '#CD853F', boxShadow: '0 0 20px rgba(205,133,63,0.6)' }}
                      title="North Sikkim Monasteries"
                    />
                  </div>
                  <div className="absolute top-1/2 right-1/3">
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse cursor-pointer"
                      style={{ backgroundColor: '#2ECC71', boxShadow: '0 0 20px rgba(46,204,113,0.6)' }}
                      title="Sacred Lakes"
                    />
                  </div>
                  <div className="absolute bottom-1/3 left-1/2">
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse cursor-pointer"
                      style={{ backgroundColor: '#F5A623', boxShadow: '0 0 20px rgba(245,166,35,0.6)' }}
                      title="Traditional Villages"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6 text-center">
              <Button
                size="lg"
                className="rounded-full px-8"
                style={{
                  backgroundColor: '#CD853F',
                  color: '#ffffff'
                }}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Explore by Region
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Artisan Marketplace */}
        <div className="mb-16">
          <h2 
            className="text-3xl mb-8 text-center"
            style={{ 
              fontWeight: 500, 
              color: '#8B4513'
            }}
          >
            Support Local Artisans
          </h2>
          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
              {artisans.map((artisan) => (
                <Card
                  key={artisan.id}
                  className="flex-shrink-0 w-80 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  style={{
                    backgroundColor: '#FFFAF0',
                    borderRadius: '16px'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={artisan.image}
                      alt={artisan.craft}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="secondary"
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)', 
                          color: '#8B4513' 
                        }}
                      >
                        <Star className="w-3 h-3 mr-1 fill-current" style={{ color: '#F5A623' }} />
                        {artisan.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#DEB887' }}
                      >
                        <User className="w-4 h-4" style={{ color: '#8B4513' }} />
                      </div>
                      <div>
                        <h3 
                          className="text-lg"
                          style={{ fontWeight: 600, color: '#8B4513' }}
                        >
                          {artisan.name}
                        </h3>
                      </div>
                    </div>
                    
                    <p 
                      className="text-lg mb-2"
                      style={{ color: '#6B4E3D', fontWeight: 500 }}
                    >
                      {artisan.craft}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <MapPin className="w-4 h-4 mr-2" style={{ color: '#A0522D' }} />
                      <span className="text-sm" style={{ color: '#A0522D' }}>
                        {artisan.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xl"
                        style={{ color: '#8B4513', fontWeight: 600 }}
                      >
                        {artisan.price}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full"
                        style={{
                          backgroundColor: '#CD853F',
                          color: '#ffffff'
                        }}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Traditional Recipes from Elders */}
        <div className="mb-16">
          <h2 
            className="text-3xl mb-8 text-center"
            style={{ 
              fontWeight: 500, 
              color: '#8B4513'
            }}
          >
            Recipes from Elders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {elderRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: '#FFF8DC',
                  borderRadius: '16px'
                }}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.dish}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        color: '#8B4513' 
                      }}
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant="secondary"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        color: '#8B4513' 
                      }}
                    >
                      {recipe.time}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 
                    className="text-xl mb-3"
                    style={{ fontWeight: 600, color: '#8B4513' }}
                  >
                    {recipe.dish}
                  </h3>
                  
                  <p 
                    className="text-sm mb-4 italic"
                    style={{ color: '#A0522D' }}
                  >
                    Shared by {recipe.elder}
                  </p>
                  
                  <p 
                    className="text-base mb-6 leading-relaxed"
                    style={{ color: '#6B4E3D' }}
                  >
                    "{recipe.story}"
                  </p>
                  
                  <Button
                    className="w-full rounded-full"
                    style={{
                      backgroundColor: '#CD853F',
                      color: '#ffffff'
                    }}
                  >
                    <ChefHat className="w-4 h-4 mr-2" />
                    Cook Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Submission Section */}
        <div className="mb-16">
          <Card 
            className="border-0 shadow-xl text-center"
            style={{
              backgroundColor: '#F5DEB3',
              borderRadius: '20px'
            }}
          >
            <CardContent className="p-12">
              <h2 
                className="text-3xl mb-6"
                style={{ 
                  fontWeight: 500, 
                  color: '#8B4513'
                }}
              >
                Preserve With Us
              </h2>
              
              <p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                style={{ color: '#6B4E3D' }}
              >
                Know a ritual, folk song, or custom? Share it with us!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  style={{
                    borderColor: '#CD853F',
                    color: '#CD853F'
                  }}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Upload Photo
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  style={{
                    borderColor: '#CD853F',
                    color: '#CD853F'
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Upload Video
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  style={{
                    borderColor: '#CD853F',
                    color: '#CD853F'
                  }}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Record Audio
                </Button>
              </div>
              
              <Button
                size="lg"
                className="rounded-full px-12 py-4"
                style={{
                  backgroundColor: '#CD853F',
                  color: '#ffffff',
                  fontSize: '18px'
                }}
              >
                <Heart className="w-5 h-5 mr-2" />
                Contribute to Heritage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

CulturalRoots.displayName = 'CulturalRoots';