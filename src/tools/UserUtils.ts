import { randomUUID } from 'crypto';

class UserUtils {
  // Store server-side generated IDs
  private static serverSideIds = new Map<string, string>();
  
  static getUserDeviceId(sessionId?: string): string {
    // Check if running in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      // Browser environment
      let userDeviceId = window.localStorage.getItem('userDeviceId');
      if (userDeviceId === null) {
        userDeviceId = randomUUID();
        window.localStorage.setItem('userDeviceId', userDeviceId);
      }
      return userDeviceId;
    } else {
      // Server environment
      if (!sessionId) {
        // Generate a temporary ID if no session ID is provided
        return randomUUID();
      }
      
      // Use the session ID to get a consistent device ID for the user
      if (!this.serverSideIds.has(sessionId)) {
        this.serverSideIds.set(sessionId, randomUUID());
      }
      
      return this.serverSideIds.get(sessionId) as string;
    }
  }
}

export default UserUtils;