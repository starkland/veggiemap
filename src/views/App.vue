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

   beforeCreated() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        // this.$bindAsArray('items', db.ref(`items/${user.uid}`))
      }

      this.loading = false
    })
   },

   data() {
    return {
      user: null,
      loading: true
    }
   },

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
    },

    facebook() {
      const provider = new firebase.auth.FacebookAuthProvider();

      // signInWithRedirect
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.warn('Facebook:', result);
      }).catch(err => console.log(error))
    },

    google() {
       const provider = new firebase.auth.GoogleAuthProvider();

      // signInWithRedirect
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.warn('Google:', result);
      }).catch(err => console.log(error))
    }
   }
  }
</script>

<template>
  <div>
    <!-- <button @click="dale" class="button">Dale</button> -->
    <!-- <button @click="facebook" class="button">Facebook</button> -->
    <!-- <button @click="google" class="button">Google</button> -->

    <vg-header></vg-header>
    <vg-map></vg-map>
    <vg-card></vg-card>
  </div>
</template>

<style lang="scss"></style>