import Vue from 'vue';
import Events from '../../events/all';

class Api {
  constructor() {
    this.url = 'https://form-location-jsday-recife.firebaseio.com/';
    this.http = Vue.http;
  }

  getVeggies() {
    this.http
      .get(`${this.url}/veggies.json`)
      .then((response) => {
        Events.$emit('get_veggies', response.body);
      })
      .catch((err) => {
        Events.$emit('api_error', err);
      });
  }

  getUsers() {
    this.http
      .get(`${this.url}/users.json`)
      .then((response) => {
        Events.$emit('get_users', response.body);
      })
      .catch((err) => {
        Events.$emit('api_error', err);
      });
  }
}

export default Api;