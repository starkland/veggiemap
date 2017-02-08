(function(){
  'use strict';

  function Firebase($rootScope) {
    var obj, db;

    // ====

    function Init() {
      var config = {
        apiKey: "AIzaSyCewtn3iS76Cw8N3JAlY-_I9Do92cdtxRw",
        authDomain: "form-location-jsday-recife.firebaseapp.com",
        databaseURL: "https://form-location-jsday-recife.firebaseio.com",
        storageBucket: "form-location---jsday-recife.appspot.com",
        messagingSenderId: "43232483561"
      };

      firebase.initializeApp(config);

      db = obj.InitDatabase();
    }

    function Add(obj) {
      db.ref('veggies/' + obj.id).set({
        name: obj.name,
        address: obj.address,
        location: obj.location,
        type: obj.type,
        created_at : Date.now()
      });
    }

    function InitDatabase() {
      return firebase.database();
    }

    function Listen() {
      var veggies = db.ref('veggies/');

      veggies.on('child_added', function(data) {
        if (data) {
          return $rootScope.$emit('veggies_updated', data);
        }
      });
    }

    // ====

    obj = {
      Init,
      Add,
      InitDatabase,
      Listen
    };

    // ====

    return obj;
  }

  Firebase.$inject = ['$rootScope'];

  angular
    .module('Core')
    .service('Firebase', Firebase);
})();