// Libs
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueProgressBar from 'vue-progressbar';

// Components
import vgApp from './views/App.vue';

// Routes
import router from './router/index';

// Events
import Events from './events/all';

// Assets
import Firebase from './assets/js/Firebase';

// ====

Vue.use(VueResource);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

let firebase = new Firebase();
    firebase.listen();
window.vgFirebase = firebase;

// ====

new Vue({
  el: '#app',
  router,
  components: { vgApp }
});