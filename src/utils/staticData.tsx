// Static data for the Sikkim Tourism app
// This replaces the backend API with local data

export const monasteries = [
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
  },
  {
    id: "tashiding-monastery",
    name: "Tashiding Monastery",
    description: "Sacred monastery located on a hilltop, considered one of the holiest places in Sikkim.",
    location: "West Sikkim",
    coordinates: { lat: 27.2500, lng: 88.2500 },
    images: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=800"],
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: 0,
    specialFeatures: ["sacred site", "pilgrimage", "mountain views"],
    difficulty: "moderate",
    rating: 4.6,
    reviews: [
      {
        id: "review-3",
        rating: 5,
        comment: "The most sacred place I've ever visited. The energy here is incredible.",
        author: "Pilgrim",
        date: "2024-01-12"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "dubdi-monastery",
    name: "Dubdi Monastery",
    description: "The oldest monastery in Sikkim, also known as Yuksom Monastery, surrounded by ancient forests.",
    location: "Yuksom",
    coordinates: { lat: 27.3700, lng: 88.2100 },
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"],
    visitingHours: "7:00 AM - 5:00 PM",
    entryFee: 5,
    specialFeatures: ["history", "forest setting", "ancient artifacts"],
    difficulty: "challenging",
    rating: 4.4,
    reviews: [],
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const events = [
  {
    id: "losar-festival",
    title: "Losar Festival Celebration",
    description: "Tibetan New Year celebration with traditional dances, prayers, and cultural performances. Experience the rich heritage of Sikkim's Buddhist community.",
    startDate: "2025-03-10T09:00:00Z",
    endDate: "2025-03-12T18:00:00Z", 
    location: "Rumtek Monastery",
    category: "religious",
    organizer: "Rumtek Monastery Committee",
    ticketPrice: 0,
    maxAttendees: 500,
    currentAttendees: 234,
    status: 'upcoming',
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "saga-dawa",
    title: "Saga Dawa Festival",
    description: "Sacred Buddhist festival commemorating the birth, enlightenment, and death of Buddha. Join thousands in prayer and celebration.",
    startDate: "2025-05-15T06:00:00Z",
    endDate: "2025-05-15T20:00:00Z",
    location: "Various Monasteries",
    category: "religious",
    organizer: "Sikkim Buddhist Association",
    ticketPrice: 0,
    maxAttendees: 1000,
    currentAttendees: 567,
    status: 'upcoming',
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "bumchu-festival",
    title: "Bumchu Festival",
    description: "Sacred water ceremony at Tashiding Monastery, one of the most important festivals in Sikkim.",
    startDate: "2025-02-28T08:00:00Z",
    endDate: "2025-02-28T17:00:00Z",
    location: "Tashiding Monastery",
    category: "religious",
    organizer: "Tashiding Monastery",
    ticketPrice: 0,
    maxAttendees: 300,
    currentAttendees: 198,
    status: 'upcoming',
    images: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=800"],
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const communityPosts = [
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
      },
      {
        id: "comment-2",
        text: "I was there last month! Such a peaceful place.",
        author: "MountainExplorer",
        createdAt: "2024-01-15T11:15:00Z"
      }
    ],
    createdAt: "2024-01-15T06:30:00Z"
  },
  {
    id: "post-2", 
    type: "image",
    title: "Prayer Flags at Tashiding",
    description: "The colorful prayer flags create such a beautiful contrast against the mountain backdrop.",
    fileUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    author: "CulturalExplorer",
    location: "Tashiding Monastery",
    tags: ["prayer flags", "culture", "tashiding"],
    likes: 41,
    comments: [
      {
        id: "comment-3",
        text: "The symbolism behind these flags is so beautiful.",
        author: "PeaceSeeker",
        createdAt: "2024-01-14T15:20:00Z"
      }
    ],
    createdAt: "2024-01-14T08:15:00Z"
  },
  {
    id: "post-3",
    type: "image",
    title: "Ancient Artifacts at Pemayangtse",
    description: "Discovered these incredible ancient sculptures and paintings that tell stories of centuries past.",
    fileUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800",
    author: "HistoryBuff",
    location: "Pemayangtse Monastery",
    tags: ["history", "artifacts", "pemayangtse"],
    likes: 35,
    comments: [
      {
        id: "comment-4",
        text: "The craftsmanship is incredible. How old are these?",
        author: "ArtLover",
        createdAt: "2024-01-13T12:45:00Z"
      }
    ],
    createdAt: "2024-01-13T14:20:00Z"
  }
];

export const culturalStories = [
  {
    id: "yeti-legend",
    title: "The Legend of the Yeti",
    content: "In the highest peaks of Sikkim, where the snow never melts and the wind carries ancient whispers, the elders speak of the Yeti - the guardian of the mountains. This mysterious being, neither human nor animal, is said to protect the sacred peaks from those who would harm them. Local sherpa communities have passed down stories for generations, describing encounters with this elusive creature who appears only to those pure of heart and respectful of nature.",
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
    content: "Long ago, when the first Buddhist teachers came to Sikkim, they brought with them colorful flags inscribed with prayers and mantras. These flags, when hung in the wind, would carry prayers and good wishes across the mountains to all beings. The five colors represent the five elements: blue for sky, white for air, red for fire, green for water, and yellow for earth. As the flags fade and tatter in the mountain winds, it is believed that the prayers are released and spread throughout the world.",
    author: "Grandmother Dolma",
    category: "religious",
    language: "en", 
    culturalSignificance: "Prayer flags are integral to Sikkimese Buddhist culture, representing the belief that wind carries prayers to benefit all sentient beings.",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "monastery-bells",
    title: "The Sacred Monastery Bells",
    content: "Every monastery in Sikkim has its own unique set of bells, each with a distinct tone that carries across the valleys. These bells are not just instruments but sacred objects blessed by high lamas. The morning and evening bell ceremonies mark the rhythm of monastic life and call all beings to mindfulness. It is said that the sound of these bells can purify negative karma and bring peace to troubled minds.",
    author: "Lama Norbu",
    category: "religious",
    language: "en",
    culturalSignificance: "Monastery bells are central to Buddhist practice in Sikkim, creating a sonic landscape that connects all communities.",
    status: "approved",
    createdAt: "2024-01-02T00:00:00Z"
  }
];

export const culturalRecipes = [
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
      "Steam for 15-20 minutes until cooked through.",
      "Serve hot with spicy dipping sauce."
    ],
    prepTime: 45,
    cookTime: 20,
    servings: 4,
    difficulty: "medium",
    occasion: "everyday",
    culturalContext: "Momos are a staple food in Sikkim, originally from Tibet but adapted with local ingredients and flavors. They represent the cultural exchange between Tibet and Sikkim.",
    region: "Sikkim",
    status: "approved",
    author: "Chef Pemba",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "gundruk",
    name: "Traditional Gundruk",
    description: "Fermented leafy green vegetable soup, a traditional Nepali dish popular in Sikkim.",
    ingredients: [
      "500g mustard leaves or spinach",
      "2 tbsp mustard oil",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "3 cloves garlic",
      "1 inch ginger",
      "2 dried red chilies",
      "1 tsp turmeric",
      "Salt to taste"
    ],
    instructions: [
      "Ferment the leaves by keeping them in a warm place for 3-4 days.",
      "Wash and chop the fermented leaves.",
      "Heat oil and add garlic, ginger, and chilies.",
      "Add onions and cook until golden.",
      "Add tomatoes and spices, cook until soft.",
      "Add fermented leaves and simmer for 15-20 minutes.",
      "Serve hot with rice."
    ],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "easy",
    occasion: "daily meal",
    culturalContext: "Gundruk is a traditional fermented food that helps preserve vegetables during harsh mountain winters. It's rich in probiotics and essential nutrients.",
    region: "Sikkim",
    status: "approved",
    author: "Ama Diki",
    createdAt: "2024-01-02T00:00:00Z"
  }
];

