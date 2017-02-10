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

      var veggieStyle = obj.StyleObj();

      var latlng = new google.maps.LatLng(lat, lng);
      var mapElement = document.getElementById('map-canvas');
      var mapOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: 'roadmap',
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        }
      };

      map = new google.maps.Map(mapElement, mapOptions);

      map.mapTypes.set('veggie_map', veggieStyle);
      map.setMapTypeId('veggie_map');

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

    function StyleObj() {
      var styles;

      styles = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#fafafa"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#79e888"},{"saturation":"-21"},{"lightness":"-31"},{"gamma":"3.95"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"color":"#fbbc45"},{"weight":"1.00"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#c5c5c5"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":"2.85"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#59bddc"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]}];

      return new google.maps.StyledMapType(styles, { name: 'Veggie Map' });
    }

    function DisplayRadius() {
      return new google.maps.Circle({
        map: map,
        radius: 200,
        fillColor: '##00D1B2',
        fillOpacity: 0.15,
        strokeOpacity: 0.51,
        strokeColor: '##00D1B2',
        strokeWeight: 1
      });
    }

    // ====

    obj = {
      Init,
      GetUserLocation,
      SuccessLocation,
      ErrorLocation,
      AddMarker,
      Geocoder,
      StyleObj
    };

    // ====

    return obj;
  }

  // MapService.$inject = [''];

  angular
    .module('Core')
    .service('MapService', MapService);
})();