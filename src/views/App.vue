<script>
  import Location from '../assets/js/Location';
  import Alert from '../assets/js/Alert';
  import Auth from '../assets/js/Auth';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  let location = new Location();
  location.currentPosition();
  window.vgLocation = location;

  export default {
   name: 'vgApp',

   beforeCreated() {
    firebase.auth().onAuthStateChanged((user) => {
      console.info(user);

      if (user) {
        this.user = user
        // this.$bindAsArray('items', db.ref(`items/${user.uid}`))
      }

      this.loading = false
    });
   },

   data() {
    return {
      user: null,
      loading: false,
      logged: null
    }
   },

   mounted() {
    this.alert = new Alert();
    this.auth = new Auth();
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
    },

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