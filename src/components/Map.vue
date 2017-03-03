<script>
  export default {
    name: 'vgMap',

    data() {
      return {
        veggies_array: []
      }
    },

    methods: {
      updateVeggie(veggie) {
        this.veggies_array.push(veggie);
      },

      updateVeggies(veggie) {
        this.veggies_array.push(veggie);
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
    <h1>Aqui vem o mapa., {{veggies_array}}</h1>
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
</style>