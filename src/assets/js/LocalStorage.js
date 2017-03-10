class LocalStorage {
  constructor() {}

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value, session) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear(key) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;