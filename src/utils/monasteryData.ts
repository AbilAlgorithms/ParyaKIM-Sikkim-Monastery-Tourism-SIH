// Real monastery data with coordinates for Sikkim
export interface Monastery {
  id: string;
  name: string;
  location: string;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  duration: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
  accessibility: boolean;
  spiritualLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  highlights: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  rating: number;
  distanceFromGangtok: number;
  altitude: number;
  bestTime: string;
  facilities: string[];
  experiences: string[];
  openingHours: string;
  entryFee: string;
  contactInfo: {
    phone?: string;
    email?: string;
  };
}

export const monasteryData: Monastery[] = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    location: 'Rumtek, Gangtok',
    description: 'The largest monastery in Sikkim, seat of the Karmapa. A magnificent example of Tibetan Buddhist architecture.',
    difficulty: 'Easy',
    duration: '2-3 hours',
    crowdLevel: 'Medium',
    accessibility: true,
    spiritualLevel: 'Beginner',
    highlights: ['Golden Stupa', 'Ancient Manuscripts', 'Meditation Hall', 'Prayer Wheels'],
    coordinates: { lat: 27.3019, lng: 88.6107 },
    image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    distanceFromGangtok: 24,
    altitude: 1550,
    bestTime: 'Morning (6-10 AM)',
    facilities: ['Parking', 'Restrooms', 'Gift Shop', 'Cafeteria', 'Guided Tours'],
    experiences: ['AR Tour', '3D Virtual Reality', 'Guided Meditation', 'Prayer Ceremony'],
    openingHours: '6:00 AM - 6:00 PM',
    entryFee: 'Free',
    contactInfo: {
      phone: '+91-3592-202-000'
    }
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    location: 'Gangtok',
    description: '200-year-old monastery with stunning city views and traditional architecture.',
    difficulty: 'Easy',
    duration: '1-2 hours',
    crowdLevel: 'Low',
    accessibility: true,
    spiritualLevel: 'Beginner',
    highlights: ['City Views', 'Prayer Wheels', 'Local Culture', 'Traditional Architecture'],
    coordinates: { lat: 27.3314, lng: 88.6138 },
    image: 'https://images.unsplash.com/photo-1724650117579-fcf227cd872e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBoaW1hbGF5YW4lMjBidWRkaGlzdHxlbnwxfHx8fDE3NTc0NDUwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    distanceFromGangtok: 2,
    altitude: 2000,
    bestTime: 'Evening (4-6 PM)',
    facilities: ['Parking', 'Restrooms', 'Gift Shop'],
    experiences: ['City View Photography', 'Prayer Wheel Ritual', 'Cultural Tour'],
    openingHours: '5:00 AM - 7:00 PM',
    entryFee: 'Free',
    contactInfo: {
      phone: '+91-3592-202-001'
    }
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    location: 'Pelling',
    description: 'One of the oldest monasteries in Sikkim with magnificent views of Kanchenjunga.',
    difficulty: 'Moderate',
    duration: '3-4 hours',
    crowdLevel: 'Low',
    accessibility: false,
    spiritualLevel: 'Intermediate',
    highlights: ['Kanchenjunga Views', 'Ancient Artifacts', 'Sacred Texts', 'Mountain Views'],
    coordinates: { lat: 27.3019, lng: 88.2500 },
    image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    distanceFromGangtok: 120,
    altitude: 2085,
    bestTime: 'Early Morning (5-8 AM)',
    facilities: ['Parking', 'Restrooms', 'Gift Shop'],
    experiences: ['Sunrise Photography', 'Mountain Meditation', 'Cultural Heritage Tour'],
    openingHours: '5:00 AM - 6:00 PM',
    entryFee: '₹50',
    contactInfo: {
      phone: '+91-3595-258-000'
    }
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    location: 'Tashiding',
    description: 'Sacred monastery known for its spiritual significance and beautiful location.',
    difficulty: 'Challenging',
    duration: '4-5 hours',
    crowdLevel: 'Low',
    accessibility: false,
    spiritualLevel: 'Advanced',
    highlights: ['Sacred Relics', 'Spiritual Significance', 'Remote Location', 'Peaceful Environment'],
    coordinates: { lat: 27.3167, lng: 88.2833 },
    image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    distanceFromGangtok: 140,
    altitude: 1500,
    bestTime: 'Morning (6-10 AM)',
    facilities: ['Basic Restrooms'],
    experiences: ['Spiritual Retreat', 'Meditation Session', 'Sacred Rituals'],
    openingHours: '6:00 AM - 5:00 PM',
    entryFee: 'Free',
    contactInfo: {}
  },
  {
    id: 'phodong',
    name: 'Phodong Monastery',
    location: 'Phodong',
    description: 'Beautiful monastery with traditional architecture and peaceful surroundings.',
    difficulty: 'Easy',
    duration: '2-3 hours',
    crowdLevel: 'Low',
    accessibility: true,
    spiritualLevel: 'Beginner',
    highlights: ['Traditional Architecture', 'Peaceful Environment', 'Local Culture', 'Prayer Hall'],
    coordinates: { lat: 27.4167, lng: 88.6167 },
    image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    distanceFromGangtok: 38,
    altitude: 1650,
    bestTime: 'Morning (7-11 AM)',
    facilities: ['Parking', 'Restrooms'],
    experiences: ['Cultural Tour', 'Prayer Session', 'Photography'],
    openingHours: '6:00 AM - 6:00 PM',
    entryFee: 'Free',
    contactInfo: {
      phone: '+91-3592-202-002'
    }
  },
  {
    id: 'dubdi',
    name: 'Dubdi Monastery',
    location: 'Yuksom',
    description: 'The oldest monastery in Sikkim, built in 1701. A sacred site with profound spiritual significance.',
    difficulty: 'Moderate',
    duration: '3-4 hours',
    crowdLevel: 'Low',
    accessibility: false,
    spiritualLevel: 'Intermediate',
    highlights: ['Oldest Monastery', 'Historic Significance', 'Mountain Views', 'Sacred Artifacts'],
    coordinates: { lat: 27.3739, lng: 88.2142 },
    image: 'https://images.unsplash.com/photo-1676958593029-4ccb08d9d133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHByYXllciUyMGZsYWdzJTIwbW91bnRhaW58ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    distanceFromGangtok: 125,
    altitude: 2100,
    bestTime: 'Early Morning (6-9 AM)',
    facilities: ['Basic Restrooms', 'Trekking Guide'],
    experiences: ['Historical Tour', 'Mountain Trekking', 'Spiritual Journey', 'Photography'],
    openingHours: '6:00 AM - 5:00 PM',
    entryFee: 'Free',
    contactInfo: {
      phone: '+91-3595-241-000'
    }
  },
  {
    id: 'sangachoeling',
    name: 'Sangachoeling Monastery',
    location: 'Pelling',
    description: 'Second oldest monastery in Sikkim with breathtaking views of Kanchenjunga range.',
    difficulty: 'Challenging',
    duration: '4-5 hours',
    crowdLevel: 'Low',
    accessibility: false,
    spiritualLevel: 'Advanced',
    highlights: ['Kanchenjunga Views', 'Ancient Ruins', 'Meditation Caves', 'Sunrise Views'],
    coordinates: { lat: 27.2986, lng: 88.2519 },
    image: 'https://images.unsplash.com/photo-1562960364-f47d48567cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU3NTA4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    distanceFromGangtok: 115,
    altitude: 2130,
    bestTime: 'Dawn (5-7 AM)',
    facilities: ['Basic Facilities', 'Mountain Guide'],
    experiences: ['Sunrise Photography', 'Advanced Meditation', 'Mountain Adventure', 'Historical Research'],
    openingHours: '5:30 AM - 5:30 PM',
    entryFee: 'Free',
    contactInfo: {
      phone: '+91-3595-258-001'
    }
  },
  {
    id: 'tsuklakhang',
    name: 'Tsuklakhang Monastery',
    location: 'Gangtok (Palace Complex)',
    description: 'Royal monastery within the Tsuklakhang Palace complex, center of royal ceremonies.',
    difficulty: 'Easy',
    duration: '1-2 hours',
    crowdLevel: 'Medium',
    accessibility: true,
    spiritualLevel: 'Beginner',
    highlights: ['Royal Heritage', 'Palace Architecture', 'Cultural Ceremonies', 'City Center Location'],
    coordinates: { lat: 27.3389, lng: 88.6065 },
    image: 'https://images.unsplash.com/photo-1624725412168-a8e69d4f7b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBsYW5kc2NhcGUlMjBzaWtraW18ZW58MXx8fHwxNzU3NTA4NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.4,
    distanceFromGangtok: 1,
    altitude: 1650,
    bestTime: 'Morning (8-11 AM)',
    facilities: ['Parking', 'Restrooms', 'Gift Shop', 'Museum', 'Cafeteria'],
    experiences: ['Royal Heritage Tour', 'Cultural Ceremony', 'Palace Museum', 'Traditional Architecture Tour'],
    openingHours: '9:00 AM - 5:00 PM',
    entryFee: '₹30',
    contactInfo: {
      phone: '+91-3592-202-003',
      email: 'info@sikkimpalace.gov.in'
    }
  },
  {
    id: 'karma',
    name: 'Karma Kagyu Monastery',
    location: 'Rumtek Complex',
    description: 'Sacred seat of the Karma Kagyu lineage with authentic Tibetan Buddhist teachings.',
    difficulty: 'Easy',
    duration: '2-3 hours',
    crowdLevel: 'Medium',
    accessibility: true,
    spiritualLevel: 'Intermediate',
    highlights: ['Karma Kagyu Lineage', 'Buddhist Teachings', 'Meditation Sessions', 'Spiritual Guidance'],
    coordinates: { lat: 27.3025, lng: 88.6115 },
    image: 'https://images.unsplash.com/photo-1545295589-31aa01261ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25hc3RlcnklMjBpbnRlcmlvciUyMHRpYmV0JTIwYnVkZGhpc3R8ZW58MXx8fHwxNzU3NTA4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    distanceFromGangtok: 25,
    altitude: 1560,
    bestTime: 'Morning (6-10 AM)',
    facilities: ['Parking', 'Restrooms', 'Guest House', 'Library', 'Meditation Hall'],
    experiences: ['AR Buddhist History', 'Meditation Retreat', 'Teaching Sessions', 'Spiritual Counseling'],
    openingHours: '5:30 AM - 6:30 PM',
    entryFee: 'Free',
    contactInfo: {
      phone: '+91-3592-202-005',
      email: 'info@karmakagyu.org'
    }
  },
  {
    id: 'ralang',
    name: 'Ralang Monastery',
    location: 'Ralang',
    description: 'Famous for its annual Cham dance performances and beautiful traditional architecture.',
    difficulty: 'Moderate',
    duration: '2-3 hours',
    crowdLevel: 'Low',
    accessibility: false,
    spiritualLevel: 'Intermediate',
    highlights: ['Cham Dance Festival', 'Traditional Crafts', 'Scenic Location', 'Cultural Performances'],
    coordinates: { lat: 27.2667, lng: 88.5833 },
    image: 'https://images.unsplash.com/photo-1740630267005-db9af10c0164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGRhbmNlJTIwZmVzdGl2YWwlMjBjdWx0dXJhbCUyMGV2ZW50fGVufDF8fHx8MTc1NzUxODkzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    distanceFromGangtok: 65,
    altitude: 1200,
    bestTime: 'Festival Season (December)',
    facilities: ['Parking', 'Basic Restrooms', 'Festival Grounds'],
    experiences: ['Cham Dance Performance', 'Cultural Festival', 'Traditional Craft Workshop', 'Local Cuisine'],
    openingHours: '6:00 AM - 6:00 PM',
    entryFee: 'Free (Festival ₹100)',
    contactInfo: {
      phone: '+91-3592-202-006'
    }
  }
];

