<script>
  import vgForm from '../components/Form.vue';
  import Event from '../events/all';
  import LocalStorage from '../assets/js/LocalStorage';
  import Alert from '../assets/js/Alert';

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

      this.alert = new Alert();
      this.storage = new LocalStorage();

      Event.$on('user_logged', this.loggedUser);
      Event.$on('user_logout', this.logoutUser);
      Event.$on('auth_error', this.authError);
    },

    methods: {
      facebook() {
        this.$Progress.start();
        this.app.facebook();
      },

      google() {
        this.$Progress.start();
        this.app.google();
      },

      logout() {
        this.$Progress.start();
        this.app.logout();
      },

      loggedUser(obj) {
        this.storage.set('userInfo', obj);
        this.logged = true;

        this.$Progress.finish();
      },

      logoutUser() {
        this.logged = false;
        this.storage.clear('userInfo');
        this.$Progress.finish();
      },

      authError(obj) {
        let { code, message } = obj;
        let text = '';

        if (code === 'auth/popup-closed-by-user') {
          text = `A janela foi fechada e o login não foi realizado.`
        } else {
          console.warn(code);
        }

        this.alert.error({
          title: 'Ops!',
          text,
          btnText: 'ok'
        });

        this.$Progress.finish();
      }
    },

    beforeDestroy() {
      Event.$off('user_logged');
      Event.$off('user_logout');
      Event.$off('auth_error');
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