<script>
  import vgForm from '../components/Form.vue';

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

    props: {
      logged: {
        type: Boolean,
        require: true
      },

      connected: {
        type: Boolean,
        require: true
      },
    },

    mounted() {
      this.auth = new Auth();
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

      logout() {
        this.$Progress.start();
        this.auth.logout();
      }
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
          <p>{{ $t('card.content.cta') }}</p>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <a
        v-if="!logged"
        @click="facebook"
        :title="$t('card.footer.facebook')"
        class="card-footer-item">
        Facebook
      </a>

      <a
        v-if="!logged"
        @click="google"
        :title="$t('card.footer.google')"
        class="card-footer-item">
        Google
      </a>

      <a
        v-if="logged"
        @click="logout"
        :title="$t('card.footer.logout')"
        class="card-footer-item is-danger">

        {{ $t('card.footer.logout') }}
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
    max-width: 70%;
  }
</style>