// Cultural Events Data
export interface CulturalEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  category: string;
  description: string;
  price: string;
  contactInfo: {
    phone?: string;
    email?: string;
  };
}

export const culturalEventsData: CulturalEvent[] = [
  {
    id: 1,
    title: 'Lepcha Dance Festival',
    date: '10 Sep',
    time: '6:00 PM - 9:00 PM',
    location: 'Gangtok Cultural Center',
    coordinates: { lat: 27.3314, lng: 88.6138 },
    image: 'https://images.unsplash.com/photo-1740630267005-db9af10c0164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGRhbmNlJTIwZmVzdGl2YWwlMjBjdWx0dXJhbCUyMGV2ZW50fGVufDF8fHx8MTc1NzUxODkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dance',
    description: 'Traditional Lepcha dance performances showcasing the rich cultural heritage of Sikkim.',
    price: 'Free',
    contactInfo: {
      phone: '+91-3592-202-100'
    }
  },
  {
    id: 2,
    title: 'Mask Painting Workshop',
    date: '12 Sep',
    time: '10:00 AM - 2:00 PM',
    location: 'Namgyal Institute of Tibetology',
    coordinates: { lat: 27.3314, lng: 88.6138 },
    image: 'https://images.unsplash.com/photo-1711977437514-112e90c7598c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNrJTIwcGFpbnRpbmclMjB3b3Jrc2hvcCUyMGFydHxlbnwxfHx8fDE3NTc1MTg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Workshop',
    description: 'Learn traditional mask painting techniques from local artisans.',
    price: '₹500',
    contactInfo: {
      phone: '+91-3592-202-101'
    }
  },
  {
    id: 3,
    title: 'Himalayan Heritage Festival',
    date: '15 Sep',
    time: '9:00 AM - 6:00 PM',
    location: 'MG Marg, Gangtok',
    coordinates: { lat: 27.3314, lng: 88.6138 },
    image: 'https://images.unsplash.com/photo-1662663489488-1b9541a04136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBoZXJpdGFnZSUyMGZlc3RpdmFsfGVufDF8fHx8MTc1NzUxODk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Festival',
    description: 'Celebrate the rich heritage of the Himalayas with music, dance, and traditional crafts.',
    price: 'Free',
    contactInfo: {
      phone: '+91-3592-202-102'
    }
  },
  {
    id: 4,
    title: 'Monastery Prayer Ceremony',
    date: '18 Sep',
    time: '5:00 AM - 7:00 AM',
    location: 'Rumtek Monastery',
    coordinates: { lat: 27.3019, lng: 88.6107 },
    image: 'https://images.unsplash.com/photo-1714359057267-f86f68e5136d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMG1vbmFzdGVyeSUyMGNlcmVtb255fGVufDF8fHx8MTc1NzUxODk0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Ceremony',
    description: 'Participate in traditional Buddhist prayer ceremonies at the sacred Rumtek Monastery.',
    price: 'Free',
    contactInfo: {
      phone: '+91-3592-202-000'
    }
  },
  {
    id: 5,
    title: 'Traditional Craft Workshop',
    date: '20 Sep',
    time: '11:00 AM - 3:00 PM',
    location: 'Handicrafts Development Center',
    coordinates: { lat: 27.3314, lng: 88.6138 },
    image: 'https://images.unsplash.com/photo-1575839127405-ab6f4e312671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNyYWZ0JTIwd29ya3Nob3B8ZW58MXx8fHwxNzU3NTE4OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Workshop',
    description: 'Learn traditional Sikkimese crafts including weaving, pottery, and wood carving.',
    price: '₹800',
    contactInfo: {
      phone: '+91-3592-202-103'
    }
  },
  {
    id: 6,
    title: 'Cultural Music Evening',
    date: '22 Sep',
    time: '7:00 PM - 10:00 PM',
    location: 'Gangtok Auditorium',
    coordinates: { lat: 27.3314, lng: 88.6138 },
    image: 'https://images.unsplash.com/photo-1561882192-c606a6e15e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMG11c2ljJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU3NTE4OTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Music',
    description: 'Enjoy traditional Sikkimese music performances by local artists.',
    price: '₹200',
    contactInfo: {
      phone: '+91-3592-202-104'
    }
  }
];

// API Functions
export const getMonasteries = async (): Promise<Monastery[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(monasteryData), 500);
  });
};

export const getMonasteryById = async (id: string): Promise<Monastery | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const monastery = monasteryData.find(m => m.id === id);
      resolve(monastery || null);
    }, 300);
  });
};

export const getCulturalEvents = async (): Promise<CulturalEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(culturalEventsData), 400);
  });
};

export const getDirectionsUrl = (destination: { lat: number; lng: number }, origin?: { lat: number; lng: number }): string => {
  const defaultOrigin = { lat: 27.3314, lng: 88.6138 }; // Gangtok coordinates
  const start = origin || defaultOrigin;
  
  return `https://www.google.com/maps/dir/${start.lat},${start.lng}/${destination.lat},${destination.lng}`;
};

export const getNearbyMonasteries = async (userLocation: { lat: number; lng: number }, radiusKm: number = 50): Promise<Monastery[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nearby = monasteryData.filter(monastery => {
        const distance = calculateDistance(userLocation, monastery.coordinates);
        return distance <= radiusKm;
      });
      resolve(nearby);
    }, 200);
  });
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
