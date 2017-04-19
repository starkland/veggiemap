class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  set(value) {
    return localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    return localStorage.removeItem(this.key);
  }
}

export default LocalStorage;