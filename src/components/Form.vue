<script>
  import Firebase from '../assets/js/Firebase';
  import GMaps from '../assets/js/GoogleMaps';

  export default {
   name: 'vgForm',

   mounted() {
    // this.firebase = new Firebase();
    // this.firebase.listen();
   },

   methods: {
    onSubmitForm() {
      // let gmaps = new GMaps(this.form.address);
      // gmaps.geocode();

      this.form.veggie.location = [-123, 321];

      // this.newVeggie(this.form);
      // this.firebase.add(this.form);

      // this.veggies_array = this.firebase.veggies;
    }
   },

   data() {
    return {
      veggies_array: [],
      form: {
        type: '',
        veggie: {
          name: '',
          address: '',
          location: []
        }
      }
    }
   },

   computed: {
    // obtém os dados do firebase e exibe os marcadores no mapa
   }
  }
</script>

<template>
  <div>
    <h1>veggies_array -> {{veggies_array}}</h1>
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