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
    <vg-form></vg-form>
    <vg-contact></vg-contact>
  </div>
</template>

<style></style>