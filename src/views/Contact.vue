<script>
  import LocalStorage from '../assets/js/LocalStorage';
  import Network from '../assets/js/Network';
  import Alert from '../assets/js/Alert';
  import Event from '../events/all';

  import vgHeader from '../components/Header.vue';

  export default {
   name: 'vgContact',

   components: {
    vgHeader
   },

   data() {
    return {
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

    Event.$on('user_logged', this.loggedUser);
    Event.$on('user_logout', this.logoutUser);

    Event.$on('network', this.handleNetwork);
   },

   methods: {
    loggedUser(obj) {
      this.logged = true;
    },

    logoutUser() {
      this.logged = false;
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

    beforeDestroy() {
      Event.$off('user_logged');
      Event.$off('user_logout');

      Event.$off('network');
    }
   }
  }
</script>

<template>
  <div>
    <vg-header :logged="logged" :connected="connected"></vg-header>

    <section>
      Você só pode visualizar esta página se estiver logado.
      <a>#veggiemap</a>, <a>#vuejs</a>
    </section>
  </div>
</template>

<style></style>