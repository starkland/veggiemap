// Libs
import Vue from 'vue';
import VueI18n from 'vue-i18n';
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

// Translations
import Translations from './translations/index';

// ====

Vue.use(VueI18n);
Vue.use(VueResource);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

let firebase = new Firebase();
window.vgFirebase = firebase;

Object.keys(Translations).forEach((lang) => {
  Vue.locale(lang, Translations[lang])
});

// ====

new Vue({
  el: '#app',
  router,
  components: { vgApp }
});