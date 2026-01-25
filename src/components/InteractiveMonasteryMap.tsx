import { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  MapPin, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Mountain, 
  Accessibility, 
  Heart,
  Camera,
  Navigation,
  Eye,
  Car,
  Walking,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Compass,
  Zap,
  Sun,
  Cloud,
  Snowflake,
  ExternalLink,
  Phone,
  Mail
} from 'lucide-react';
import { monasteryData, Monastery, getDirectionsUrl } from '../utils/monasteryData';
import { showNotification, notifications } from '../utils/notifications';

interface MapFilters {
  difficulty: string[];
  accessibility: boolean | null;
  spiritualLevel: string[];
  crowdLevel: string[];
  hasARTour: boolean | null;
}

export const InteractiveMonasteryMap = memo(function InteractiveMonasteryMap() {
  const [selectedMonastery, setSelectedMonastery] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<MapFilters>({
    difficulty: [],
    accessibility: null,
    spiritualLevel: [],
    crowdLevel: [],
    hasARTour: null
  });
  const [mapMode, setMapMode] = useState<'satellite' | 'terrain' | 'cultural'>('cultural');
  const [hoveredMonastery, setHoveredMonastery] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  const monasteries: Monastery[] = useMemo(() => monasteryData, []);

  // Performance optimization: Memoize filtered monasteries
  const filteredMonasteries = useMemo(() => {
    return monasteries.filter(monastery => {
      if (activeFilters.difficulty.length > 0 && !activeFilters.difficulty.includes(monastery.difficulty)) return false;
      if (activeFilters.accessibility !== null && monastery.accessibility !== activeFilters.accessibility) return false;
      if (activeFilters.spiritualLevel.length > 0 && !activeFilters.spiritualLevel.includes(monastery.spiritualLevel)) return false;
      if (activeFilters.crowdLevel.length > 0 && !activeFilters.crowdLevel.includes(monastery.crowdLevel)) return false;
      if (activeFilters.hasARTour !== null && !monastery.experiences.some(exp => exp.includes('AR')) === activeFilters.hasARTour) return false;
      return true;
    });
  }, [monasteries, activeFilters]);

  const selectedMonasteryData = useMemo(() => {
    return monasteries.find(m => m.id === selectedMonastery);
  }, [monasteries, selectedMonastery]);

  // Performance optimization: Use useCallback for event handlers
  const handleMonasteryClick = useCallback((monasteryId: string) => {
    setIsLoading(true);
    showNotification.info('Loading monastery details...');
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setSelectedMonastery(monasteryId);
      setIsModalOpen(true);
      setIsLoading(false);
      showNotification.success('Monastery details loaded!');
    }, 800);
  }, []);

  const handleMonasteryHover = useCallback((monasteryId: string | null) => {
    setHoveredMonastery(monasteryId);
  }, []);

  const toggleFilter = useCallback((category: keyof MapFilters, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: Array.isArray(prev[category]) 
        ? (prev[category] as any[]).includes(value)
          ? (prev[category] as any[]).filter(v => v !== value)
          : [...(prev[category] as any[]), value]
        : prev[category] === value ? null : value
    }));
  }, []);

  // Real-time data state
  const [liveData, setLiveData] = useState({
    weather: { condition: 'Perfect', temp: 18, icon: 'sunny' },
    totalVisitors: 42,
    roadConditions: 'Good',
    timestamp: new Date()
  });

  // Monitor map container dimensions for responsive positioning
  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        const { width, height } = mapContainerRef.current.getBoundingClientRect();
        setMapDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        totalVisitors: Math.floor(Math.random() * 20) + 30, // 30-50 visitors
        weather: {
          ...prev.weather,
          temp: 16 + Math.floor(Math.random() * 8), // 16-24°C
        },
        timestamp: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate crowd level changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update crowd levels for some monasteries to simulate real-time changes
      const crowdLevels = ['Low', 'Medium', 'High'];
      // This would normally update from a real API
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-medium text-foreground">Sacred Monastery Map</h1>
          <p className="text-muted-foreground">Discover Sikkim's spiritual treasures with real-time insights</p>
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="insights">Live Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveFilters({ difficulty: [], accessibility: null, spiritualLevel: [], crowdLevel: [], hasARTour: null })}
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {/* Difficulty Filters */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                    <div className="flex gap-2">
                      {['Easy', 'Moderate', 'Challenging'].map(level => (
                        <Button
                          key={level}
                          variant={activeFilters.difficulty.includes(level) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter('difficulty', level)}
                          className="text-xs"
                        >
                          <Mountain className="w-3 h-3 mr-1" />
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Accessibility Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Accessibility</label>
                    <Button
                      variant={activeFilters.accessibility === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter('accessibility', true)}
                      className="text-xs"
                    >
                      <Accessibility className="w-3 h-3 mr-1" />
                      Accessible
                    </Button>
                  </div>

                  {/* Spiritual Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Spiritual Level</label>
                    <div className="flex gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <Button
                          key={level}
                          variant={activeFilters.spiritualLevel.includes(level) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter('spiritualLevel', level)}
                          className="text-xs"
                        >
                          <Heart className="w-3 h-3 mr-1" />
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Crowd Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Crowd Level</label>
                    <div className="flex gap-2">
                      {['Low', 'Medium', 'High'].map(level => (
                        <Button
                          key={level}
                          variant={activeFilters.crowdLevel.includes(level) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter('crowdLevel', level)}
                          className="text-xs"
                        >
                          <Users className="w-3 h-3 mr-1" />
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* AR Tour Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Features</label>
                    <Button
                      variant={activeFilters.hasARTour === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter('hasARTour', true)}
                      className="text-xs"
                    >
                      <Camera className="w-3 h-3 mr-1" />
                      AR Tours
                    </Button>
                  </div>
                </div>

                {/* Active Filter Count */}
                {(activeFilters.difficulty.length > 0 || activeFilters.accessibility !== null || 
                  activeFilters.spiritualLevel.length > 0 || activeFilters.crowdLevel.length > 0 || 
                  activeFilters.hasARTour !== null) && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredMonasteries.length} of {monasteries.length} monasteries
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>Sikkim Monastery Map</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {['cultural', 'terrain', 'satellite'].map(mode => (
                            <Button
                              key={mode}
                              variant={mapMode === mode ? "default" : "outline"}
                              size="sm"
                              onClick={() => setMapMode(mode as any)}
                              className="text-xs capitalize"
                            >
                              {mode}
                            </Button>
                          ))}
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                          Live
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div 
                      ref={mapContainerRef}
                      className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden rounded-b-lg touch-pan-y"
                      style={{
                        touchAction: 'pan-y', // Allow vertical scrolling on mobile but prevent horizontal pan
                        WebkitTouchCallout: 'none', // Prevent text selection on iOS
                        WebkitUserSelect: 'none',
                        userSelect: 'none'
                      }}
                    >
                      {/* Map Background with Animation */}
                      <motion.div 
                        className={`absolute inset-0 ${
                          mapMode === 'cultural' ? 'bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100' :
                          mapMode === 'terrain' ? 'bg-gradient-to-br from-green-200 to-brown-200' :
                          'bg-gradient-to-br from-gray-300 to-blue-200'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Traditional Pattern Overlay for Cultural Mode */}
                      <AnimatePresence>
                        {mapMode === 'cultural' && (
                          <motion.div 
                            className="absolute inset-0 opacity-10 bg-repeat" 
                            style={{ 
                              backgroundImage: 'radial-gradient(circle, #8b1538 1px, transparent 1px)', 
                              backgroundSize: '20px 20px' 
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Loading Overlay */}
                      <AnimatePresence>
                        {isLoading && (
                          <motion.div 
                            className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div 
                              className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Enhanced Monastery Markers */}
                      <AnimatePresence>
                        {filteredMonasteries.map((monastery, index) => {
                          // Improved coordinate mapping with bounds checking
                          const latRange = { min: 27.0, max: 27.6 };
                          const lngRange = { min: 88.0, max: 89.0 };
                          
                          const mapTop = ((latRange.max - monastery.coordinates.lat) / (latRange.max - latRange.min)) * 85 + 7.5;
                          const mapLeft = ((monastery.coordinates.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 85 + 7.5;
                          
                          const isSelected = selectedMonastery === monastery.id;
                          const isHovered = hoveredMonastery === monastery.id;
                          
                          return (
                            <motion.button
                              key={monastery.id}
                              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 touch-manipulation"
                              style={{ 
                                top: `${Math.max(5, Math.min(90, mapTop))}%`, 
                                left: `${Math.max(5, Math.min(90, mapLeft))}%`,
                                minWidth: '44px', // Touch target size for accessibility
                                minHeight: '44px'
                              }}
                              onClick={() => handleMonasteryClick(monastery.id)}
                              onMouseEnter={() => handleMonasteryHover(monastery.id)}
                              onMouseLeave={() => handleMonasteryHover(null)}
                              onTouchStart={() => handleMonasteryHover(monastery.id)}
                              onTouchEnd={() => {
                                // Small delay for touch devices to see hover state
                                setTimeout(() => handleMonasteryHover(null), 1000);
                              }}
                              disabled={isLoading}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: isSelected ? 1.3 : isHovered ? 1.1 : 1,
                                opacity: 1
                              }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ 
                                duration: 0.3,
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                              }}
                              whileHover={{ scale: isSelected ? 1.3 : 1.15 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="relative">
                                {/* Pulse Ring for Selected */}
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div 
                                      className="absolute -inset-4 rounded-full border-2 border-primary"
                                      initial={{ scale: 0.8, opacity: 0.8 }}
                                      animate={{ 
                                        scale: [0.8, 1.2, 0.8],
                                        opacity: [0.8, 0.3, 0.8]
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    />
                                  )}
                                </AnimatePresence>
                                
                                {/* Main Monastery Pin */}
                                <motion.div 
                                  className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center relative overflow-hidden ${
                                    monastery.accessibility ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 
                                    monastery.difficulty === 'Challenging' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                                    'bg-gradient-to-br from-primary to-accent'
                                  }`}
                                  whileHover={{ 
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                  }}
                                >
                                  <MapPin className="w-6 h-6 text-white z-10" />
                                  
                                  {/* Shimmer Effect */}
                                  <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: index * 0.2
                                    }}
                                  />
                                </motion.div>

                                {/* Enhanced Crowd Level Indicator */}
                                <motion.div 
                                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center ${
                                    monastery.crowdLevel === 'Low' ? 'bg-green-500' :
                                    monastery.crowdLevel === 'Medium' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.05 + 0.3 }}
                                >
                                  <Users className="w-2 h-2 text-white" />
                                </motion.div>

                                {/* Accessibility Icon */}
                                {monastery.accessibility && (
                                  <motion.div 
                                    className="absolute -bottom-1 -left-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.05 + 0.4 }}
                                  >
                                    <Accessibility className="w-2 h-2 text-white" />
                                  </motion.div>
                                )}

                                {/* Rating Badge */}
                                <motion.div 
                                  className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-1 py-0.5 rounded-full font-bold shadow-md"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.05 + 0.5 }}
                                >
                                  {monastery.rating}
                                </motion.div>
                              </div>

                              {/* Enhanced Hover Tooltip */}
                              <AnimatePresence>
                                {isHovered && (
                                  <motion.div 
                                    className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap z-30 shadow-xl"
                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="font-semibold mb-1">{monastery.name}</div>
                                    <div className="text-xs text-gray-300 space-y-1">
                                      <div className="flex items-center space-x-2">
                                        <Users className="w-3 h-3" />
                                        <span>{monastery.crowdLevel} crowds</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Mountain className="w-3 h-3" />
                                        <span>{monastery.difficulty}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Clock className="w-3 h-3" />
                                        <span>{monastery.duration}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Star className="w-3 h-3 text-yellow-400" />
                                        <span>{monastery.rating}/5</span>
                                      </div>
                                    </div>
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          )
                        })}
                      </AnimatePresence>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <h4 className="text-sm font-medium mb-2">Legend</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                            <span>Low Crowds</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <span>Medium Crowds</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <span>High Crowds</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Accessibility className="w-3 h-3 text-blue-500" />
                            <span>Accessible</span>
                          </div>
                        </div>
                      </div>

                      {/* Weather Overlay */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <div>
                          <div className="font-medium">{liveData.weather.temp}°C</div>
                          <div className="text-xs text-muted-foreground">{liveData.weather.condition} for visits</div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monastery Details */}
              <div className="space-y-6">
                {selectedMonasteryData ? (
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                        <ImageWithFallback
                          src={selectedMonasteryData.image}
                          alt={selectedMonasteryData.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Badge variant="secondary" className="bg-black/70 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            {selectedMonasteryData.rating}
                          </Badge>
                          {selectedMonasteryData.accessibility && (
                            <Badge variant="secondary" className="bg-blue-500 text-white">
                              <Accessibility className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{selectedMonasteryData.name}</CardTitle>
                      <p className="text-muted-foreground">{selectedMonasteryData.location}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-sm leading-relaxed">{selectedMonasteryData.description}</p>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium">{selectedMonasteryData.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Crowd Level</span>
                            <Badge variant="secondary" className={getCrowdColor(selectedMonasteryData.crowdLevel)}>
                              {selectedMonasteryData.crowdLevel}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Difficulty</span>
                            <Badge variant="secondary" className={getDifficultyColor(selectedMonasteryData.difficulty)}>
                              {selectedMonasteryData.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Distance</span>
                            <span className="font-medium">{selectedMonasteryData.distanceFromGangtok}km</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="font-medium mb-3">Highlights</h4>
                        <div className="space-y-2">
                          {selectedMonasteryData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Experiences */}
                      <div>
                        <h4 className="font-medium mb-3">Available Experiences</h4>
                        <div className="space-y-2">
                          {selectedMonasteryData.experiences.map((experience, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-1">
                              {experience.includes('AR') && <Camera className="w-3 h-3 mr-1" />}
                              {experience.includes('Meditation') && <Heart className="w-3 h-3 mr-1" />}
                              {experience.includes('Virtual') && <Eye className="w-3 h-3 mr-1" />}
                              {experience}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button 
                          className="bg-primary hover:bg-primary/90 text-white"
                          onClick={() => {
                            try {
                              showNotification.info(notifications.directions.opening);
                              const directionsUrl = getDirectionsUrl(selectedMonasteryData.coordinates);
                              window.open(directionsUrl, '_blank');
                              showNotification.success(notifications.directions.opened);
                            } catch (error) {
                              showNotification.error(notifications.directions.failed);
                            }
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Get Directions
                        </Button>
                        <Button variant="outline">
                          <Camera className="w-4 h-4 mr-1" />
                          AR Experience
                        </Button>
                      </div>

                      {/* Contact Information */}
                      {selectedMonasteryData.contactInfo.phone && (
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-3">Contact Information</h4>
                          <div className="space-y-2">
                            {selectedMonasteryData.contactInfo.phone && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <a 
                                  href={`tel:${selectedMonasteryData.contactInfo.phone}`}
                                  className="text-primary hover:underline"
                                >
                                  {selectedMonasteryData.contactInfo.phone}
                                </a>
                              </div>
                            )}
                            {selectedMonasteryData.contactInfo.email && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <a 
                                  href={`mailto:${selectedMonasteryData.contactInfo.email}`}
                                  className="text-primary hover:underline"
                                >
                                  {selectedMonasteryData.contactInfo.email}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      <div className="pt-4 border-t space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Opening Hours</span>
                          <span className="font-medium">{selectedMonasteryData.openingHours}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Entry Fee</span>
                          <span className="font-medium">{selectedMonasteryData.entryFee}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Best Time to Visit</span>
                          <span className="font-medium">{selectedMonasteryData.bestTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="text-center py-12">
                      <Compass className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Select a Monastery</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Click on any monastery marker to explore detailed information, crowd levels, and available experiences.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Insights */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Today's Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weather Conditions</span>
                      <div className="flex items-center space-x-1">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Perfect</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Best Visiting Time</span>
                      <Badge variant="secondary" className="text-xs">6 AM - 10 AM</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Travelers</span>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{liveData.totalVisitors} people</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Road Conditions</span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{liveData.roadConditions}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMonasteries.map((monastery) => (
                <Card key={monastery.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => handleMonasteryClick(monastery.id)}>
                  <div className="aspect-video relative rounded-t-lg overflow-hidden">
                        <ImageWithFallback
                          src={monastery.image}
                          alt={monastery.name}
                          className="w-full h-full object-cover"
                          lazy={true}
                          quality={85}
                        />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {monastery.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 flex space-x-1">
                      <Badge variant="secondary" className={`text-xs ${getCrowdColor(monastery.crowdLevel)}`}>
                        {monastery.crowdLevel} crowds
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{monastery.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{monastery.location}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{monastery.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Car className="w-3 h-3" />
                        <span>{monastery.distanceFromGangtok}km</span>
                      </span>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(monastery.difficulty)}`}>
                        {monastery.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>Popular Today</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monasteries.slice(0, 3).map((monastery, index) => (
                      <div key={monastery.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span className="text-sm">{monastery.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{monastery.rating}★</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>Crowd Levels</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Low Crowds</span>
                      <span className="text-sm font-medium text-green-600">
                        {monasteries.filter(m => m.crowdLevel === 'Low').length} places
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medium Crowds</span>
                      <span className="text-sm font-medium text-yellow-600">
                        {monasteries.filter(m => m.crowdLevel === 'Medium').length} places
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High Crowds</span>
                      <span className="text-sm font-medium text-red-600">
                        {monasteries.filter(m => m.crowdLevel === 'High').length} places
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <span className="font-medium">Best Time:</span> Early morning visits have 60% fewer crowds
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <span className="font-medium">Weather:</span> Perfect conditions for the next 3 hours
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <span className="font-medium">Route:</span> Rumtek → Enchey saves 45 minutes travel time
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Enhanced Monastery Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto w-full sm:max-w-2xl md:max-w-4xl">
          <AnimatePresence>
            {selectedMonasteryData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="space-y-4">
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={selectedMonasteryData.image}
                      alt={selectedMonasteryData.name}
                      className="w-full h-full object-cover"
                      lazy={false}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <DialogTitle className="text-2xl font-bold text-white mb-2">
                        {selectedMonasteryData.name}
                      </DialogTitle>
                      <div className="flex items-center space-x-4 text-white/90">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedMonasteryData.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{selectedMonasteryData.rating}/5</span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${getCrowdColor(selectedMonasteryData.crowdLevel)} font-medium`}
                        >
                          {selectedMonasteryData.crowdLevel} Crowd
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Accessibility Badge */}
                    {selectedMonasteryData.accessibility && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-blue-500 text-white">
                          <Accessibility className="w-3 h-3 mr-1" />
                          Accessible
                        </Badge>
                      </div>
                    )}
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedMonasteryData.description}
                      </p>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">{selectedMonasteryData.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Car className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">{selectedMonasteryData.distanceFromGangtok}km</div>
                        <div className="text-xs text-muted-foreground">From Gangtok</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Mountain className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">{selectedMonasteryData.altitude}m</div>
                        <div className="text-xs text-muted-foreground">Altitude</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Heart className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">{selectedMonasteryData.spiritualLevel}</div>
                        <div className="text-xs text-muted-foreground">Level</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedMonasteryData.highlights.map((highlight, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Experiences */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Available Experiences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedMonasteryData.experiences.map((experience, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {experience.includes('AR') && <Camera className="w-4 h-4 text-primary" />}
                            {experience.includes('Meditation') && <Heart className="w-4 h-4 text-primary" />}
                            {experience.includes('Virtual') && <Eye className="w-4 h-4 text-primary" />}
                            {experience.includes('Photography') && <Camera className="w-4 h-4 text-primary" />}
                            {!experience.includes('AR') && !experience.includes('Meditation') && !experience.includes('Virtual') && !experience.includes('Photography') && <Compass className="w-4 h-4 text-primary" />}
                            <span className="text-sm font-medium">{experience}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMonasteryData.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="bg-muted text-foreground">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white"
                          onClick={() => {
                            try {
                              showNotification.info(notifications.directions.opening);
                              const directionsUrl = getDirectionsUrl(selectedMonasteryData.coordinates);
                              window.open(directionsUrl, '_blank');
                              showNotification.success(notifications.directions.opened);
                            } catch (error) {
                              showNotification.error(notifications.directions.failed);
                            }
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Camera className="w-4 h-4 mr-2" />
                          AR Experience
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Heart className="w-4 h-4 mr-2" />
                          Save to Favorites
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Essential Information */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Essential Info</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Opening Hours</span>
                          <span className="font-medium">{selectedMonasteryData.openingHours}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Entry Fee</span>
                          <span className="font-medium">{selectedMonasteryData.entryFee}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Best Time</span>
                          <span className="font-medium">{selectedMonasteryData.bestTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Difficulty</span>
                          <Badge variant="outline" className={getDifficultyColor(selectedMonasteryData.difficulty)}>
                            {selectedMonasteryData.difficulty}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contact Information */}
                    {(selectedMonasteryData.contactInfo.phone || selectedMonasteryData.contactInfo.email) && (
                      <Card className="border-0 shadow-lg">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg">Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {selectedMonasteryData.contactInfo.phone && (
                            <div className="flex items-center space-x-3">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <a 
                                href={`tel:${selectedMonasteryData.contactInfo.phone}`}
                                className="text-sm text-primary hover:underline"
                                onClick={() => {
                                  try {
                                    showNotification.info('Opening phone app...');
                                    showNotification.success('Phone app opened!');
                                  } catch (error) {
                                    showNotification.error('Failed to open phone app.');
                                  }
                                }}
                              >
                                {selectedMonasteryData.contactInfo.phone}
                              </a>
                            </div>
                          )}
                          {selectedMonasteryData.contactInfo.email && (
                            <div className="flex items-center space-x-3">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <a 
                                href={`mailto:${selectedMonasteryData.contactInfo.email}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {selectedMonasteryData.contactInfo.email}
                              </a>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Live Status */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span>Live Status</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Current Crowd</span>
                          <Badge variant="secondary" className={getCrowdColor(selectedMonasteryData.crowdLevel)}>
                            {selectedMonasteryData.crowdLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Weather</span>
                          <div className="flex items-center space-x-1">
                            <Sun className="w-4 h-4 text-yellow-500" />
                            <span>Perfect</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Status</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Open
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
});
