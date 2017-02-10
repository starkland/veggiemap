(function(){
  'use strict';

  function FormCtrl($rootScope, Firebase, MapService) {
    var vm;

    vm = this;

    // ====

    vm.veggie = veggie;
    vm.contato = contato;
    vm.addVegie = addVegie;

    vm.searchByAddress = searchByAddress;

    vm.form = {
      type: {}
    };

    // ====

    function veggie() {
      vm.isForm = true;
      vm.isContact = false;
    }

    function contato() {
      vm.isContact = true;
      vm.isForm = false;
    }

    function addVegie() {
      vm.form.id = Date.now();

      Firebase.Add(vm.form);

      vm.form = {};
    }

    function searchByAddress() {
      var input, address;

      input = document.getElementById('address');
      address = vm.form.address;

      MapService.Geocoder(input, address);
    }

    $rootScope.$on('veggies_updated', function(event, obj) {
      MapService.AddMarker(obj.val());
    });

    $rootScope.$on('place', function(event, data) {
      vm.form.location = data;
    });

    // ====

    Firebase.Init();
  }

  FormCtrl.$inject = [
    '$rootScope',
    'Firebase',
    'MapService'
  ];

  angular
    .module('Form')
    .controller('FormCtrl', FormCtrl);
})();