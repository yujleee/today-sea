export const store = {
  setLocalStorage(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
  },

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};
