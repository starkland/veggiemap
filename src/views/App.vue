<script>
  import Vue from 'vue';

  import Firebase from '../assets/js/Firebase.js';
  import Location from '../assets/js/Location.js';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  let eventHub = new Vue();
  window.vgEventHub = eventHub;

  let firebase = new Firebase();
  firebase.listen();
  window.vgFirebase = firebase;

  let location = new Location();
  location.currentPosition();
  window.vgLocation = location;

  export default {
   name: 'vgApp',

   components: {
    vgHeader,
    vgCard,
    vgMap
   }
  }
</script>

<template>
  <div>
    <vg-header></vg-header>
    <vg-map></vg-map>
    <vg-card></vg-card>
  </div>
</template>

<style lang="scss"></style>