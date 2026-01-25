import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Utility function to generate unique IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Utility function for error responses
function errorResponse(message: string, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Initialize storage buckets on startup
async function initializeBuckets() {
  const buckets = [
    'make-c7049d1e-videos',
    'make-c7049d1e-images',
    'make-c7049d1e-audio'
  ];

  console.log('Starting bucket initialization...');

  for (const bucketName of buckets) {
    try {
      const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error(`Error listing buckets for ${bucketName}:`, listError);
        continue;
      }
      
      const bucketExists = existingBuckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        console.log(`Creating bucket: ${bucketName}`);
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: false,
          allowedMimeTypes: bucketName.includes('video') 
            ? ['video/mp4', 'video/webm', 'video/quicktime']
            : bucketName.includes('audio')
            ? ['audio/mpeg', 'audio/wav', 'audio/ogg']
            : ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        });
        
        if (error) {
          console.error(`Failed to create bucket ${bucketName}:`, error);
        } else {
          console.log(`Successfully created bucket: ${bucketName}`);
        }
      } else {
        console.log(`Bucket ${bucketName} already exists`);
      }
    } catch (error) {
      console.error(`Unexpected error initializing bucket ${bucketName}:`, error);
    }
  }
  
  console.log('Bucket initialization completed');
}

// Initialize buckets on startup
console.log('Sikkim Tourism Backend Server starting...');
initializeBuckets().then(() => {
  console.log('Server initialization completed');
}).catch((error) => {
  console.error('Server initialization failed:', error);
});

// Health check endpoint
app.get("/make-server-c7049d1e/health", (c) => {
  return c.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Sikkim Tourism Backend Server is running",
    version: "1.0.0"
  });
});

// =============================================================================
// MONASTERIES API
// =============================================================================

// Get all monasteries
app.get("/make-server-c7049d1e/monasteries", async (c) => {
  try {
    const monasteries = await kv.getByPrefix("monastery:");
    
    // Filter out invalid entries and add proper null checks
    const validMonasteries = monasteries
      .filter(m => m && m.key && m.value)
      .map(m => ({ 
        id: m.key.replace('monastery:', ''), 
        ...m.value,
        rating: m.value.rating || 0,
        reviews: m.value.reviews || []
      }));
    
    return c.json({ monasteries: validMonasteries });
  } catch (error) {
    console.error("Error fetching monasteries:", error);
    return errorResponse("Failed to fetch monasteries");
  }
});

// Get single monastery
app.get("/make-server-c7049d1e/monasteries/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const monastery = await kv.get(`monastery:${id}`);
    
    if (!monastery) {
      return errorResponse("Monastery not found", 404);
    }
    
    return c.json({ monastery: { id, ...monastery } });
  } catch (error) {
    console.error("Error fetching monastery:", error);
    return errorResponse("Failed to fetch monastery");
  }
});

// Create/Update monastery
app.post("/make-server-c7049d1e/monasteries", async (c) => {
  try {
    const data = await c.req.json();
    const id = data.id || generateId();
    
    const monasteryData = {
      name: data.name,
      description: data.description,
      location: data.location,
      coordinates: data.coordinates,
      images: data.images || [],
      visitingHours: data.visitingHours,
      entryFee: data.entryFee,
      specialFeatures: data.specialFeatures || [],
      difficulty: data.difficulty || 'easy',
      rating: data.rating || 0,
      reviews: data.reviews || [],
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`monastery:${id}`, monasteryData);
    return c.json({ success: true, id, monastery: monasteryData });
  } catch (error) {
    console.error("Error creating/updating monastery:", error);
    return errorResponse("Failed to save monastery");
  }
});

// Add monastery review
app.post("/make-server-c7049d1e/monasteries/:id/reviews", async (c) => {
  try {
    const monasteryId = c.req.param("id");
    const reviewData = await c.req.json();
    
    const monastery = await kv.get(`monastery:${monasteryId}`);
    if (!monastery) {
      return errorResponse("Monastery not found", 404);
    }
    
    const review = {
      id: generateId(),
      rating: reviewData.rating,
      comment: reviewData.comment,
      author: reviewData.author,
      date: new Date().toISOString()
    };
    
    monastery.reviews = monastery.reviews || [];
    monastery.reviews.push(review);
    
    // Update average rating
    const totalRating = monastery.reviews.reduce((sum, r) => sum + r.rating, 0);
    monastery.rating = totalRating / monastery.reviews.length;
    monastery.updatedAt = new Date().toISOString();
    
    await kv.set(`monastery:${monasteryId}`, monastery);
    return c.json({ success: true, review });
  } catch (error) {
    console.error("Error adding monastery review:", error);
    return errorResponse("Failed to add review");
  }
});

