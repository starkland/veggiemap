<script>
  import vgHeader from '../components/Header.vue';

  export default {
   name: 'vgContact',

   components: {
    vgHeader
   }
  }
</script>

<template>
  <div>
    <vg-header></vg-header>

    <section>
      Você só pode visualizar esta página se estiver logado.
      <a>#veggiemap</a>, <a>#vuejs</a>
    </section>
  </div>
</template>

<style></style>