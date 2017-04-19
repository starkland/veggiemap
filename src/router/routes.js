import vgApp from '../views/App.vue';
import vgContact from '../views/Contact.vue';
import vgStats from '../views/Stats.vue';

import LocalStorage from '../assets/js/LocalStorage';

// ====

const storage = new LocalStorage('userInfo');

function validateRoute(next) {
  if (!storage.get()) {
    // next(false);
    next({ path: '/' });
  } else {
    next(true);
  }
}

// ====

export default [
  {
    path: '/',
    component: vgApp
  },

  {
    path: '/contato',
    component: vgContact,
    beforeEnter: (to, from, next) => {
      validateRoute(next)
    }
  },

  {
    path: '/stats',
    component: vgStats,
    beforeEnter: (to, from, next) => {
      // next()
      validateRoute(next)
    }
  }
];