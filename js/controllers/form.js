(function(){
  'use strict';

  function FormCtrl($rootScope, Firebase, MapService) {
    var vm;

    vm = this;

    // ====

    vm.veggie = veggie;
    vm.contato = contato;
    vm.addVegie = addVegie;

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

      vm.form.location = MapService.Geocoder(vm.form.address);

      return console.info(vm.form);

      Firebase.Add(vm.form);

      vm.form = {};
    }

    $rootScope.$on('veggies_updated', function(event, obj) {
      // console.warn(obj.key);
      // console.warn(obj.val());

      obj.lat = '-23.55052';
      obj.lng = '-46.633309';

      MapService.AddMarker(obj);
    });

    // ====

    Firebase.Init();
    Firebase.Listen();
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