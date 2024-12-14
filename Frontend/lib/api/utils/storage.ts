// utils/storage.ts

// Utility functions for managing localStorage

/**
 * Sets an item in localStorage.
 * @param key - The key to store the value under.
 * @param value - The value to store, which will be stringified.
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`);
  }
};

/**
 * Gets an item from localStorage.
 * @param key - The key to retrieve the value for.
 * @returns The parsed value, or null if not found or an error occurs.
 */
export const getItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return null;
  }
};

/**
 * Removes an item from localStorage.
 * @param key - The key to remove.
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
  }
};

/**
 * Clears all items from localStorage.
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};
