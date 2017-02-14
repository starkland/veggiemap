<script>
  import vgForm from './components/Form.vue';
  import vgContact from './components/Contact.vue';

  export default {
   name: 'vgApp',

   mounted() {},

   methods: {},

   components: {
    vgForm,
    vgContact
   },

   computed: {}
  }
</script>

<template>
  <div>

    <aside class="card">
      <header class="card-header">
        <p class="card-header-title">
          Veggie Map
        </p>
      </header>

      <div class="card-content">
        <div class="content">
          <vg-form></vg-form>
          <vg-contact></vg-contact>
        </div>
      </div>

      <footer class="card-footer">
        <a class="card-footer-item">Adicionar</a>
        <a class="card-footer-item">Contato</a>
      </footer>
    </aside>
  </div>
</template>

<style></style>