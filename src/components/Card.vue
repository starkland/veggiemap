<script>
  import vgForm from '../components/Form.vue';

  export default {
    name: 'vgCard',

    components: {
      vgForm
    },

    methods: {
      byType(type) {
        console.warn(type);
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
        <vg-form></vg-form>
      </div>
    </div>

    <div class="card-footer">
      <!-- <a @click="byType('eventos')" class="card-footer-item">
        apenas eventos
      </a> -->

      <!-- <a @click="byType('fixos')" class="card-footer-item">
        apenas fixos
      </a> -->
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