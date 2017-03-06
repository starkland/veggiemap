import Vue from 'vue';
import VueResource from 'vue-resource';
import VueProgressBar from 'vue-progressbar';

import vgApp from './views/App.vue';

import router from './router/index';

Vue.use(VueResource);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

new Vue({
  el: '#app',
  router,
  components: { vgApp }
});