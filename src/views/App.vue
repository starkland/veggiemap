<script>
  import Location from '../assets/js/Location';
  import Auth from '../assets/js/Auth';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  let location = new Location();
  location.currentPosition();
  window.vgLocation = location;

  export default {
   name: 'vgApp',

   data() {
    return {
      user: null,
      loading: false,
      logged: null
    }
   },

   mounted() {
    this.auth = new Auth();
   },

   components: {
    vgHeader,
    vgCard,
    vgMap
   },

   methods: {
    facebook() {
      this.auth.facebook();
    },

    google() {
      this.auth.google();
    },

    logout() {
      this.auth.logout();
    }
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