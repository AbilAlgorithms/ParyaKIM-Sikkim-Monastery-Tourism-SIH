// Fallback data for when backend is unavailable
// This ensures the app works even when the server is down

export const fallbackMonasteries = [
  {
    id: "rumtek-monastery",
    name: "Rumtek Monastery",
    description: "The largest monastery in Sikkim and seat of the Karmapa. Known for its stunning architecture and peaceful atmosphere.",
    location: "Gangtok",
    coordinates: { lat: 27.2792, lng: 88.5575 },
    images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800"],
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: 0,
    specialFeatures: ["meditation", "architecture", "religious ceremonies"],
    difficulty: "easy",
    rating: 4.5,
    reviews: [
      {
        id: "review-1",
        rating: 5,
        comment: "Absolutely peaceful and beautiful. A must-visit place for spiritual seekers.",
        author: "Traveler",
        date: "2024-01-15"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "pemayangtse-monastery",
    name: "Pemayangtse Monastery",
    description: "One of the oldest monasteries in Sikkim, offering breathtaking mountain views and rich cultural heritage.",
    location: "Pelling",
    coordinates: { lat: 27.2130, lng: 88.2090 },
    images: ["https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800"],
    visitingHours: "7:00 AM - 5:00 PM",
    entryFee: 10,
    specialFeatures: ["history", "mountain views", "traditional art"],
    difficulty: "moderate",
    rating: 4.3,
    reviews: [
      {
        id: "review-2", 
        rating: 4,
        comment: "Amazing views of Kanchenjunga! The monastery has incredible historical artifacts.",
        author: "Mountain Lover",
        date: "2024-01-10"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enchey-monastery",
    name: "Enchey Monastery",
    description: "A beautiful monastery overlooking Gangtok, known for its serene environment and religious significance.",
    location: "Gangtok",
    coordinates: { lat: 27.3314, lng: 88.6138 },
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
    visitingHours: "6:00 AM - 7:00 PM",
    entryFee: 0,
    specialFeatures: ["city views", "meditation", "religious festivals"],
    difficulty: "easy",
    rating: 4.2,
    reviews: [],
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const fallbackEvents = [
  {
    id: "losar-festival",
    title: "Losar Festival Celebration",
    description: "Tibetan New Year celebration with traditional dances, prayers, and cultural performances. Experience the rich heritage of Sikkim's Buddhist community.",
    startDate: "2024-03-10T09:00:00Z",
    endDate: "2024-03-12T18:00:00Z", 
    location: "Rumtek Monastery",
    category: "religious",
    organizer: "Rumtek Monastery Committee",
    ticketPrice: 0,
    maxAttendees: 500,
    currentAttendees: 0,
    status: 'upcoming',
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "saga-dawa",
    title: "Saga Dawa Festival",
    description: "Sacred Buddhist festival commemorating the birth, enlightenment, and death of Buddha. Join thousands in prayer and celebration.",
    startDate: "2024-05-15T06:00:00Z",
    endDate: "2024-05-15T20:00:00Z",
    location: "Various Monasteries",
    category: "religious",
    organizer: "Sikkim Buddhist Association",
    ticketPrice: 0,
    maxAttendees: 1000,
    currentAttendees: 0,
    status: 'upcoming',
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const fallbackCommunityPosts = [
  {
    id: "post-1",
    type: "image",
    title: "Sunrise at Rumtek",
    description: "Captured this beautiful sunrise during my morning meditation at Rumtek Monastery. The peace here is indescribable.",
    fileUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    author: "SpiritualSeeker",
    location: "Rumtek Monastery",
    tags: ["sunrise", "meditation", "rumtek"],
    likes: 23,
    comments: [
      {
        id: "comment-1",
        text: "Absolutely breathtaking! Thanks for sharing this moment.",
        author: "TravelLover",
        createdAt: "2024-01-15T10:30:00Z"
      }
    ],
    createdAt: "2024-01-15T06:30:00Z"
  },
  {
    id: "post-2", 
    type: "video",
    title: "Morning Prayer Chants",
    description: "The monks' morning prayers create such a peaceful atmosphere. Audio recorded with permission.",
    fileUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    author: "CulturalExplorer",
    location: "Pemayangtse Monastery",
    tags: ["prayer", "chanting", "culture"],
    likes: 41,
    comments: [
      {
        id: "comment-2",
        text: "This brought tears to my eyes. So beautiful.",
        author: "PeaceSeeker",
        createdAt: "2024-01-14T15:20:00Z"
      }
    ],
    createdAt: "2024-01-14T08:15:00Z"
  }
];

export const fallbackCulturalStories = [
  {
    id: "yeti-legend",
    title: "The Legend of the Yeti",
    content: "In the highest peaks of Sikkim, where the snow never melts and the wind carries ancient whispers, the elders speak of the Yeti - the guardian of the mountains. This mysterious being, neither human nor animal, is said to protect the sacred peaks from those who would harm them...",
    author: "Elder Tenzin",
    category: "folklore",
    language: "en",
    culturalSignificance: "This legend represents the deep respect Sikkimese people have for their mountain environment and serves as a reminder to treat nature with reverence.",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "prayer-flags",
    title: "The Story of Prayer Flags",
    content: "Long ago, when the first Buddhist teachers came to Sikkim, they brought with them colorful flags inscribed with prayers and mantras. These flags, when hung in the wind, would carry prayers and good wishes across the mountains to all beings...",
    author: "Grandmother Dolma",
    category: "religious",
    language: "en", 
    culturalSignificance: "Prayer flags are integral to Sikkimese Buddhist culture, representing the belief that wind carries prayers to benefit all sentient beings.",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const fallbackRecipes = [
  {
    id: "momos",
    name: "Traditional Sikkim Momos",
    description: "Steamed dumplings filled with vegetables or meat, a beloved dish throughout Sikkim and the Himalayas.",
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup warm water",
      "1 tsp salt",
      "2 cups mixed vegetables (cabbage, carrot, onion)",
      "2 cloves garlic, minced",
      "1 inch ginger, minced",
      "2 tbsp soy sauce",
      "1 tsp sesame oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix flour, water, and salt to make a smooth dough. Rest for 30 minutes.",
      "Prepare filling by sautéing vegetables with garlic, ginger, soy sauce, and sesame oil.",
      "Roll dough into small circles and place filling in center.",
      "Fold and seal to form dumplings.",
      "Steam for 15-20 minutes until cooked through."
    ],
    prepTime: 45,
    cookTime: 20,
    servings: 4,
    difficulty: "medium",
    occasion: "everyday",
    culturalContext: "Momos are a staple food in Sikkim, originally from Tibet but adapted with local ingredients and flavors.",
    region: "Sikkim",
    status: "approved",
    author: "Chef Pemba",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const fallbackEmergencyContacts = [
  {
    id: "sikkim-police",
    name: "Sikkim Police",
    type: "police",
    phone: "100",
    location: "Gangtok",
    address: "Police Headquarters, Gangtok, Sikkim",
    coordinates: { lat: 27.3389, lng: 88.6065 },
    availableHours: "24/7",
    languages: ["English", "Hindi", "Nepali"],
    services: ["Emergency Response", "Tourist Assistance", "Traffic Control"],
    verified: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "stnm-hospital",
    name: "STNM Hospital",
    type: "hospital", 
    phone: "03592-202116",
    location: "Gangtok",
    address: "Sochyakgang, Gangtok, Sikkim 737101",
    coordinates: { lat: 27.3315, lng: 88.6138 },
    availableHours: "24/7",
    languages: ["English", "Hindi", "Nepali"],
    services: ["Emergency Care", "General Medicine", "Surgery"],
    verified: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "tourist-helpline",
    name: "Sikkim Tourism Helpline",
    type: "tourist_helpline",
    phone: "03592-202425",
    location: "Gangtok",
    address: "Tourism Department, Gangtok",
    coordinates: { lat: 27.3389, lng: 88.6065 },
    availableHours: "9:00 AM - 6:00 PM",
    languages: ["English", "Hindi", "Nepali"],
    services: ["Tourist Information", "Assistance", "Complaints"],
    verified: true,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const fallbackStats = {
  monasteries: {
    total: 3,
    avgRating: 4.3
  },
  events: {
    total: 2,
    upcoming: 2
  },
  community: {
    posts: 2,
    totalLikes: 64
  },
  cultural: {
    stories: 2,
    recipes: 1
  },
  lastUpdated: new Date().toISOString()
};

// Function to check if we should use fallback data
export function shouldUseFallbackData(): boolean {
  // You can add logic here to determine when to use fallback data
  // For now, we'll use it as a backup when API calls fail
  return false;
}

// Export a complete fallback dataset
export const fallbackData = {
  monasteries: fallbackMonasteries,
  events: fallbackEvents,
  communityPosts: fallbackCommunityPosts,
  culturalStories: fallbackCulturalStories,
  culturalRecipes: fallbackRecipes,
  emergencyContacts: fallbackEmergencyContacts,
  stats: fallbackStats
};