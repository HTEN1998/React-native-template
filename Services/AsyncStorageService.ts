/**
 * A generic, type-safe wrapper around React Native's AsyncStorage.
 * Usage (works in any functional component or hook):
 *   import AsyncStorageService from '../services/AsyncStorageService';
 *
 *   await AsyncStorageService.setItem<User>('user', userObject);
 *   const user = await AsyncStorageService.getItem<User>('user');
 *   await AsyncStorageService.removeItem('user');
 *   await AsyncStorageService.clear();
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  
  static async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`[AsyncStorageService] setItem failed for key "${key}":`, error);
      return false;
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`[AsyncStorageService] getItem failed for key "${key}":`, error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[AsyncStorageService] removeItem failed for key "${key}":`, error);
      return false;
    }
  }

  static async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('[AsyncStorageService] clear failed:', error);
      return false;
    }
  }
}

export default AsyncStorageService;
