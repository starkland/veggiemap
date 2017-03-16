import vgApp from '../views/App.vue';
import vgContact from '../views/Contact.vue';
import LocalStorage from '../assets/js/LocalStorage';

// ====

const storage = new LocalStorage();

function validateRoute(next) {
  let userInfo = storage.get('userInfo');

  if (!userInfo) {
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
  }
];