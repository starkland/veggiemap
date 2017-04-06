<script>
  import Vue from 'vue';

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
    this.storage = new LocalStorage();

    if(this.storage.get('userInfo')) {
      this.logged = true;
    } else {
      this.logged = false;
    }

    Event.$on('auth_error', this.authError);
    Event.$on('network', this.handleNetwork);
    Event.$on('user_logged', this.loggedUser);
    Event.$on('user_logout', this.logoutUser);
    Event.$on('change_language', this.handleLanguage);
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
      this.alert = new Alert({
        title: 'Atenção!',
        text: `Você parece está sem internet,
        verifique sua conexão.`,
        btnText: 'ok'
      });

      this.alert.info();
    },

    handleLanguage(lang) {
      Vue.config.lang = lang;
    },

    authError(obj) {
      let { code, message } = obj;
      let text = '';

      switch(code) {
        case 'auth/popup-closed-by-user':
          text = `A janela foi fechada e o login não foi realizado.`
        break;

        case 'auth/cancelled-popup-request':
          text = `A janela foi fechada e o login não foi realizado.`
        break;

        case 'auth/popup-blocked':
          text = `Seu navegador está bloqueando o pop-up.`
        break;

        case 'auth/operation-not-allowed':
          text = `Esta operação não é permitida.`
        break;

        case 'auth/account-exists-with-different-credential':
          text = `Por favor, refaça o seu login com a outra rede social.`
        break;

        default:
          console.warn(code);
        break;
      }

      this.alert = new Alert({
        title: 'Ops!',
        text,
        btnText: 'ok'
      });

      this.alert.error();

      this.$Progress.finish();
    }
   },

   beforeDestroy() {
      Event.$off('auth_error');
      Event.$off('network');
      Event.$off('user_logged');
      Event.$off('user_logout');
      Event.$off('change_language');
   }
  }
</script>

<template>
  <div>
    <vg-header :logged="logged" :connected="connected">
    </vg-header>

    <vg-map :connected="connected">
    </vg-map>

    <vg-card :logged="logged" :connected="connected">
    </vg-card>
  </div>
</template>

<style lang="scss">
  @import '../assets/css/sweetalert.scss';
</style>