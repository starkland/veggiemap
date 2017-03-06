import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueProgressBar from 'vue-progressbar';

import vgApp from './views/App.vue';
import vgContact from './views/Contact.vue';


Vue.use(VueRouter);
Vue.use(VueResource);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

const routes = [
  {
    path: '/',
    component: vgApp
  },
  {
    path: '/contato',
    component: vgContact
  }
];

const router = new VueRouter({
  routes,
  mode: 'history' // removes the # from URL
});

new Vue({
  el: '#app',
  router,
  components: { vgApp }
});