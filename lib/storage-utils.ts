// Safe localStorage wrapper to prevent errors in environments where localStorage is not available
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key)
      }
      return null
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return null
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value)
      }
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },
}
