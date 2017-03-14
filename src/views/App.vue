<script>
  import Network from '../assets/js/Network';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  export default {
   name: 'vgApp',

   data() {
    return {
      user: null,
      loading: false
    }
   },

   mounted() {
    this.network = new Network();
   },

   components: {
    vgHeader,
    vgCard,
    vgMap
   },

   methods: {}
  }
</script>

<template>
  <div>
    <vg-header></vg-header>
    <vg-map></vg-map>
    <vg-card></vg-card>
  </div>
</template>

<style lang="scss">
  @import '../assets/css/sweetalert.scss';
</style>