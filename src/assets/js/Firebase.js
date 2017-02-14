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
  }

  add(obj) {
    let setObj = {
      name: obj.name,
      address: obj.address,
      location: obj.location,
      type: obj.type,
      created_at : Date.now()
    };

    return this.db.ref('veggies/' + obj.id).set(setObj);
  }

  listen() {
    this.db.ref('veggies/').on('child_added', (data) => console.warn(data));
  }

  sync() {
    this.db.ref('veggies/').once('value', (snapshot) => this.snapshot(snapshot));
  }

  snapshot(data) {
    return data.forEach((item) => console.info(item.val()));
  }
}

export default Firebase;