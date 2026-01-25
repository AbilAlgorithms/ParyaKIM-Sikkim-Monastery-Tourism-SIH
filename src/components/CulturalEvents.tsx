import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Settings, MapPin, ChevronLeft, ChevronRight, Navigation, Phone, ExternalLink, Clock } from 'lucide-react';
import { InteractiveMonasteryMap } from './InteractiveMonasteryMap';
import { culturalEventsData, CulturalEvent, getDirectionsUrl } from '../utils/monasteryData';
import { showNotification, notifications } from '../utils/notifications';

export const CulturalEvents = React.memo(() => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [showMap, setShowMap] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const culturalEvents = React.useMemo(() => culturalEventsData, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Card width (80 * 4px = 320px) + gap
      const newPosition = Math.max(scrollPosition - cardWidth, 0);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const newPosition = Math.min(scrollPosition + cardWidth, maxScroll);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const updateScrollPosition = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div 
      className="min-h-screen pb-8"
      style={{ 
        backgroundColor: '#F2E6D8',
        color: '#2C3E50'
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-5xl mb-6"
            style={{ 
              fontWeight: 700, 
              color: '#2C3E50'
            }}
          >
            Cultural Events
          </h1>
          
          {/* Subheader with filters and results */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              {/* Filter Button */}
              <Button
                className="rounded-full px-6 py-2 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{
                  backgroundColor: '#F5A623',
                  color: '#ffffff'
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
              {/* Map Button */}
              <Button
                onClick={() => setShowMap(!showMap)}
                className="rounded-full px-6 py-2 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{
                  backgroundColor: showMap ? '#F5A623' : '#2C3E50',
                  color: '#ffffff'
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {showMap ? 'Hide Map' : 'Map'}
              </Button>
            </div>
            
            {/* Results Count */}
            <div 
              className="text-lg"
              style={{ 
                fontWeight: 500,
                color: '#2C3E50'
              }}
            >
              <span style={{ color: '#F5A623', fontWeight: 700 }}>18862</span> Results found
            </div>
          </div>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <InteractiveMonasteryMap />
            </div>
          </div>
        )}

        {/* Featured Events Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-2xl"
              style={{ 
                fontWeight: 600, 
                color: '#2C3E50'
              }}
            >
              Featured Events
            </h2>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={scrollLeft}
                size="sm"
                className="rounded-full p-2 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{
                  backgroundColor: '#4A90E2',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px'
                }}
                disabled={scrollPosition <= 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={scrollRight}
                size="sm"
                className="rounded-full p-2 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{
                  backgroundColor: '#4A90E2',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px'
                }}
                disabled={scrollContainerRef.current && scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Horizontally Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            onScroll={updateScrollPosition}
          >
            <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
              {culturalEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                >
                  <div 
                    className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px'
                    }}
                  >
                    {/* Event Image */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Date Badge */}
                      <div 
                        className="absolute top-4 left-4 px-3 py-2 rounded-lg shadow-lg"
                        style={{
                          backgroundColor: '#2C3E50',
                          color: '#ffffff',
                          borderRadius: '12px',
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        {event.date}
                      </div>
                      
                      {/* Category Badge */}
                      <div 
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: '#F5A623',
                          color: '#ffffff',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {event.category}
                      </div>
                      
                      {/* Gradient Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    
                    {/* Event Info */}
                    <div className="p-6">
                      <h3 
                        className="text-xl mb-2 transition-colors duration-200"
                        style={{ 
                          fontWeight: 700, 
                          color: '#2C3E50',
                          lineHeight: '1.3'
                        }}
                      >
                        {event.title}
                      </h3>
                      
                      <p 
                        className="text-sm mb-3"
                        style={{ color: '#7F8C8D', lineHeight: '1.4' }}
                      >
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" style={{ color: '#4A90E2' }} />
                          <span className="text-sm" style={{ color: '#7F8C8D' }}>
                            {event.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin 
                            className="w-4 h-4" 
                            style={{ color: '#4A90E2' }} 
                          />
                          <span 
                            className="text-sm"
                            style={{ color: '#7F8C8D' }}
                          >
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span 
                            className="text-sm font-semibold"
                            style={{ color: '#2ECC71' }}
                          >
                            {event.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {event.contactInfo.phone && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full px-2 py-1"
                              onClick={() => {
                                try {
                                  showNotification.info(notifications.phone.calling);
                                  window.open(`tel:${event.contactInfo.phone}`, '_self');
                                  showNotification.success(notifications.phone.called);
                                } catch (error) {
                                  showNotification.error(notifications.phone.failed);
                                }
                              }}
                            >
                              <Phone className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="rounded-full px-3 py-2 border-0 text-xs"
                            style={{
                              backgroundColor: '#F5A623',
                              color: '#ffffff',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                            onClick={() => {
                              try {
                                showNotification.info(notifications.directions.opening);
                                const directionsUrl = getDirectionsUrl(event.coordinates);
                                window.open(directionsUrl, '_blank');
                                showNotification.success(notifications.directions.opened);
                              } catch (error) {
                                showNotification.error(notifications.directions.failed);
                              }
                            }}
                          >
                            <Navigation className="w-3 h-3 mr-1" />
                            Directions
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-full px-3 py-2 border-0 text-xs"
                            style={{
                              backgroundColor: '#2C3E50',
                              color: '#ffffff',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            Join Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events Grid */}
        <div>
          <h2 
            className="text-2xl mb-6"
            style={{ 
              fontWeight: 600, 
              color: '#2C3E50'
            }}
          >
            This Week
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalEvents.slice(0, 6).map((event) => (
              <div
                key={`grid-${event.id}`}
                className="group cursor-pointer"
              >
                <div 
                  className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded-lg text-sm"
                      style={{
                        backgroundColor: '#2C3E50',
                        color: '#ffffff',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {event.date}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 
                      className="mb-2 transition-colors duration-200"
                      style={{ 
                        fontWeight: 600, 
                        color: '#2C3E50',
                        fontSize: '16px',
                        lineHeight: '1.3'
                      }}
                    >
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: '#7F8C8D' }}>
                        {event.category}
                      </span>
                      <span 
                        style={{ 
                          color: '#2ECC71',
                          fontWeight: 600
                        }}
                      >
                        Free Entry
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="rounded-full px-8 py-3 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              backgroundColor: '#F5A623',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Load More Events
          </Button>
        </div>
      </div>
    </div>
  );
});

CulturalEvents.displayName = 'CulturalEvents';