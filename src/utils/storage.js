const storage = {
  // Save data
  set(key, value, remember = true) {
    try {
      const target = remember ? localStorage : sessionStorage;
      target.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Unable to save data:", error);
      return false;
    }
  },

  // Retrieve data
  get(key, fallback = null) {
    try {
      const value =
        localStorage.getItem(key) ?? sessionStorage.getItem(key);

      return value !== null ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error("Unable to retrieve data:", error);
      return fallback;
    }
  },

  // Remove data from both storage locations
  remove(key) {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Unable to remove data:", error);
      return false;
    }
  },

  // Clear all application data from both storage locations
  clear() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error("Unable to clear storage:", error);
      return false;
    }
  },
};

export default storage;