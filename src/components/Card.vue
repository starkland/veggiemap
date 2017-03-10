<script>
  import vgForm from '../components/Form.vue';

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

    methods: {
      facebook() {
        console.warn('facebook');
        this.logged = true;
      },

      google() {
        console.warn('google');
        this.logged = true;
      }
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
        @click="facebook"
        title="Login com Facebook"
        class="card-footer-item">
        Facebook
      </a>

      <a
        @click="google"
        title="Login com Google"
        class="card-footer-item">
        Google
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