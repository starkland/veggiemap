import Events from '../../events/all';

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

  addVeggie(obj) {
    obj.form.created_at = new Date().getTime();
    obj.user.created_at = obj.form.created_at;

    this.db.ref(`veggies/${obj.form.id}`).set(obj.form);
    this.db.ref(`users/${obj.user.id}`).set(obj.user);
  }

  listen() {
    this.db.ref('veggies').on('child_added', (snapshot) => this.snapshot(snapshot));
  }

  update() {
    this.db.ref('veggies').on('value', (snapshot) => this.snapshot(snapshot));
  }

  snapshot(data) {
    if (data.val()) {
      if (Object.keys(data.val()).length > 0 && Object.keys(data.val())[0] !== 'created_at') {
        let obj = data.val();

        this.veggies = [];

        for (let item in obj) {
          this.veggies.push(obj[item]);
        }
      }
    }

    this.dispatchEvent(this.veggies);
  }

  dispatchEvent(data) {
    if (data.length > 0) {
      Events.$emit('update_veggies', { veggies: data });
    }
  }
}

export default Firebase;