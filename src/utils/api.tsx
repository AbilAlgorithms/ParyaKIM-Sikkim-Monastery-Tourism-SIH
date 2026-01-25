// Static API replacement - removed backend dependencies
import { 
  monasteries, 
  events, 
  communityPosts, 
  culturalStories, 
  culturalRecipes, 
  emergencyContacts,
  stats,
  mockAPI 
} from './staticData';

// Simulate API delays for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions that return static data
export const api = {
  // Monasteries
  monasteries: {
    getAll: async () => {
      await delay(300);
      return { monasteries };
    },
    
    getById: async (id: string) => {
      await delay(200);
      const monastery = monasteries.find(m => m.id === id);
      return { monastery };
    },
    
    addReview: async (monasteryId: string, review: any) => {
      await delay(500);
      return mockAPI.addMonasteryReview(monasteryId, review);
    }
  },

  // Events
  events: {
    getAll: async () => {
      await delay(300);
      return { events };
    }
  },

  // Community
  community: {
    getPosts: async () => {
      await delay(400);
      return { posts: communityPosts };
    },
    
    addPost: async (post: any) => {
      await delay(600);
      return mockAPI.addCommunityPost(post);
    },
    
    toggleLike: async (postId: string) => {
      await delay(200);
      return mockAPI.togglePostLike(postId);
    },
    
    addComment: async (postId: string, comment: any) => {
      await delay(400);
      return mockAPI.addComment(postId, comment);
    }
  },

  // Cultural content
  cultural: {
    stories: {
      getAll: async () => {
        await delay(300);
        return { stories: culturalStories };
      }
    },
    
    recipes: {
      getAll: async () => {
        await delay(300);
        return { recipes: culturalRecipes };
      }
    }
  },

  // Emergency
  emergency: {
    getContacts: async () => {
      await delay(200);
      return { contacts: emergencyContacts };
    }
  },

  // Analytics
  analytics: {
    getStats: async () => {
      await delay(300);
      return { stats };
    }
  },

  // AI Itinerary
  itinerary: {
    generate: async (preferences: any) => {
      await delay(800); // Longer delay for "AI processing"
      return { itinerary: mockAPI.generateItinerary(preferences) };
    }
  }
};

// Export for backward compatibility
export default api;