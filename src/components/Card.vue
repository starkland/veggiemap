<script>
  import vgForm from '../components/Form.vue';
  import Event from '../events/all';

  export default {
    name: 'vgCard',

    components: {
      vgForm
    },

    data() {
      return {
        logged: false
      }
    },

    mounted() {
      this.app = this.$parent;
      Event.$on('user_logged', this.loggedUser);
      Event.$on('user_logout', this.logoutUser);
    },

    methods: {
      facebook() {
        this.app.facebook();
      },

      google() {
        this.app.google();
      },

      loggedUser(obj) {
        let { credential, user } = obj;

        console.info(credential);
        console.warn(user);

        this.logged = true;
      },

      logoutUser() {
        // remove do localStorage
        this.logged = false;
        console.warn('Saiu..');
      },

      logout() {
        this.app.logout();
      }
    },

    beforeDestroy() {
      Event.$off('user_logged');
      Event.$off('user_logout');
    }
  }
</script>

<template>
  <aside class="card card-wrapper">
    <header class="card-header">
      <p class="card-header-title">
        Adicionar Veggie
      </p>
    </header>

    <div class="card-content">
      <div class="content">
        <div v-if="logged">
          <vg-form></vg-form>
        </div>

        <div v-if="!logged">
          <p>Para adicionar um novo veggie, é necessário que você <br> realize o login no <b>Facebook</b> ou <b>Google</b>.</p>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <a
        v-if="!logged"
        @click="facebook"
        title="Login com Facebook"
        class="card-footer-item">
        Facebook
      </a>

      <a
        v-if="!logged"
        @click="google"
        title="Login com Google"
        class="card-footer-item">
        Google
      </a>

      <a
        v-if="logged"
        @click="logout"
        title="Sair."
        class="card-footer-item is-danger">
        Sair
      </a>
    </div>
  </aside>
</template>

<style lang="scss">
  .card-wrapper {
    position: absolute;
    z-index: 0;
    bottom: 2%;
    right: 2%;
  }

  .card {
    min-width: 50%;
  }
</style>