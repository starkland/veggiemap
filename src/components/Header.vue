<script>
  import vSelect from 'vue-select';
  import Event from '../events/all';

  export default {
    name: 'Header',

    data() {
      return {
        navActive: false,
        selected: null,
        options: ['en','pt']
      };
    },

    components: {
      vSelect
    },

    props: [
      'logged',
      'connected'
    ],

    methods: {
      toggleNavbar() {
        this.navActive = !this.navActive;
      },

      changeLanguage(val) {
        if (val) {
          Event.$emit('change_language', val);
        }
      }
    }
  }
</script>

<template>
  <nav class="nav" :class="{ 'offline': !connected }">
    <div class="nav-left">
      <a class="nav-item" href="/">
        Veggie Map
      </a>
    </div>

    <div class="nav-center">
      <a
        class="nav-item"
        href="https://twitter.com/intent/tweet?text=Veggiemap%20on%20Github%20http://github.com/starkland/veggiemap"
        rel="noopener"
        :title="$t('header.nav.tweet')"
        target="_blank">

        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>

      <a
        class="nav-item"
        href="https://github.com/starkland/veggiemap"
        rel="noopener"
        :title="$t('header.nav.github')"
        target="_blank">

        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>

      <div class="field nav-item">
        <p class="control">
          <v-select
            placeholder="Translations"
            :value.sync="selected"
            :on-change="changeLanguage"
            :options="options">
          </v-select>
        </p>
        </div>
    </div>

    <span
      v-if="logged"
      class="nav-toggle"
      @click="toggleNavbar"
      :class="{ 'is-active' : navActive }">

      <span></span>
      <span></span>
      <span></span>
    </span>

    <div
      class="nav-right nav-menu"
      v-if="logged"
      :class="{ 'is-active' : navActive }">

      <router-link
        class="nav-item"
        :title="$t('header.nav.home')"
        to="/"
        exact>

        {{ $t('header.nav.home') }}
      </router-link>

      <router-link
        class="nav-item"
        :title="$t('header.nav.contact')"
        to="/contato"
        exact>

        {{ $t('header.nav.contact') }}
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss">
  $white: #FFFFFF;
  $green: #00D1B2;

  .router-link-active {
    background-color: $green;
    border-color: transparent;
    color: $white !important;
  }
</style>