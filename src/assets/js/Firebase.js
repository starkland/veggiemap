class Firebase {
  constructor() {
    this.config = {
      apiKey: "AIzaSyCewtn3iS76Cw8N3JAlY-_I9Do92cdtxRw",
      authDomain: "form-location-jsday-recife.firebaseapp.com",
      databaseURL: "https://form-location-jsday-recife.firebaseio.com",
      storageBucket: "form-location---jsday-recife.appspot.com",
      messagingSenderId: "43232483561"
    }

    firebase.initializeApp(this.config);

    this.db = firebase.database();

    this.veggies = [];
  }

  add(obj) {
    obj.created_at = new Date().getTime();
    obj.id = new Date().getTime() + 1;

    return this.db.ref(`veggies/${obj.id}`).set(obj);
  }

  listen() {
    this.db.ref('veggies').on('child_added', (snapshot) => this.snapshot(snapshot));
  }

  snapshot(data) {
    return data.forEach((item) => item.val())
    // return this.veggies.push(data.val());
  }
}

export default Firebase;