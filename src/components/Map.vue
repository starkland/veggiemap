<script>
  import Location from '../assets/js/Location';
  import LocalStorage from '../assets/js/LocalStorage';
  import Events from '../events/all';

  export default {
    name: 'vgMap',

    mounted() {
      this.$Progress.start();

      this.tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'VeggieMap',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGh1bGlvcGgiLCJhIjoiY2l6dGYzbzh3MDBxdDJxb2RwM3Q1dThrYSJ9.Z1gPJ1HHyF4extvmILwDOQ'
      });

      // Marker clusters
      this.markersLayer = L.markerClusterGroup({
        maxClusterRadius: 120,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });

      this.displayMap();

      // Inicia o Location
      this.Location = new Location();
      this.LocalStorage = new LocalStorage();
    },

    data() {
      return {
        veggies_array: [],
        arrayOfLatLngs: [],
        mapLoaded: null
      }
    },

    methods: {
      updateVeggies(data) {
        if (data && data.veggies !== null) {
          this.veggies_array = data.veggies;
          this.addNewMarker(this.veggies_array);
        }
      },

      addNewMarker(markerArray) {
        this.arrayOfLatLngs = [];

        markerArray.forEach((item) => {
          if (item && item.veggie) {
            // adiciona a lat/lng de cada marcador ao array
            this.arrayOfLatLngs.push([item.veggie.location[0], item.veggie.location[1]]);

            // adiciona os marcadores ao mapa
            this.buildMarker(item);
          }
        });

        this.updateMap();
      },

      buildMarker(obj) {
        let title = `<h4>${obj.veggie.name}</h4> <small>${obj.veggie.address}</small>`;

        let marker = L.marker(new L.LatLng(obj.veggie.location[0], obj.veggie.location[1]), {
          title: title,
          icon: this.buildIcon(obj.type)
        });

        marker.bindPopup(title);

        this.markersLayer.addLayer(marker);
      },

      buildIcon(type) {
        switch(type) {
          case 'evento':
            return L.AwesomeMarkers.icon({
              icon: 'star',
              markerColor: 'green',
              prefix: 'fa'
            });
          break;

          case 'fixo':
            return L.AwesomeMarkers.icon({
              icon: 'hand-o-up',
              markerColor: 'black',
              prefix: 'fa'
            });
          break;
        }
      },

      updateMap() {
        // centraliza o mapa de acordo com os marcadores
        let bounds = new L.LatLngBounds(this.arrayOfLatLngs);
        this.map.fitBounds(bounds);

        this.map.addLayer(this.markersLayer);
      },

      displayMap() {
        this.map = L.map('map-container', {
          zoom: 15,
          scrollWheelZoom: false,
          layers: [this.tiles]
        });

        window.vgMap = this.map;

        this.mapLoaded = true;

        window.vgFirebase.update();

        this.$Progress.finish();
      },

      zoomOut() {
        this.map.setZoom(3);
      },

      focusOnUser(obj) {
        console.info(obj);

        const position = obj.position;
        const latlng = L.latLng(position[0], position[1]);

        const marker = L.marker(new L.LatLng(position[0], position[1]), {
          title: 'Você está aqui'
        });

        const circle = L.circle(new L.LatLng(position[0], position[1]), {
          color: '#00D1B2',
          fillColor: '#00D1B2',
          fillOpacity: 0.5,
          radius: 500
        });

        // ====

        marker.addTo(this.map);
        marker.bindPopup(`Você está aqui!`);

        circle.addTo(this.map);

        this.map.panTo(latlng);
        this.map.setZoom(15);

        this.$Progress.finish();

        // ====

        LocalStorage.set('userPos', obj);
      },

      zoomOnMe() {
        this.$Progress.start();

        let userPos = this.LocalStorage.get('userPos');

        if(userPos) {
          this.focusOnUser({position: userPos});
        }

        this.Location.currentPosition();
      }
    },

    created() {
      Events.$on('update_veggies', this.updateVeggies);
      Events.$on('location_ok', this.focusOnUser);
    },

    beforeDestroy() {
      Events.$off('update_veggies');
      Events.$off('location_ok');
    }
  }
</script>

<template>
  <div class="map-wrapper" :class="{ 'is-loaded': mapLoaded }">
    <!-- Loading -->
    <div v-if="!mapLoaded">
      <div class="button is-loading loading-container"></div>
    </div>

    <aside class="map-controls" v-if="mapLoaded">
      <button
        @click="zoomOut"
        title="Clique para ver todos os marcadores."
        class="button is-medium btn-zoom is-info">
          <i class="fa fa-search-minus"></i>
      </button>

      <button
        @click="zoomOnMe"
        title="Clique para alterar o zoom próximo a você."
        class="button is-medium btn-zoom is-warning">
          <i class="fa fa-location-arrow"></i>
      </button>
    </aside>

    <!-- Map -->
    <div id="map-container"></div>
  </div>
</template>

<style lang="scss">
  @import '../assets/css/leaflet.awesome-markers.scss';

  $green: #00D1B2;

  .map-wrapper {
    width: 100%;
    height: calc(100% - 50px);
    position: absolute;
    z-index: 1;

    &.is-loaded {
      ~ .card-wrapper {
        z-index: 10;
      }
    }
  }

  #map-container {
    height: 100%;
  }

  .loading-container {
    width: 100%;
    height: 100%;
    background-color: $green;
    display: block;
    position: absolute;

    &::after {
      width: 10rem !important;
      height: 10rem !important;
      margin-left: -18px;
      margin-top: -18px;
      top: 40%;
    }

    transition: visibility, .25s, linear, 0s;
  }

  .map-controls {
    position: absolute;
    z-index: 2000;
    display: inline-block;
    bottom: 3%;
    left: 2%;
  }

  .btn-zoom {
    border-radius: 100%;
    width: 50px;
    height: 50px;
  }
</style>