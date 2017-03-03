<script>
  export default {
    name: 'vgMap',

    mounted() {
      this.map = L.map('map-container').setView([51.505, -0.09], 13);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'VeggieMap',
        maxZoom: 13,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGh1bGlvcGgiLCJhIjoiY2l6dGYzbzh3MDBxdDJxb2RwM3Q1dThrYSJ9.Z1gPJ1HHyF4extvmILwDOQ'
      }).addTo(this.map);

      this.map.scrollWheelZoom.disable();
    },

    data() {
      return {
        veggies_array: []
      }
    },

    methods: {
      updateVeggie(data) {
        this.veggies_array = data.veggies_array;

        for(let item of data.veggies_array) {
          L
            .marker([item.veggie.location[0], item.veggie.location[1]])
            .addTo(this.map)
            .bindPopup(`<h4>${item.veggie.name}</h4>
                <small>${item.veggie.address}</small>`)
            .openPopup();
        }
      },

      updateVeggies(data) {
        let { veggie } = Object.values(data.veggies)[0];

        L
          .marker([veggie.location[0], veggie.location[1]])
          .addTo(this.map)
          .bindPopup(`<h4>${veggie.name}</h4>
              <small>${veggie.address}</small>`)
          .openPopup();

        // this.veggies_array.push(data.veggies);
        // console.warn(this.veggies_array[0]);
      }
    },

    created() {
      window.vgEventHub.$on('new_veggie', this.updateVeggie);
      window.vgEventHub.$on('update_veggies', this.updateVeggies);
    },

    beforeDestroy() {
      window.vgEventHub.$off('new_veggie');
      window.vgEventHub.$off('update_veggies');
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