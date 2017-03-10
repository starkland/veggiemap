<script>
  import Location from '../assets/js/Location';
  import Alert from '../assets/js/Alert';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  let location = new Location();
  location.currentPosition();
  window.vgLocation = location;

  export default {
   name: 'vgApp',

   mounted() {
    this.alert = new Alert();
   },

   components: {
    vgHeader,
    vgCard,
    vgMap
   },

   methods: {
    dale() {
      this.alert.success({
        title: 'DALE',
        text: 'Aqui vem a mensagem',
        btnText: 'Cool'
      })
    }
   }
  }
</script>

<template>
  <div>
    <button @click="dale" class="button">Dale</button>
    <!-- <vg-header></vg-header> -->
    <!-- <vg-map></vg-map> -->
    <!-- <vg-card></vg-card> -->
  </div>
</template>

<style lang="scss"></style>