<script>
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
    },

    data() {
      return {
        veggies_array: [],
        arrayOfLatLngs: [],
        mapLoaded: null
      }
    },

    methods: {
      updateVeggie(data) {
        this.addNewMarker(data.veggies_array);
      },

      updateVeggies(data) {
        if (data && data.veggies !== null) {

          for (let item in data.veggies) {
            this.veggies_array.push(data.veggies[item]);
          }

          this.addNewMarker(this.veggies_array);
        }
      },

      addNewMarker(markerArray) {
        this.map.removeLayer(this.markersLayer);

        markerArray.forEach((item) => {
          if (item && item.veggie) {
            // adiciona a lat/lng de cada marcador ao array
            this.arrayOfLatLngs.push([item.veggie.location[0], item.veggie.location[1]]);

            // adiciona os marcadores ao mapa
            let title = `<h4>${item.veggie.name}</h4> <small>${item.veggie.address}</small>`;

            let marker = L.marker(new L.LatLng(item.veggie.location[0], item.veggie.location[1]), {
              title: title,
              icon: this.buildIcon(item.type)
            });

            marker.bindPopup(title);
            this.markersLayer.addLayer(marker);
          }
        });

        // centraliza o mapa seguindo os marcadores
        let bounds = new L.LatLngBounds(this.arrayOfLatLngs);
        this.map.fitBounds(bounds);

        this.map.addLayer(this.markersLayer);
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

      displayMap(obj) {
        const position = obj.position;
        const latlng = L.latLng(position[0], position[1]);

        this.map = L.map('map-container', {
          center: latlng,
          zoom: 15,
          scrollWheelZoom: false,
          layers: [this.tiles]
        });

        window.vgMap = this.map;

        this.mapLoaded = true;

        window.vgFirebase.update();

        this.$Progress.finish();
      }
    },

    created() {
      Events.$on('location_ok', this.displayMap);
      Events.$on('new_veggie', this.updateVeggie);
      Events.$on('update_veggies', this.updateVeggies);
    },

    beforeDestroy() {
      Events.$off('new_veggie');
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

    <!-- Map -->
    <div id="map-container"></div>
  </div>
</template>

<style lang="scss">
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
    background: red;
    display: inline-block;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
  }
</style>