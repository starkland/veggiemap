class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  get() {
    JSON.parse(localStorage.getItem(this.key));
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

export default LocalStorage;