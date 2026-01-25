// Simple notification system for user feedback
import { toast } from 'sonner';

export const showNotification = {
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
  },

  info: (message: string) => {
    toast.info(message, {
      duration: 3000,
      position: 'top-right',
    });
  },

  warning: (message: string) => {
    toast.warning(message, {
      duration: 3500,
      position: 'top-right',
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      duration: Infinity,
      position: 'top-right',
    });
  },

  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  }
};

// Common notification messages
export const notifications = {
  directions: {
    opening: 'Opening directions in Google Maps...',
    opened: 'Directions opened successfully!',
    failed: 'Failed to open directions. Please try again.'
  },
  location: {
    requesting: 'Requesting your location...',
    granted: 'Location access granted!',
    denied: 'Location access denied. Using default location.',
    failed: 'Failed to get location. Using Gangtok as default.'
  },
  monastery: {
    loading: 'Loading monastery details...',
    loaded: 'Monastery details loaded!',
    failed: 'Failed to load monastery details.'
  },
  event: {
    loading: 'Loading event details...',
    loaded: 'Event details loaded!',
    failed: 'Failed to load event details.'
  },
  phone: {
    calling: 'Opening phone app...',
    called: 'Phone app opened!',
    failed: 'Failed to open phone app.'
  }
};
