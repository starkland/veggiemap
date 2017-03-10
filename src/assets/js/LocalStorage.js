class LocalStorage {
  constructor() {}

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value, session) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }
}

export default LocalStorage;