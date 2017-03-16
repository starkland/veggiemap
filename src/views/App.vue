<script>
  import LocalStorage from '../assets/js/LocalStorage';
  import Network from '../assets/js/Network';
  import Alert from '../assets/js/Alert';
  import Event from '../events/all';

  import vgHeader from '../components/Header.vue';
  import vgCard from '../components/Card.vue'
  import vgMap from '../components/Map.vue';

  export default {
   name: 'vgApp',

   components: {
    vgHeader,
    vgCard,
    vgMap
   },

   data() {
    return {
      user: null,
      loading: false,
      logged: false,
      connected: true
    }
   },

   mounted() {
    this.network = new Network();
    this.alert = new Alert();
    this.storage = new LocalStorage();

    if(this.storage.get('userInfo')) {
      this.logged = true;
    } else {
      this.logged = false;
    }


    Event.$on('user_logged', this.loggedUser);
    Event.$on('user_logout', this.logoutUser);

    Event.$on('network', this.handleNetwork);
   },

   methods: {
    loggedUser(obj) {
      this.logged = true;

      this.storage.set('userInfo', obj);

      this.$Progress.finish();
    },

    logoutUser() {
      this.logged = false;

      this.storage.clear('userInfo');
      this.storage.clear('userPos');

      this.$Progress.finish();
    },

    handleNetwork(obj) {
      if(obj.status !== 'online') {
        this.connected = false;
        this.displayAlert();
      } else {
        this.connected = true;
      }
    },

    displayAlert() {
      let obj = {
        title: 'Atenção!',
        text: `Você parece está sem internet,
        verifique sua conexão.`,
        btnText: 'ok'
      };

      this.alert.info(obj);
    }
   },

   beforeDestroy() {
    Event.$off('user_logged');
    Event.$off('user_logout');

    Event.$off('network');
   }
  }
</script>

<template>
  <div>
    <vg-header :logged="logged" :connected="connected">
    </vg-header>

    <vg-map></vg-map>

    <vg-card :logged="logged" :connected="connected">
    </vg-card>
  </div>
</template>

<style lang="scss">
  @import '../assets/css/sweetalert.scss';
</style>