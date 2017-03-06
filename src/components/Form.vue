<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import Firebase from '../assets/js/Firebase.js';

  export default {
   name: 'vgForm',

   components: { VueGoogleAutocomplete },

   mounted() {
    this.firebase = window.vgFirebase;
    this.vgEventHub = window.vgEventHub;
   },

   methods: {
    onSubmitForm() {
      if (this.form.type != '' && this.form.veggie.address != '' && this.form.veggie.name != '') {
        this.firebase.addVeggie(this.form);

        this.vgEventHub.$emit('new_veggie', {
          veggies_array: this.firebase.veggies
        });

        this.clearFields();
      } else {
        return this.message = 'Para adicionar um novo veggie, nenhum campo pode está vazio!';
      }
    },

    clearFields() {
      this.form = {
        type: '',
        veggie: {
          name: '',
          address: '',
          location: []
        }
      }

      this.message = '';
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
      form: {
        type: '',
        veggie: {
          name: '',
          address: '',
          location: []
        }
      },
      message: ''
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
            <vue-google-autocomplete
              id="map"
              class="input"
              placeholder="Endereço do Veggie"
              v-model="form.veggie.address"
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

      <div class="control" v-if="message">
        <div class="notification is-info">
          <p>{{message}}</p>
        </div>
      </div>
    </form>

  </div>
</template>

<style lang="scss"></style>