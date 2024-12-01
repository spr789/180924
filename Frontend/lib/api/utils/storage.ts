const PREFIX = 'app:';

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  set(key: string, value: any): void {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear(): void {
    localStorage.clear();
  }
};