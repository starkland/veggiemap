<script>
  import Firebase from '../assets/js/Firebase';
  import { mapState, mapActions } from 'vuex';

  export default {
   name: 'vgForm',

   mounted() {
    let firebase = new Firebase();

    firebase.listen();
    firebase.sync();
   },

   methods: {
    onSubmitForm() {
      const payload = {
        type: 'loja',
        veggie: {
          name: 'Um nome',
          address: 'Rua ernesto de paula santos',
          location: [-1234, -5678]
        }
      }

      this.newVeggie(payload);
    },

    ...mapActions(['newVeggie'])
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
   },

   // computed: {
   //  ...mapState({
   //    form: state => console.log(state.form)
   //  })
   // }
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