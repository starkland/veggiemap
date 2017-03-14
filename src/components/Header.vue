<script>
  import Event from '../events/all';
  import Alert from '../assets/js/Alert';
  import LocalStorage from '../assets/js/LocalStorage';

  export default {
    name: 'Header',

    methods: {
      toggleNavbar() {
        this.navActive = !this.navActive;
      },

      handleNetwork(obj) {
        this.networkStatus = obj.status;

        if(obj.status !== 'online') {
          let obj = {
            title: 'Atenção!',
            text: `Você parece está sem internet,
            verifique sua conexão.`,
            btnText: 'ok'
          };

          this.alert.info(obj);
        }
      },

      loggedUser() {
        this.logged = true;
      },

      logoutUser() {
        this.logged = false;
      }
    },

    mounted() {
      this.alert = new Alert();
      this.storage = new LocalStorage();

      if(this.storage.get('userInfo')) {
        this.logged = true;
      }

      Event.$on('network', this.handleNetwork);
      Event.$on('user_logged', this.loggedUser);
      Event.$on('user_logout', this.logoutUser);
    },

    data() {
      return {
        navActive: false,
        networkStatus: null,
        logged: false
      }
    },

    beforeDestroy() {
      Event.$off('network');
      Event.$off('user_logged');
      Event.$off('user_logout');
    }
  }
</script>

<template>
  <nav class="nav" :class="networkStatus">
    <div class="nav-left">
      <a class="nav-item">
        Veggie Map
      </a>
    </div>

    <div class="nav-center">
      <a
        class="nav-item"
        href="https://twitter.com/intent/tweet?text=Veggiemap%20on%20Github%20http://github.com/starkland/veggiemap"
        rel="noopener"
        title="Doe um Tweet :)"
        target="_blank">

        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>

      <a
        class="nav-item"
        href="https://github.com/starkland/veggiemap"
        rel="noopener"
        title="Veja o projeto no Github!"
        target="_blank">

        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
    </div>

    <span
      class="nav-toggle"
      @click="toggleNavbar"
      :class="{ 'is-active' : this.navActive }">

      <span></span>
      <span></span>
      <span></span>
    </span>

    <div
      class="nav-right nav-menu"
      v-if="logged"
      :class="{ 'is-active' : this.navActive }">

      <router-link
        class="nav-item"
        title="Home"
        to="/"
        exact>

        Home
      </router-link>

      <router-link
        class="nav-item"
        title="Contato"
        to="/contato"
        exact>

        Contato
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss">
  $white: #FFFFFF;
  $green: #00D1B2;

  .router-link-active {
    background-color: $green;
    border-color: transparent;
    color: $white !important;
  }
</style>