<script>
  export default {
    name: 'Header'
  }
</script>

<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item">
        veggiemap logo
      </a>
    </div>

    <div class="nav-center">
      <a
        class="nav-item"
        href="https://github.com/starkland/veggiemap"
        target="_blank">

        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>

      <a
        class="nav-item"
        href="https://twitter.com/intent/tweet?text=Veggiemap%20on%20Github%20http://github.com/starkland/veggiemap"
        target="_blank">

        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>
    </div>

    <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
    <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <!-- This "nav-menu" is hidden on mobile -->
    <!-- Add the modifier "is-active" to display it on mobile -->
    <div class="nav-right nav-menu">
      <a class="nav-item">Home</a>
      <a class="nav-item">Documentation</a>
    </div>
  </nav>
</template>

<style></style>