// =============================================================================
// AI ITINERARY API
// =============================================================================

// Generate AI itinerary
app.post("/make-server-c7049d1e/itinerary/generate", async (c) => {
  try {
    const preferences = await c.req.json();
    const itineraryId = generateId();
    
    // Mock AI-generated itinerary (in real app, integrate with AI service)
    const monasteries = await kv.getByPrefix("monastery:");
    const selectedMonasteries = monasteries
      .filter(m => {
        if (preferences.difficulty && m.value.difficulty !== preferences.difficulty) return false;
        if (preferences.interests && !preferences.interests.some(interest => 
          m.value.specialFeatures?.includes(interest))) return false;
        return true;
      })
      .slice(0, preferences.duration || 3);
    
    const itinerary = {
      id: itineraryId,
      title: `${preferences.duration || 3}-Day Sikkim Monastery Journey`,
      duration: preferences.duration || 3,
      difficulty: preferences.difficulty || 'moderate',
      preferences,
      monasteries: selectedMonasteries.map(m => ({
        id: m.key.replace('monastery:', ''),
        ...m.value,
        day: Math.ceil(Math.random() * (preferences.duration || 3)),
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
    
    // Save itinerary
    await kv.set(`itinerary:${itineraryId}`, itinerary);
    
    return c.json({ success: true, itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return errorResponse("Failed to generate itinerary");
  }
});

// Get user itineraries
app.get("/make-server-c7049d1e/itinerary/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const itineraries = await kv.getByPrefix(`itinerary:user:${userId}:`);
    
    return c.json({ 
      itineraries: itineraries.map(i => ({ 
        id: i.key.replace(`itinerary:user:${userId}:`, ''), 
        ...i.value 
      }))
    });
  } catch (error) {
    console.error("Error fetching user itineraries:", error);
    return errorResponse("Failed to fetch itineraries");
  }
});

// Save itinerary for user
app.post("/make-server-c7049d1e/itinerary/save", async (c) => {
  try {
    const { userId, itineraryId, customizations } = await c.req.json();
    
    const itinerary = await kv.get(`itinerary:${itineraryId}`);
    if (!itinerary) {
      return errorResponse("Itinerary not found", 404);
    }
    
    const savedItinerary = {
      ...itinerary,
      customizations,
      savedAt: new Date().toISOString()
    };
    
    await kv.set(`itinerary:user:${userId}:${itineraryId}`, savedItinerary);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving itinerary:", error);
    return errorResponse("Failed to save itinerary");
  }
});

// =============================================================================
// CULTURAL EVENTS API
// =============================================================================

// Get all cultural events
app.get("/make-server-c7049d1e/events", async (c) => {
  try {
    const events = await kv.getByPrefix("event:");
    const currentDate = new Date();
    
    const formattedEvents = events
      .filter(e => e && e.key && e.value)
      .map(e => ({ 
        id: e.key.replace('event:', ''), 
        ...e.value,
        currentAttendees: e.value.currentAttendees || 0,
        maxAttendees: e.value.maxAttendees || null,
        status: e.value.status || 'upcoming'
      }))
      .filter(e => e.endDate && new Date(e.endDate) >= currentDate)
      .sort((a, b) => {
        if (!a.startDate || !b.startDate) return 0;
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
    
    return c.json({ events: formattedEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    return errorResponse("Failed to fetch events");
  }
});

// Create cultural event
app.post("/make-server-c7049d1e/events", async (c) => {
  try {
    const data = await c.req.json();
    const id = generateId();
    
    const eventData = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
      category: data.category,
      images: data.images || [],
      organizer: data.organizer,
      ticketPrice: data.ticketPrice || 0,
      maxAttendees: data.maxAttendees,
      currentAttendees: 0,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`event:${id}`, eventData);
    return c.json({ success: true, id, event: eventData });
  } catch (error) {
    console.error("Error creating event:", error);
    return errorResponse("Failed to create event");
  }
});

// Register for event
app.post("/make-server-c7049d1e/events/:id/register", async (c) => {
  try {
    const eventId = c.req.param("id");
    const { userId, userInfo } = await c.req.json();
    
    const event = await kv.get(`event:${eventId}`);
    if (!event) {
      return errorResponse("Event not found", 404);
    }
    
    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      return errorResponse("Event is full", 400);
    }
    
    // Check if user already registered
    const existingRegistration = await kv.get(`event_registration:${eventId}:${userId}`);
    if (existingRegistration) {
      return errorResponse("Already registered for this event", 400);
    }
    
    // Create registration
    const registration = {
      eventId,
      userId,
      userInfo,
      registrationDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    await kv.set(`event_registration:${eventId}:${userId}`, registration);
    
    // Update event attendee count
    event.currentAttendees = (event.currentAttendees || 0) + 1;
    await kv.set(`event:${eventId}`, event);
    
    return c.json({ success: true, registration });
  } catch (error) {
    console.error("Error registering for event:", error);
    return errorResponse("Failed to register for event");
  }
});

// =============================================================================
// COMMUNITY HUB API
// =============================================================================

// Get community posts
app.get("/make-server-c7049d1e/community/posts", async (c) => {
  try {
    const posts = await kv.getByPrefix("community_post:");
    const formattedPosts = posts
      .filter(p => p && p.key && p.value)
      .map(p => ({ 
        id: p.key.replace('community_post:', ''), 
        ...p.value,
        likes: p.value.likes || 0,
        comments: p.value.comments || [],
        tags: p.value.tags || []
      }))
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    
    return c.json({ posts: formattedPosts });
  } catch (error) {
    console.error("Error fetching community posts:", error);
    return errorResponse("Failed to fetch community posts");
  }
});

// Upload video/image for community
app.post("/make-server-c7049d1e/community/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const metadata = JSON.parse(formData.get('metadata') as string || '{}');
    
    if (!file) {
      return errorResponse("No file provided", 400);
    }
    
    const fileExtension = file.name.split('.').pop();
    const fileName = `${generateId()}.${fileExtension}`;
    const bucketName = file.type.startsWith('video/') ? 'make-c7049d1e-videos' : 'make-c7049d1e-images';
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        duplex: 'half'
      });
    
    if (uploadError) {
      console.error("Upload error:", uploadError);
      return errorResponse("Failed to upload file");
    }
    
    // Get signed URL
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days
    
    const postId = generateId();
    const post = {
      id: postId,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      title: metadata.title || 'Community Share',
      description: metadata.description || '',
      fileUrl: signedUrlData?.signedUrl,
      fileName,
      bucketName,
      author: metadata.author || 'Anonymous',
      location: metadata.location,
      tags: metadata.tags || [],
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`community_post:${postId}`, post);
    return c.json({ success: true, post });
  } catch (error) {
    console.error("Error uploading community content:", error);
    return errorResponse("Failed to upload content");
  }
});

// Like/unlike community post
app.post("/make-server-c7049d1e/community/posts/:id/like", async (c) => {
  try {
    const postId = c.req.param("id");
    const { userId } = await c.req.json();
    
    const post = await kv.get(`community_post:${postId}`);
    if (!post) {
      return errorResponse("Post not found", 404);
    }
    
    const likeKey = `community_like:${postId}:${userId}`;
    const existingLike = await kv.get(likeKey);
    
    if (existingLike) {
      // Unlike
      await kv.del(likeKey);
      post.likes = Math.max(0, (post.likes || 0) - 1);
    } else {
      // Like
      await kv.set(likeKey, { postId, userId, likedAt: new Date().toISOString() });
      post.likes = (post.likes || 0) + 1;
    }
    
    await kv.set(`community_post:${postId}`, post);
    return c.json({ success: true, likes: post.likes, liked: !existingLike });
  } catch (error) {
    console.error("Error toggling like:", error);
    return errorResponse("Failed to toggle like");
  }
});

// Add comment to community post
app.post("/make-server-c7049d1e/community/posts/:id/comments", async (c) => {
  try {
    const postId = c.req.param("id");
    const commentData = await c.req.json();
    
    const post = await kv.get(`community_post:${postId}`);
    if (!post) {
      return errorResponse("Post not found", 404);
    }
    
    const comment = {
      id: generateId(),
      text: commentData.text,
      author: commentData.author,
      createdAt: new Date().toISOString()
    };
    
    post.comments = post.comments || [];
    post.comments.push(comment);
    
    await kv.set(`community_post:${postId}`, post);
    return c.json({ success: true, comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return errorResponse("Failed to add comment");
  }
});

// =============================================================================
// CULTURAL ROOTS API
// =============================================================================

// Get cultural stories
app.get("/make-server-c7049d1e/cultural/stories", async (c) => {
  try {
    const stories = await kv.getByPrefix("cultural_story:");
    const validStories = stories
      .filter(s => s && s.key && s.value)
      .map(s => ({ 
        id: s.key.replace('cultural_story:', ''), 
        ...s.value,
        status: s.value.status || 'pending_review',
        images: s.value.images || [],
        language: s.value.language || 'en'
      }));
    
    return c.json({ stories: validStories });
  } catch (error) {
    console.error("Error fetching cultural stories:", error);
    return errorResponse("Failed to fetch cultural stories");
  }
});

// Submit cultural story
app.post("/make-server-c7049d1e/cultural/stories", async (c) => {
  try {
    const data = await c.req.json();
    const id = generateId();
    
    const story = {
      title: data.title,
      content: data.content,
      author: data.author,
      category: data.category,
      language: data.language || 'en',
      audioUrl: data.audioUrl,
      images: data.images || [],
      location: data.location,
      culturalSignificance: data.culturalSignificance,
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`cultural_story:${id}`, story);
    return c.json({ success: true, id, story });
  } catch (error) {
    console.error("Error submitting cultural story:", error);
    return errorResponse("Failed to submit story");
  }
});

// Get traditional recipes
app.get("/make-server-c7049d1e/cultural/recipes", async (c) => {
  try {
    const recipes = await kv.getByPrefix("cultural_recipe:");
    const validRecipes = recipes
      .filter(r => r && r.key && r.value)
      .map(r => ({ 
        id: r.key.replace('cultural_recipe:', ''), 
        ...r.value,
        status: r.value.status || 'pending_review',
        images: r.value.images || [],
        ingredients: r.value.ingredients || [],
        instructions: r.value.instructions || [],
        difficulty: r.value.difficulty || 'medium'
      }));
    
    return c.json({ recipes: validRecipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return errorResponse("Failed to fetch recipes");
  }
});

// Submit traditional recipe
app.post("/make-server-c7049d1e/cultural/recipes", async (c) => {
  try {
    const data = await c.req.json();
    const id = generateId();
    
    const recipe = {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      difficulty: data.difficulty,
      occasion: data.occasion,
      culturalContext: data.culturalContext,
      images: data.images || [],
      author: data.author,
      region: data.region,
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`cultural_recipe:${id}`, recipe);
    return c.json({ success: true, id, recipe });
  } catch (error) {
    console.error("Error submitting recipe:", error);
    return errorResponse("Failed to submit recipe");
  }
});

// =============================================================================
// EMERGENCY CONTACTS API
// =============================================================================

// Get emergency contacts
app.get("/make-server-c7049d1e/emergency/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("emergency_contact:");
    const validContacts = contacts
      .filter(contact => contact && contact.key && contact.value)
      .map(contact => ({ 
        id: contact.key.replace('emergency_contact:', ''), 
        ...contact.value,
        verified: contact.value.verified || false,
        availableHours: contact.value.availableHours || '24/7',
        languages: contact.value.languages || ['English'],
        services: contact.value.services || []
      }));
    
    return c.json({ contacts: validContacts });
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    return errorResponse("Failed to fetch emergency contacts");
  }
});

// Add emergency contact
app.post("/make-server-c7049d1e/emergency/contacts", async (c) => {
  try {
    const data = await c.req.json();
    const id = generateId();
    
    const contact = {
      name: data.name,
      type: data.type, // police, hospital, tourist_helpline, etc.
      phone: data.phone,
      location: data.location,
      address: data.address,
      coordinates: data.coordinates,
      availableHours: data.availableHours || '24/7',
      languages: data.languages || ['English', 'Hindi'],
      services: data.services || [],
      verified: data.verified || false,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`emergency_contact:${id}`, contact);
    return c.json({ success: true, id, contact });
  } catch (error) {
    console.error("Error adding emergency contact:", error);
    return errorResponse("Failed to add emergency contact");
  }
});

// Report emergency incident
app.post("/make-server-c7049d1e/emergency/report", async (c) => {
  try {
    const data = await c.req.json();
    const id = generateId();
    
    const incident = {
      type: data.type,
      description: data.description,
      location: data.location,
      coordinates: data.coordinates,
      reporter: data.reporter,
      contactInfo: data.contactInfo,
      severity: data.severity || 'medium',
      status: 'reported',
      images: data.images || [],
      reportedAt: new Date().toISOString()
    };
    
    await kv.set(`emergency_incident:${id}`, incident);
    
    // In a real app, this would trigger alerts to authorities
    console.log(`Emergency incident reported: ${id}`, incident);
    
    return c.json({ success: true, id, incident });
  } catch (error) {
    console.error("Error reporting emergency incident:", error);
    return errorResponse("Failed to report incident");
  }
});

// =============================================================================
// ANALYTICS & STATISTICS API
// =============================================================================

// Get app statistics
app.get("/make-server-c7049d1e/analytics/stats", async (c) => {
  try {
    const [monasteries, events, posts, stories, recipes] = await Promise.all([
      kv.getByPrefix("monastery:"),
      kv.getByPrefix("event:"),
      kv.getByPrefix("community_post:"),
      kv.getByPrefix("cultural_story:"),
      kv.getByPrefix("cultural_recipe:")
    ]);
    
    // Filter valid data and calculate stats safely
    const validMonasteries = monasteries.filter(m => m && m.value);
    const validEvents = events.filter(e => e && e.value);
    const validPosts = posts.filter(p => p && p.value);
    const validStories = stories.filter(s => s && s.value);
    const validRecipes = recipes.filter(r => r && r.value);
    
    // Calculate average rating safely
    const ratingsSum = validMonasteries.reduce((sum, m) => {
      const rating = m.value && typeof m.value.rating === 'number' ? m.value.rating : 0;
      return sum + rating;
    }, 0);
    const avgRating = validMonasteries.length > 0 ? ratingsSum / validMonasteries.length : 0;
    
    // Calculate upcoming events safely
    const currentDate = new Date();
    const upcomingEvents = validEvents.filter(e => {
      if (!e.value || !e.value.endDate) return false;
      try {
        return new Date(e.value.endDate) >= currentDate;
      } catch {
        return false;
      }
    }).length;
    
    // Calculate total likes safely
    const totalLikes = validPosts.reduce((sum, p) => {
      const likes = p.value && typeof p.value.likes === 'number' ? p.value.likes : 0;
      return sum + likes;
    }, 0);
    
    const stats = {
      monasteries: {
        total: validMonasteries.length,
        avgRating: Number(avgRating.toFixed(1))
      },
      events: {
        total: validEvents.length,
        upcoming: upcomingEvents
      },
      community: {
        posts: validPosts.length,
        totalLikes: totalLikes
      },
      cultural: {
        stories: validStories.length,
        recipes: validRecipes.length
      },
      lastUpdated: new Date().toISOString()
    };
    
    return c.json({ stats });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return errorResponse("Failed to fetch analytics");
  }
});

// Seed initial data
app.post("/make-server-c7049d1e/seed", async (c) => {
  try {
    // Seed some initial monasteries
    const sampleMonasteries = [
      {
        id: "rumtek-monastery",
        name: "Rumtek Monastery",
        description: "The largest monastery in Sikkim and seat of the Karmapa",
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
            date: "2024-01-15T00:00:00Z"
          }
        ]
      },
      {
        id: "pemayangtse-monastery",
        name: "Pemayangtse Monastery",
        description: "One of the oldest monasteries in Sikkim",
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
            date: "2024-01-10T00:00:00Z"
          }
        ]
      }
    ];
    
    // Seed sample events
    const sampleEvents = [
      {
        id: "losar-festival",
        title: "Losar Festival Celebration",
        description: "Tibetan New Year celebration with traditional dances and prayers",
        startDate: "2025-02-10T09:00:00Z",
        endDate: "2025-02-12T18:00:00Z",
        location: "Rumtek Monastery",
        category: "religious",
        organizer: "Rumtek Monastery Committee",
        ticketPrice: 0,
        maxAttendees: 500,
        currentAttendees: 0,
        status: 'upcoming',
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"]
      },
      {
        id: "saga-dawa",
        title: "Saga Dawa Festival",
        description: "Sacred Buddhist festival commemorating the birth, enlightenment, and death of Buddha",
        startDate: "2025-05-15T06:00:00Z",
        endDate: "2025-05-15T20:00:00Z",
        location: "Various Monasteries",
        category: "religious",
        organizer: "Sikkim Buddhist Association",
        ticketPrice: 0,
        maxAttendees: 1000,
        currentAttendees: 0,
        status: 'upcoming',
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"]
      }
    ];
    
    // Seed sample cultural content
    const sampleStories = [
      {
        id: "yeti-legend",
        title: "The Legend of the Yeti",
        content: "Ancient tales speak of the mysterious creature that roams the high peaks...",
        author: "Elder Tenzin",
        category: "folklore",
        language: "en",
        culturalSignificance: "Important part of local mountain folklore",
        status: "approved",
        images: [],
        location: "Sikkim Himalayas"
      },
      {
        id: "prayer-flags",
        title: "The Story of Prayer Flags",
        content: "Colorful flags that carry prayers on the mountain winds...",
        author: "Grandmother Dolma",
        category: "religious",
        language: "en",
        culturalSignificance: "Sacred Buddhist tradition of spreading good wishes",
        status: "approved",
        images: [],
        location: "Throughout Sikkim"
      }
    ];
    
    // Save seed data with proper error handling
    let seededData = {
      monasteries: 0,
      events: 0,
      stories: 0,
      emergencyContacts: 0,
      recipes: 0
    };

    // Seed monasteries
    for (const monastery of sampleMonasteries) {
      try {
        await kv.set(`monastery:${monastery.id}`, {
          ...monastery,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        seededData.monasteries++;
      } catch (error) {
        console.error(`Failed to seed monastery ${monastery.id}:`, error);
      }
    }
    
    // Seed events
    for (const event of sampleEvents) {
      try {
        await kv.set(`event:${event.id}`, {
          ...event,
          createdAt: new Date().toISOString()
        });
        seededData.events++;
      } catch (error) {
        console.error(`Failed to seed event ${event.id}:`, error);
      }
    }
    
    // Seed stories
    for (const story of sampleStories) {
      try {
        await kv.set(`cultural_story:${story.id}`, {
          ...story,
          createdAt: new Date().toISOString()
        });
        seededData.stories++;
      } catch (error) {
        console.error(`Failed to seed story ${story.id}:`, error);
      }
    }
    
    // Add emergency contacts
    const emergencyContacts = [
      {
        id: "sikkim-police",
        name: "Sikkim Police",
        type: "police",
        phone: "100",
        location: "Gangtok",
        address: "Police Headquarters, Gangtok",
        coordinates: { lat: 27.3389, lng: 88.6065 },
        availableHours: "24/7",
        languages: ["English", "Hindi", "Nepali"],
        services: ["Emergency Response", "Tourist Assistance"],
        verified: true
      },
      {
        id: "stnm-hospital",
        name: "STNM Hospital",
        type: "hospital",
        phone: "03592-202116",
        location: "Gangtok",
        address: "Sochyakgang, Gangtok",
        coordinates: { lat: 27.3315, lng: 88.6138 },
        availableHours: "24/7",
        languages: ["English", "Hindi", "Nepali"],
        services: ["Emergency Care", "General Medicine"],
        verified: true
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
        services: ["Tourist Information", "Assistance"],
        verified: true
      }
    ];

    // Seed emergency contacts
    for (const contact of emergencyContacts) {
      try {
        await kv.set(`emergency_contact:${contact.id}`, {
          ...contact,
          createdAt: new Date().toISOString()
        });
        seededData.emergencyContacts++;
      } catch (error) {
        console.error(`Failed to seed emergency contact ${contact.id}:`, error);
      }
    }

    // Seed a sample recipe
    const sampleRecipe = {
      id: "traditional-momos",
      name: "Traditional Sikkim Momos",
      description: "Steamed dumplings filled with vegetables, a beloved Sikkimese dish",
      ingredients: [
        "2 cups all-purpose flour",
        "1 cup warm water",
        "1 tsp salt",
        "2 cups mixed vegetables"
      ],
      instructions: [
        "Mix flour, water, and salt to make dough",
        "Prepare vegetable filling",
        "Shape into dumplings",
        "Steam for 15-20 minutes"
      ],
      prepTime: 45,
      cookTime: 20,
      servings: 4,
      difficulty: "medium",
      occasion: "everyday",
      culturalContext: "Traditional Sikkimese comfort food",
      region: "Sikkim",
      status: "approved",
      author: "Chef Pemba",
      images: []
    };

    try {
      await kv.set(`cultural_recipe:${sampleRecipe.id}`, {
        ...sampleRecipe,
        createdAt: new Date().toISOString()
      });
      seededData.recipes++;
    } catch (error) {
      console.error(`Failed to seed recipe ${sampleRecipe.id}:`, error);
    }
    
    return c.json({ 
      success: true, 
      message: "Initial data seeded successfully",
      seeded: seededData
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return errorResponse("Failed to seed data");
  }
});

Deno.serve(app.fetch);