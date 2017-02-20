<script>
  import Firebase from '../assets/js/Firebase';
  import GMaps from '../assets/js/GoogleMaps';

  import { mapState, mapActions } from 'vuex';

  export default {
   name: 'vgForm',

   mounted() {
    let firebase = new Firebase();
    this.veggies = firebase.listen();
   },

   methods: {
    onSubmitForm() {
      let gmaps = new GMaps(this.form.address);
      gmaps.geocode();

      // retorna os resultados pesquisados
      return console.warn(gmaps.results);

      // this.form.location = gmaps.results;
      // console.warn(this.form);
      // this.newVeggie(this.form);
      this.form = {};
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

   computed: {
    ...mapState({
      formData: state => state.form
    })
   }
  }
</script>

<template>
  <div>
    <h1>form -> {{formData}}</h1>
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