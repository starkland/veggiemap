<script>
  import Location from '../assets/js/Location';
  import LocalStorage from '../assets/js/LocalStorage';
  import Events from '../events/all';
  import VgMap from '../assets/js/Map';

  export default {
    name: 'vgMap',

    mounted() {
      this.$Progress.start();

      this.vgmap = new VgMap('map-container');
      this.displayMap();

      this.location = new Location();
      this.storage = new LocalStorage('userPos');
    },

    data() {
      return {
        veggies_array: [],
        arrayOfLatLngs: [],
        mapLoaded: null
      }
    },

    props: {
      connected: {
        type: Boolean,
        require: true
      },
    },

    methods: {
      updateVeggies(data) {
        const veggies = data.veggies;

        if (veggies && veggies.length > 0) {
          this.vgmap.addMarker(veggies);
        }
      },

      displayMap() {
        this.vgmap.display();

        this.mapLoaded = true;

        window.vgFirebase.update();

        this.$Progress.finish();
      },

      zoomOut() {
        this.vgmap.zoomOut();
      },

      zoomOnMe() {
        this.$Progress.start();

        let userPos = this.storage.get();

        if (userPos && userPos !== undefined) {
          this.vgmap.focusOnUser(userPos.position);

          this.storage.set(userPos);

          this.$Progress.finish();
        }
      },

      handleNetwork(obj) {
        if (obj.status !== 'online') {
          this.vgmap.setMap('offline');
        } else {
          this.vgmap.setMap('online');
        }
      }
    },

    created() {
      Events.$on('update_veggies', this.updateVeggies);
      Events.$on('network', this.handleNetwork);
    },

    beforeDestroy() {
      Events.$off('update_veggies');
      Events.$off('network');
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
        :disabled="!connected"
        title="Clique para ver todos os marcadores."
        class="button is-medium btn-zoom is-info">
          <i class="fa fa-search-minus"></i>
      </button>

      <button
        @click="zoomOnMe"
        :disabled="!connected"
        title="Clique para alterar o zoom próximo a você."
        class="button is-medium btn-zoom is-warning">
          <i class="fa fa-location-arrow"></i>
      </button>
    </aside>

    <!-- Map -->
    <div id="map-container">
    </div>
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