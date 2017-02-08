(function(){
  'use strict';

  function MapService() {
    var obj, map, infowindow, geocoder, marker;

    // ====

    function Init() {
      return this.GetUserLocation();
    }

    function GetUserLocation() {
      return navigator.geolocation ? _success() : _error();

      function _success() {
        navigator.geolocation.getCurrentPosition(obj.SuccessLocation, obj.ErrorLocation);
      }

      function _error() {
        console.error('Não suportado.')
      }
    }

    function SuccessLocation(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      var latlng = new google.maps.LatLng(lat, lng);
      var mapElement = document.getElementById('map-canvas');
      var mapOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: 'roadmap'
      };

      map = new google.maps.Map(mapElement, mapOptions);

      infowindow = new google.maps.InfoWindow;
      geocoder = new google.maps.Geocoder();
    }

    function ErrorLocation(err) {
      return console.error(err);
    }

    function AddMarker(obj) {
      var latLng;

      latLng = new google.maps.LatLng(obj.lat, obj.lng);

      map.setCenter(latLng);

      marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: {
          url: '../../images/' + obj.val().type + '.svg'
        }
      });

      infowindow.setContent(obj.val().address);
      infowindow.open(map, marker);
    }

    function Geocoder(address) {
      // address
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            console.log(results[1]);
            // obj.AddMarker(results[1]);
            // map.setZoom(11);
            // marker = new google.maps.Marker({
            //   position: latlng,
            //   map: map
            // });
            // infowindow.setContent(results[1].formatted_address);
            // infowindow.open(map, marker);
          } else {
            alert('Sem resultados..');
          }
        } else {
          alert('Geocoder falhou por conta de: ' + status);
        }
      });
    }

    // ====

    obj = {
      Init,
      GetUserLocation,
      SuccessLocation,
      ErrorLocation,
      AddMarker,
      Geocoder
    };

    // ====

    return obj;
  }

  // MapService.$inject = [''];

  angular
    .module('Core')
    .service('MapService', MapService);
})();