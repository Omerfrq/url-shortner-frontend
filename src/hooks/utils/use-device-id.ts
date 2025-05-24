import { useState, useEffect } from 'react';

/**
 * Custom hook to get or create a unique device ID
 * @returns {string | null} The device ID or null if not available yet
 */
export function useDeviceId(): string | null {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Try to get existing deviceId from localStorage
      let id = localStorage.getItem('deviceId');

      // If no deviceId exists, create a new one
      if (!id) {
        id = generateUniqueId();
        localStorage.setItem('deviceId', id);
      }

      setDeviceId(id);
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing)
      console.error('Error accessing localStorage:', error);

      // Fallback to session-only deviceId
      const sessionId = generateUniqueId();
      setDeviceId(sessionId);
    }
  }, []);

  return deviceId;
}

/**
 * Generates a unique ID using a combination of timestamp and random values
 * @returns {string} A unique ID
 */
function generateUniqueId(): string {
  // Timestamp component for uniqueness
  const timestamp = Date.now().toString(36);

  // Random component to ensure uniqueness even if generated at the same millisecond
  const randomPart = Math.random().toString(36).substring(2, 10);

  return `${timestamp}-${randomPart}`;
}
