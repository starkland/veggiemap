<script>
  import Vue from 'vue';

  import Firebase from '../assets/js/Firebase.js';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  let eventHub = new Vue();
  window.vgEventHub = eventHub;

  let firebase = new Firebase();
  firebase.listen();
  window.vgFirebase = firebase;

  export default {
   name: 'vgApp',

   created() {
    window.vgFirebase.update();
   },

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