(function(){
  'use strict';

  function MapCtrl(MapService) {
    let map = document.getElementById('map-canvas');

    MapService.Init();
  }

  MapCtrl.$inject = ['MapService'];

  angular
    .module('Map')
    .controller('MapCtrl', MapCtrl);
})();