<script>
  export default {
    name: 'Header',

    data() {
      return {
        navActive: false
      }
    },

    props: [
      'logged',
      'connected'
    ],

    computed() {
      this.connected = connected;
      this.logged = logged;
    },

    methods: {
      toggleNavbar() {
        this.navActive = !this.navActive;
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
        title="Doe um Tweet :)"
        target="_blank">

        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>

      <a
        class="nav-item"
        href="https://github.com/starkland/veggiemap"
        rel="noopener"
        title="Veja o projeto no Github!"
        target="_blank">

        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
    </div>

    <span
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
        title="Home"
        to="/"
        exact>

        Home
      </router-link>

      <router-link
        class="nav-item"
        title="Contato"
        to="/contato"
        exact>

        Contato
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