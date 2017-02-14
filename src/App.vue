<script>
  import vgForm from './components/Form.vue';
  import vgContact from './components/Contact.vue';
  import vgMap from './components/Map.vue';

  export default {
   name: 'vgApp',

   components: {
    vgForm,
    vgContact,
    vgMap
   }
  }
</script>

<template>
  <div>
  <aside class="card card-wrapper">
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

    <vg-map></vg-map>
  </div>
</template>

<style>
  .card-wrapper {
    position: absolute;
    z-index: 10;
    bottom: 2%;
    right: 2%;
  }
</style>