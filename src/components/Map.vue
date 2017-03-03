<script>
  export default {
    name: 'vgMap',

    mounted() {
      let tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'VeggieMap',
        maxZoom: 13,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGh1bGlvcGgiLCJhIjoiY2l6dGYzbzh3MDBxdDJxb2RwM3Q1dThrYSJ9.Z1gPJ1HHyF4extvmILwDOQ'
      });

      let latlng = L.latLng(50.5, 30.51);

      // Marker clusters
      this.markersLayer = L.markerClusterGroup({
        maxClusterRadius: 120,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });

      this.map = L.map('map-container', {
        center: latlng,
        zoom: 15,
        scrollWheelZoom: false,
        layers: [tiles, this.markersLayer]
      });
    },

    data() {
      return {
        veggies_array: [],
        arrayOfLatLngs: []
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
            // add the lat/lng of each marker to array
            this.arrayOfLatLngs.push([item.veggie.location[0], item.veggie.location[1]]);

            // add markers on map
            this.markersLayer.addLayer(L
              .marker([item.veggie.location[0], item.veggie.location[1]])
              .addTo(this.map)
              .bindPopup(`<h4>${item.veggie.name}</h4>
                  <small>${item.veggie.address}</small>`)
              .openPopup());
          }
        });

        let bounds = new L.LatLngBounds(this.arrayOfLatLngs);
        this.map.fitBounds(bounds);
      }
    },

    created() {
      this.vgEventHub = window.vgEventHub;

      this.vgEventHub.$on('new_veggie', this.updateVeggie);
      this.vgEventHub.$on('update_veggies', this.updateVeggies);
    },

    beforeDestroy() {
      this.vgEventHub.$off('new_veggie');
      this.vgEventHub.$off('update_veggies');
    }
  }
</script>

<template>
  <div class="map-container">
    <div id="map-container"></div>
  </div>
</template>

<style>
  .map-container {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: pink;
  }

  #map-container {
    height: 100%;
  }
</style>