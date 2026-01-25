import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, Mountain, Star, Eye } from 'lucide-react';
import { monasteryData, Monastery } from '../utils/monasteryData';
import { MonasteryDetail } from './MonasteryDetail';

export function TopMonasteriesSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle card active
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const monasteries: Monastery[] = monasteryData;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % monasteries.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, monasteries.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + monasteries.length) % monasteries.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, monasteries.length]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, activeIndex]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Get visible monasteries (5 cards total)
  const getVisibleMonasteries = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + monasteries.length) % monasteries.length;
      result.push({
        ...monasteries[index],
        position: i,
        originalIndex: index
      });
    }
    return result;
  };

  const visibleMonasteries = getVisibleMonasteries();

  // Calculate transform styles for horizontal layout
  const getCardStyles = (position: number) => {
    const isCenter = position === 0;
    const absPosition = Math.abs(position);
    
    let transform = '';
    let opacity = 1;
    let zIndex = 5 - absPosition;
    
    if (isCenter) {
      // Center card - largest and most prominent
      transform = 'translateX(0%) scale(1.05)';
      opacity = 1;
      zIndex = 10;
    } else if (absPosition === 1) {
      // Adjacent cards - slightly smaller
      const translateX = position > 0 ? '110%' : '-110%';
      transform = `translateX(${translateX}) scale(0.95)`;
      opacity = 0.9;
    } else {
      // Outer cards - smallest
      const translateX = position > 0 ? '220%' : '-220%';
      transform = `translateX(${translateX}) scale(0.85)`;
      opacity = 0.7;
    }

    return {
      transform,
      opacity,
      zIndex,
      transition: isTransitioning ? 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'all 0.3s ease-out'
    };
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Mountain className="w-4 h-4 mr-2" />
            Sacred Destinations
          </Badge>
          <h2 className="text-4xl md:text-6xl mb-6" style={{ fontWeight: 300, color: '#2d1810' }}>
            Top 10 <span style={{ fontWeight: 600, color: '#8b1538' }}>Monasteries</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover Sikkim's most sacred and breathtaking monasteries in an immersive 3D experience
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative px-8">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-md border-2 border-primary/20 rounded-full flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-md border-2 border-primary/20 rounded-full flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="relative h-[400px] md:h-[450px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {visibleMonasteries.map((monastery, index) => {
                const { position, originalIndex } = monastery;
                const isCenter = position === 0;
                const cardStyles = getCardStyles(position);

                return (
                  <div
                    key={`${monastery.id}-${originalIndex}`}
                    className="absolute cursor-pointer group"
                    style={{
                      ...cardStyles,
                      transformStyle: 'preserve-3d'
                    }}
                    onClick={() => !isCenter && goToSlide(originalIndex)}
                  >
                    {/* Card */}
                    <div 
                      className={`relative overflow-hidden rounded-2xl shadow-lg ${
                        isCenter ? 'w-80 h-[320px] md:w-96 md:h-[360px]' : 'w-72 h-[280px] md:w-80 md:h-[320px]'
                      }`}
                    >
                      {/* Background Image */}
                      <ImageWithFallback
                        src={monastery.image}
                        alt={monastery.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 ${
                        isCenter 
                          ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' 
                          : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                      }`} />
                      
                      {/* Ranking Badge */}
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-accent text-accent-foreground border-0 text-lg px-3 py-1 shadow-lg">
                          #{originalIndex + 1}
                        </Badge>
                      </div>

                      {/* Content - Only show on center card */}
                      {isCenter && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                          <div className="space-y-3">
                            {/* Monastery Name */}
                            <h3 className="text-2xl md:text-3xl text-white mb-2" style={{ fontWeight: 600 }}>
                              {monastery.name}
                            </h3>
                            
                            {/* Location */}
                            <p className="text-white/90 text-base mb-2">
                              {monastery.location}
                            </p>
                            
                            {/* Description */}
                            <p className="text-white/80 text-sm mb-4 max-w-sm mx-auto leading-relaxed">
                              {monastery.description} • Est. {monastery.established}
                            </p>
                            
                            {/* Explore Button */}
                            <Button
                              size="default"
                              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                              onClick={() => setSelectedMonastery(monastery)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              EXPLORE
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Side Card Label */}
                      {!isCenter && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <h4 className="text-white text-base px-4" style={{ fontWeight: 500 }}>
                            {monastery.name}
                          </h4>
                        </div>
                      )}

                      {/* Hover Effect for Non-Center Cards */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
                            Click to view
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {monasteries.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-primary scale-125'
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-12 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Discover All Sacred Sites
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Monastery Detail Modal */}
      {selectedMonastery && (
        <MonasteryDetail
          monastery={selectedMonastery}
          onClose={() => setSelectedMonastery(null)}
        />
      )}
    </section>
  );
}