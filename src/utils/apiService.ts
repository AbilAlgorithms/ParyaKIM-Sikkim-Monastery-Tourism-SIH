// API Service for Sikkim Monastery Travel Website
import { Monastery, CulturalEvent, monasteryData, culturalEventsData } from './monasteryData';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  difficulty?: string;
  accessibility?: boolean;
  location?: string;
  radius?: number;
}

class ApiService {
  private baseUrl = '/api'; // In production, this would be your actual API endpoint

  // Monastery API endpoints
  async getMonasteries(params?: SearchParams): Promise<ApiResponse<Monastery[]>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredData = [...monasteryData];
      
      if (params) {
        if (params.query) {
          filteredData = filteredData.filter(monastery => 
            monastery.name.toLowerCase().includes(params.query!.toLowerCase()) ||
            monastery.description.toLowerCase().includes(params.query!.toLowerCase()) ||
            monastery.location.toLowerCase().includes(params.query!.toLowerCase())
          );
        }
        
        if (params.difficulty) {
          filteredData = filteredData.filter(monastery => monastery.difficulty === params.difficulty);
        }
        
        if (params.accessibility !== undefined) {
          filteredData = filteredData.filter(monastery => monastery.accessibility === params.accessibility);
        }
        
        if (params.location) {
          filteredData = filteredData.filter(monastery => 
            monastery.location.toLowerCase().includes(params.location!.toLowerCase())
          );
        }
      }
      
      return {
        success: true,
        data: filteredData,
        message: `Found ${filteredData.length} monasteries`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Failed to fetch monasteries'
      };
    }
  }

  async getMonasteryById(id: string): Promise<ApiResponse<Monastery | null>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const monastery = monasteryData.find(m => m.id === id);
      
      return {
        success: true,
        data: monastery || null,
        message: monastery ? 'Monastery found' : 'Monastery not found'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to fetch monastery'
      };
    }
  }

  async getNearbyMonasteries(
    userLocation: { lat: number; lng: number }, 
    radiusKm: number = 50
  ): Promise<ApiResponse<Monastery[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      
      const nearby = monasteryData.filter(monastery => {
        const distance = this.calculateDistance(userLocation, monastery.coordinates);
        return distance <= radiusKm;
      });
      
      return {
        success: true,
        data: nearby,
        message: `Found ${nearby.length} nearby monasteries`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Failed to fetch nearby monasteries'
      };
    }
  }

  // Cultural Events API endpoints
  async getCulturalEvents(params?: SearchParams): Promise<ApiResponse<CulturalEvent[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      let filteredData = [...culturalEventsData];
      
      if (params) {
        if (params.query) {
          filteredData = filteredData.filter(event => 
            event.title.toLowerCase().includes(params.query!.toLowerCase()) ||
            event.description.toLowerCase().includes(params.query!.toLowerCase()) ||
            event.location.toLowerCase().includes(params.query!.toLowerCase())
          );
        }
        
        if (params.category) {
          filteredData = filteredData.filter(event => event.category === params.category);
        }
      }
      
      return {
        success: true,
        data: filteredData,
        message: `Found ${filteredData.length} events`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Failed to fetch cultural events'
      };
    }
  }

  async getEventById(id: number): Promise<ApiResponse<CulturalEvent | null>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const event = culturalEventsData.find(e => e.id === id);
      
      return {
        success: true,
        data: event || null,
        message: event ? 'Event found' : 'Event not found'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to fetch event'
      };
    }
  }

  // Utility methods
  private calculateDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Directions and navigation
  getDirectionsUrl(destination: { lat: number; lng: number }, origin?: { lat: number; lng: number }): string {
    const defaultOrigin = { lat: 27.3314, lng: 88.6138 }; // Gangtok coordinates
    const start = origin || defaultOrigin;
    
    return `https://www.google.com/maps/dir/${start.lat},${start.lng}/${destination.lat},${destination.lng}`;
  }

  // Weather API (mock)
  async getWeatherInfo(location: { lat: number; lng: number }): Promise<ApiResponse<any>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Mock weather data
      const weatherData = {
        temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
        windSpeed: Math.floor(Math.random() * 10) + 5, // 5-15 km/h
        visibility: Math.floor(Math.random() * 5) + 8 // 8-13 km
      };
      
      return {
        success: true,
        data: weatherData,
        message: 'Weather information retrieved'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to fetch weather information'
      };
    }
  }

  // Emergency contacts
  async getEmergencyContacts(): Promise<ApiResponse<any[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const emergencyContacts = [
        {
          id: 1,
          name: 'Police Emergency',
          number: '100',
          type: 'police',
          description: 'Emergency police services'
        },
        {
          id: 2,
          name: 'Medical Emergency',
          number: '108',
          type: 'medical',
          description: 'Ambulance and medical emergency'
        },
        {
          id: 3,
          name: 'Fire Emergency',
          number: '101',
          type: 'fire',
          description: 'Fire department emergency'
        },
        {
          id: 4,
          name: 'Tourist Helpline',
          number: '+91-3592-202-000',
          type: 'tourist',
          description: 'Tourist assistance and information'
        },
        {
          id: 5,
          name: 'Mountain Rescue',
          number: '+91-3592-202-999',
          type: 'rescue',
          description: 'Mountain rescue and emergency services'
        }
      ];
      
      return {
        success: true,
        data: emergencyContacts,
        message: 'Emergency contacts retrieved'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Failed to fetch emergency contacts'
      };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual functions for convenience
export const {
  getMonasteries,
  getMonasteryById,
  getNearbyMonasteries,
  getCulturalEvents,
  getEventById,
  getDirectionsUrl,
  getWeatherInfo,
  getEmergencyContacts
} = apiService;
