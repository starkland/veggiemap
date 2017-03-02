<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  import Firebase from '../assets/js/Firebase';

  export default {
   name: 'vgForm',

   components: { VueGoogleAutocomplete },

   beforeCreate() {
    this.firebase = new Firebase();
   },

   methods: {
    onSubmitForm() {
      this.firebase.addVeggie(this.form);

      this.veggies_array = this.firebase.veggies;
    },

    getAddressData(addressData) {
      let { route, locality, latitude, longitude, country } = addressData;

      this.form.veggie.address = `${route}, ${locality} - ${country}`;

      this.form.veggie.location[0] = latitude;
      this.form.veggie.location[1] = longitude;
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

   computed() {
    // obtém os dados do firebase e exibe os marcadores no mapa
    this.firebase.listen();
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
            <vue-google-autocomplete
              id="map"
              class="input"
              placeholder="Endereço do Veggie"
              v-on:placeChanged="getAddressData">
            </vue-google-autocomplete>
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

<style lang="scss"></style>