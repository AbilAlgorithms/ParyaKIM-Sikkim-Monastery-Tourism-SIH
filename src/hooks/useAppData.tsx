// Custom hook for managing application state and API calls
import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiResponse } from './apiService';
import { Monastery, CulturalEvent } from './monasteryData';

export interface AppState {
  monasteries: Monastery[];
  culturalEvents: CulturalEvent[];
  selectedMonastery: Monastery | null;
  selectedEvent: CulturalEvent | null;
  loading: {
    monasteries: boolean;
    events: boolean;
    monastery: boolean;
    event: boolean;
  };
  error: string | null;
  userLocation: { lat: number; lng: number } | null;
}

export interface UseAppDataReturn extends AppState {
  // Monastery actions
  loadMonasteries: (params?: any) => Promise<void>;
  loadMonasteryById: (id: string) => Promise<void>;
  loadNearbyMonasteries: (radius?: number) => Promise<void>;
  setSelectedMonastery: (monastery: Monastery | null) => void;
  
  // Event actions
  loadCulturalEvents: (params?: any) => Promise<void>;
  loadEventById: (id: number) => Promise<void>;
  setSelectedEvent: (event: CulturalEvent | null) => void;
  
  // Utility actions
  getDirections: (destination: { lat: number; lng: number }) => void;
  getUserLocation: () => Promise<void>;
  clearError: () => void;
}

export const useAppData = (): UseAppDataReturn => {
  const [state, setState] = useState<AppState>({
    monasteries: [],
    culturalEvents: [],
    selectedMonastery: null,
    selectedEvent: null,
    loading: {
      monasteries: false,
      events: false,
      monastery: false,
      event: false,
    },
    error: null,
    userLocation: null,
  });

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Load monasteries
  const loadMonasteries = useCallback(async (params?: any) => {
    setState(prev => ({ 
      ...prev, 
      loading: { ...prev.loading, monasteries: true },
      error: null 
    }));

    try {
      const response: ApiResponse<Monastery[]> = await apiService.getMonasteries(params);
      
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          monasteries: response.data,
          loading: { ...prev.loading, monasteries: false }
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.message || 'Failed to load monasteries',
          loading: { ...prev.loading, monasteries: false }
        }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load monasteries',
        loading: { ...prev.loading, monasteries: false }
      }));
    }
  }, []);

  // Load monastery by ID
  const loadMonasteryById = useCallback(async (id: string) => {
    setState(prev => ({ 
      ...prev, 
      loading: { ...prev.loading, monastery: true },
      error: null 
    }));

    try {
      const response: ApiResponse<Monastery | null> = await apiService.getMonasteryById(id);
      
      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          selectedMonastery: response.data,
          loading: { ...prev.loading, monastery: false }
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.message || 'Monastery not found',
          loading: { ...prev.loading, monastery: false }
        }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load monastery',
        loading: { ...prev.loading, monastery: false }
      }));
    }
  }, []);

  // Load nearby monasteries
  const loadNearbyMonasteries = useCallback(async (radius: number = 50) => {
    if (!state.userLocation) {
      setState(prev => ({ 
        ...prev, 
        error: 'User location not available' 
      }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      loading: { ...prev.loading, monasteries: true },
      error: null 
    }));

    try {
      const response: ApiResponse<Monastery[]> = await apiService.getNearbyMonasteries(state.userLocation, radius);
      
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          monasteries: response.data,
          loading: { ...prev.loading, monasteries: false }
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.message || 'Failed to load nearby monasteries',
          loading: { ...prev.loading, monasteries: false }
        }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load nearby monasteries',
        loading: { ...prev.loading, monasteries: false }
      }));
    }
  }, [state.userLocation]);

  // Load cultural events
  const loadCulturalEvents = useCallback(async (params?: any) => {
    setState(prev => ({ 
      ...prev, 
      loading: { ...prev.loading, events: true },
      error: null 
    }));

    try {
      const response: ApiResponse<CulturalEvent[]> = await apiService.getCulturalEvents(params);
      
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          culturalEvents: response.data,
          loading: { ...prev.loading, events: false }
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.message || 'Failed to load events',
          loading: { ...prev.loading, events: false }
        }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load events',
        loading: { ...prev.loading, events: false }
      }));
    }
  }, []);

  // Load event by ID
  const loadEventById = useCallback(async (id: number) => {
    setState(prev => ({ 
      ...prev, 
      loading: { ...prev.loading, event: true },
      error: null 
    }));

    try {
      const response: ApiResponse<CulturalEvent | null> = await apiService.getEventById(id);
      
      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          selectedEvent: response.data,
          loading: { ...prev.loading, event: false }
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.message || 'Event not found',
          loading: { ...prev.loading, event: false }
        }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load event',
        loading: { ...prev.loading, event: false }
      }));
    }
  }, []);

  // Set selected monastery
  const setSelectedMonastery = useCallback((monastery: Monastery | null) => {
    setState(prev => ({ ...prev, selectedMonastery: monastery }));
  }, []);

  // Set selected event
  const setSelectedEvent = useCallback((event: CulturalEvent | null) => {
    setState(prev => ({ ...prev, selectedEvent: event }));
  }, []);

  // Get directions
  const getDirections = useCallback((destination: { lat: number; lng: number }) => {
    const directionsUrl = apiService.getDirectionsUrl(destination, state.userLocation || undefined);
    window.open(directionsUrl, '_blank');
  }, [state.userLocation]);

  // Get user location
  const getUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState(prev => ({ 
        ...prev, 
        error: 'Geolocation is not supported by this browser' 
      }));
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      setState(prev => ({ 
        ...prev, 
        userLocation,
        error: null 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to get user location. Using default location (Gangtok).',
        userLocation: { lat: 27.3314, lng: 88.6138 } // Default to Gangtok
      }));
    }
  }, []);

  // Load initial data
  useEffect(() => {
    loadMonasteries();
    loadCulturalEvents();
    getUserLocation();
  }, [loadMonasteries, loadCulturalEvents, getUserLocation]);

  return {
    ...state,
    loadMonasteries,
    loadMonasteryById,
    loadNearbyMonasteries,
    setSelectedMonastery,
    loadCulturalEvents,
    loadEventById,
    setSelectedEvent,
    getDirections,
    getUserLocation,
    clearError,
  };
};