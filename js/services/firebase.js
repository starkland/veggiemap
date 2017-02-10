(function(){
  'use strict';

  function Firebase($rootScope) {
    var obj, db, markersArray;

    markersArray = [];

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
      db = firebase.database();

      obj.Listen();
      obj.GetLastData('veggies');
    }

    function Add(obj) {
      db.ref('veggies/' + obj.id).set({
        name: obj.name,
        address: obj.address,
        // location: obj.location,
        type: obj.type,
        created_at : Date.now()
      });
    }

    function Listen() {
      db.ref('veggies/').on('child_added', function(data) {
        if (data) {
          return $rootScope.$emit('veggies_updated', data);
        }
      });
    }

    function GetLastData(database) {
      return db.ref(database).once('value', function(snapshot) {
        snapshot.forEach(function(item) {
          markersArray.push(item.val().location);
        });
      });
    }


    // ====

    obj = {
      Init,
      Add,
      Listen,
      GetLastData
    };

    // ====

    return obj;
  }

  Firebase.$inject = ['$rootScope'];

  angular
    .module('Core')
    .service('Firebase', Firebase);
})();