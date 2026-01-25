import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Mountain, 
  Accessibility, 
  Navigation,
  Phone,
  Mail,
  Calendar,
  Heart,
  Camera,
  Eye,
  ArrowLeft,
  ExternalLink,
  History,
  BookOpen,
  Compass,
  Zap
} from 'lucide-react';
import { Monastery, getDirectionsUrl } from '../utils/monasteryData';
import { showNotification, notifications } from '../utils/notifications';

interface MonasteryDetailProps {
  monastery: Monastery;
  onClose: () => void;
}

export const MonasteryDetail: React.FC<MonasteryDetailProps> = ({ monastery, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'history' | 'culture' | 'visit'>('overview');

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'history', label: 'History', icon: History },
    { id: 'culture', label: 'Culture', icon: BookOpen },
    { id: 'visit', label: 'Visit Info', icon: Compass }
  ];

  const monasteryHistory = {
    rumtek: {
      founded: "1960s",
      founder: "16th Karmapa Rangjung Rigpe Dorje",
      significance: "Seat of the Karmapa lineage, one of the most important Tibetan Buddhist institutions",
      timeline: [
        { year: "1959", event: "16th Karmapa fled Tibet during Chinese occupation" },
        { year: "1960s", event: "Construction of Rumtek Monastery began" },
        { year: "1966", event: "Monastery officially opened and consecrated" },
        { year: "1981", event: "17th Karmapa enthroned at Rumtek" },
        { year: "1999", event: "17th Karmapa fled to India" },
        { year: "Present", event: "Remains a major pilgrimage site and spiritual center" }
      ]
    },
    enchey: {
      founded: "1840s",
      founder: "Lama Drupthob Karpo",
      significance: "One of the oldest monasteries in Sikkim, known for its peaceful atmosphere",
      timeline: [
        { year: "1840s", event: "Founded by Lama Drupthob Karpo" },
        { year: "1909", event: "Rebuilt after earthquake damage" },
        { year: "1975", event: "Sikkim became part of India" },
        { year: "Present", event: "Active monastery with regular prayer ceremonies" }
      ]
    },
    pemayangtse: {
      founded: "1705",
      founder: "Lhatsun Chenpo",
      significance: "One of the oldest monasteries in Sikkim, perfect sublime lotus",
      timeline: [
        { year: "1705", event: "Founded by Lhatsun Chenpo" },
        { year: "1840s", event: "Major renovations and expansions" },
        { year: "1975", event: "Survived Sikkim's transition to Indian state" },
        { year: "Present", event: "UNESCO World Heritage site candidate" }
      ]
    },
    tashiding: {
      founded: "1641",
      founder: "Ngadak Sempa Chembo",
      significance: "Most sacred monastery in Sikkim, built on heart-shaped hill",
      timeline: [
        { year: "1641", event: "Founded by Ngadak Sempa Chembo" },
        { year: "1700s", event: "Became major pilgrimage destination" },
        { year: "1975", event: "Preserved during Sikkim's transition" },
        { year: "Present", event: "Annual Bumchu festival draws thousands" }
      ]
    },
    phodong: {
      founded: "1740",
      founder: "Chogyal Gyurmed Namgyal",
      significance: "Rebuilt monastery with beautiful traditional murals",
      timeline: [
        { year: "1740", event: "Originally built by Chogyal Gyurmed Namgyal" },
        { year: "1960s", event: "Destroyed by earthquake" },
        { year: "1970s", event: "Rebuilt with traditional architecture" },
        { year: "Present", event: "Known for its beautiful murals and peaceful environment" }
      ]
    }
  };

  const monasteryCulture = {
    rumtek: {
      traditions: [
        "Daily prayer ceremonies (6 AM, 12 PM, 6 PM)",
        "Monlam Chenmo (Great Prayer Festival) in winter",
        "Kagyu Monlam (Kagyu Prayer Festival)",
        "Traditional Tibetan Buddhist rituals"
      ],
      festivals: [
        "Losar (Tibetan New Year) - February/March",
        "Saga Dawa - Buddha's birth, enlightenment, and parinirvana",
        "Monlam Chenmo - Great Prayer Festival",
        "Kagyu Monlam - Kagyu lineage prayers"
      ],
      practices: [
        "Meditation sessions",
        "Prayer wheel spinning",
        "Prostration practices",
        "Mantra recitation",
        "Butter lamp offerings"
      ],
      architecture: "Traditional Tibetan architecture with golden roofs, prayer wheels, and intricate murals"
    },
    enchey: {
      traditions: [
        "Morning prayers at sunrise",
        "Evening prayers at sunset",
        "Weekly meditation sessions",
        "Traditional Buddhist ceremonies"
      ],
      festivals: [
        "Losar celebrations",
        "Buddha Purnima",
        "Local Sikkimese festivals"
      ],
      practices: [
        "Prayer wheel rituals",
        "Meditation",
        "Community prayers",
        "Blessing ceremonies"
      ],
      architecture: "Traditional Sikkimese architecture with prayer flags and peaceful courtyards"
    },
    pemayangtse: {
      traditions: [
        "Ancient Buddhist rituals",
        "Traditional prayer ceremonies",
        "Meditation practices",
        "Sacred text readings"
      ],
      festivals: [
        "Losar celebrations",
        "Buddha Purnima",
        "Local Pelling festivals"
      ],
      practices: [
        "Traditional meditation",
        "Prayer ceremonies",
        "Sacred rituals",
        "Community gatherings"
      ],
      architecture: "Ancient Tibetan architecture with traditional murals and sacred artifacts"
    },
    tashiding: {
      traditions: [
        "Sacred water rituals",
        "Bumchu festival ceremonies",
        "Traditional Buddhist prayers",
        "Pilgrimage practices"
      ],
      festivals: [
        "Bumchu Festival - Most important annual festival",
        "Losar celebrations",
        "Sacred water ceremonies"
      ],
      practices: [
        "Sacred water blessings",
        "Pilgrimage walks",
        "Traditional prayers",
        "Meditation in sacred spaces"
      ],
      architecture: "Sacred architecture on heart-shaped hill with holy water spring"
    },
    phodong: {
      traditions: [
        "Traditional prayer ceremonies",
        "Meditation sessions",
        "Community prayers",
        "Blessing rituals"
      ],
      festivals: [
        "Losar celebrations",
        "Local North Sikkim festivals",
        "Buddhist ceremonies"
      ],
      practices: [
        "Traditional meditation",
        "Prayer ceremonies",
        "Community gatherings",
        "Blessing practices"
      ],
      architecture: "Rebuilt traditional architecture with beautiful murals and peaceful courtyards"
    }
  };

  const history = monasteryHistory[monastery.id as keyof typeof monasteryHistory];
  const culture = monasteryCulture[monastery.id as keyof typeof monasteryCulture];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex-shrink-0">
          <ImageWithFallback
            src={monastery.image}
            alt={monastery.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Close Button */}
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {/* Title */}
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{monastery.name}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{monastery.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{monastery.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b flex-shrink-0">
          <div className="flex space-x-1 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0" style={{ scrollBehavior: 'smooth' }}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">{monastery.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{monastery.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <Badge className={getDifficultyColor(monastery.difficulty)}>
                      {monastery.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Crowd Level</span>
                    <Badge className={getCrowdColor(monastery.crowdLevel)}>
                      {monastery.crowdLevel}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium">{monastery.distanceFromGangtok}km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Altitude</span>
                    <span className="font-medium">{monastery.altitude}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Best Time</span>
                    <span className="font-medium">{monastery.bestTime}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                <div className="grid grid-cols-2 gap-2">
                  {monastery.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Available Experiences</h3>
                <div className="flex flex-wrap gap-2">
                  {monastery.experiences.map((experience, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      {experience.includes('AR') && <Camera className="w-3 h-3" />}
                      {experience.includes('Meditation') && <Heart className="w-3 h-3" />}
                      {experience.includes('Virtual') && <Eye className="w-3 h-3" />}
                      <span>{experience}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && history && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Foundation</h3>
                <p className="text-gray-700">
                  Founded in <strong>{history.founded}</strong> by <strong>{history.founder}</strong>
                </p>
                <p className="text-gray-600 mt-2">{history.significance}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Historical Timeline</h3>
                <div className="space-y-4">
                  {history.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                        {event.year}
                      </div>
                      <div className="flex-1">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div className="ml-4 -mt-2 pb-4 border-l-2 border-gray-200 pl-4">
                          <p className="text-gray-700">{event.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'culture' && culture && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Traditions & Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culture.traditions.map((tradition, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{tradition}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Festivals</h3>
                <div className="space-y-2">
                  {culture.festivals.map((festival, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-gray-700">{festival}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Spiritual Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {culture.practices.map((practice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-primary" />
                      <span className="text-gray-700">{practice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Architecture</h3>
                <p className="text-gray-700">{culture.architecture}</p>
              </div>
            </div>
          )}

          {activeTab === 'visit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Essential Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Opening Hours</span>
                      <span className="font-medium">{monastery.openingHours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Entry Fee</span>
                      <span className="font-medium">{monastery.entryFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Accessibility</span>
                      <Badge className={monastery.accessibility ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}>
                        {monastery.accessibility ? "Accessible" : "Not Accessible"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Facilities</h3>
                  <div className="space-y-2">
                    {monastery.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {monastery.contactInfo.phone && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    {monastery.contactInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <a 
                          href={`tel:${monastery.contactInfo.phone}`}
                          className="text-primary hover:underline"
                        >
                          {monastery.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {monastery.contactInfo.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <a 
                          href={`mailto:${monastery.contactInfo.email}`}
                          className="text-primary hover:underline"
                        >
                          {monastery.contactInfo.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    try {
                      showNotification.info(notifications.directions.opening);
                      const directionsUrl = getDirectionsUrl(monastery.coordinates);
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
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  AR Experience
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
