<script>
  import vgForm from '../components/Form.vue';
  import Event from '../events/all';

  import Auth from '../assets/js/Auth';
  import Alert from '../assets/js/Alert';

  export default {
    name: 'vgCard',

    components: {
      vgForm
    },

    data() {
      return {}
    },

    props: [
      'logged',
      'connected'
    ],

    // computed() {
    //   this.connected = connected;
    //   this.logged = logged;
    // },

    mounted() {
      this.auth = new Auth();
      this.alert = new Alert();

      Event.$on('auth_error', this.authError);
    },

    methods: {
      facebook() {
        if(!this.connected) return;

        this.$Progress.start();
        this.auth.facebook();
      },

      google() {
        if(!this.connected) return;

        this.$Progress.start();
        this.auth.google();
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

        this.alert.error({
          title: 'Ops!',
          text,
          btnText: 'ok'
        });

        this.$Progress.finish();
      },

      logout() {
        this.$Progress.start();
        this.auth.logout();
      }
    },

    beforeDestroy() {
      Event.$off('auth_error');
    }
  }
</script>

<template>
  <aside class="card card-wrapper">
    <header class="card-header">
      <p class="card-header-title">
        {{ $t('card.header.title') }}
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