export const emergencyContacts = [
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
  },
  {
    id: "ambulance-service",
    name: "Ambulance Service",
    type: "medical",
    phone: "108",
    location: "State-wide",
    address: "Available throughout Sikkim",
    availableHours: "24/7",
    languages: ["English", "Hindi", "Nepali"],
    services: ["Emergency Medical Transport", "First Aid"],
    verified: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "fire-brigade",
    name: "Fire Brigade",
    type: "fire",
    phone: "101",
    location: "Gangtok",
    address: "Fire Station, Gangtok",
    coordinates: { lat: 27.3380, lng: 88.6070 },
    availableHours: "24/7",
    languages: ["English", "Hindi", "Nepali"],
    services: ["Fire Emergency", "Rescue Operations"],
    verified: true,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const stats = {
  monasteries: {
    total: monasteries.length,
    avgRating: monasteries.reduce((sum, m) => sum + m.rating, 0) / monasteries.length
  },
  events: {
    total: events.length,
    upcoming: events.filter(e => new Date(e.endDate) >= new Date()).length
  },
  community: {
    posts: communityPosts.length,
    totalLikes: communityPosts.reduce((sum, p) => sum + p.likes, 0)
  },
  cultural: {
    stories: culturalStories.length,
    recipes: culturalRecipes.length
  },
  lastUpdated: new Date().toISOString()
};

// Helper functions for mock interactions
export const mockAPI = {
  // Generate mock AI itinerary
  generateItinerary: (preferences: any) => {
    const selectedMonasteries = monasteries
      .filter(m => {
        if (preferences.difficulty && m.difficulty !== preferences.difficulty) return false;
        if (preferences.interests && !preferences.interests.some((interest: string) => 
          m.specialFeatures.includes(interest))) return false;
        return true;
      })
      .slice(0, preferences.duration || 3);

    return {
      id: `itinerary-${Date.now()}`,
      title: `${preferences.duration || 3}-Day Sikkim Monastery Journey`,
      duration: preferences.duration || 3,
      difficulty: preferences.difficulty || 'moderate',
      preferences,
      monasteries: selectedMonasteries.map((m, index) => ({
        ...m,
        day: Math.floor(index / 2) + 1,
        estimatedTime: '2-3 hours'
      })),
      tips: [
        "Wear comfortable walking shoes",
        "Respect monastery rules and customs", 
        "Carry water and light snacks",
        "Visit during early morning for best experience"
      ],
      createdAt: new Date().toISOString()
    };
  },

  // Add review to monastery (mock)
  addMonasteryReview: (monasteryId: string, review: any) => {
    const monastery = monasteries.find(m => m.id === monasteryId);
    if (monastery) {
      const newReview = {
        id: `review-${Date.now()}`,
        ...review,
        date: new Date().toISOString()
      };
      monastery.reviews.push(newReview);
      
      // Update average rating
      const totalRating = monastery.reviews.reduce((sum, r) => sum + r.rating, 0);
      monastery.rating = totalRating / monastery.reviews.length;
    }
    return monastery;
  },

  // Add community post (mock)
  addCommunityPost: (post: any) => {
    const newPost = {
      id: `post-${Date.now()}`,
      ...post,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    communityPosts.unshift(newPost);
    return newPost;
  },

  // Toggle like on post (mock)
  togglePostLike: (postId: string) => {
    const post = communityPosts.find(p => p.id === postId);
    if (post) {
      post.likes = Math.max(0, post.likes + (Math.random() > 0.5 ? 1 : -1));
    }
    return post;
  },

  // Add comment to post (mock)
  addComment: (postId: string, comment: any) => {
    const post = communityPosts.find(p => p.id === postId);
    if (post) {
      const newComment = {
        id: `comment-${Date.now()}`,
        ...comment,
        createdAt: new Date().toISOString()
      };
      post.comments.push(newComment);
    }
    return post;
  }
};