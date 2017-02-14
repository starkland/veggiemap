<script>
  import Firebase from '../assets/js/Firebase';

  export default {
   name: 'vgForm',

   mounted() {
    let firebase = new Firebase();

    firebase.listen();
    firebase.sync();
   },

   methods: {
    onSubmitForm() {
      console.warn(this.$data);
    }
   },

   data() {
    return {
      form: {
        type: '',
        veggie: {
          name: '',
          address: ''
        }
      }
    }
   }
  }
</script>

<template>
  <div>
    <form @submit.prevent="onSubmitForm">
      <div class="control is-horizontal">
        <div class="control-label">
          <label for="name" class="label">Nome</label>
        </div>

        <div class="control is-grouped">
          <p class="control is-expanded">
            <input
              id="name"
              class="input"
              type="text"
              v-model="form.veggie.name"
              placeholder="Nome do Veggie">
          </p>
        </div>
      </div>

      <div class="control is-horizontal">
        <div class="control-label">
          <label for="address" class="label">Endereço</label>
        </div>

        <div class="control is-grouped">
          <p class="control is-expanded">
            <input
              id="address"
              class="input"
              type="text"
              v-model="form.veggie.address"
              placeholder="Endereço do Veggie">
          </p>
        </div>
      </div>

      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="type"
            v-model="form.type"
            value="evento">

            Evento
        </label>

        <label class="radio">
          <input
            type="radio"
            name="type"
            v-model="form.type"
            value="fixo">

            Fixo
        </label>
      </div>

      <div class="control">
        <button type="submit" class="button is-primary">Pronto</button>
      </div>
    </form>
  </div>
</template>

<style></style>