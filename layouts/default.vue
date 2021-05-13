<template>
  <div>
    <div
      class="clickable-background"
      @click="isOpen = false"
      v-show="isOpen"
    ></div>
    <Navbar />
    <div id="page-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    async fetch() {},
  };
</script>

<style>
html {
  font-family: Roboto, "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

#page-container {
  padding-top: var(--h-menu);
  min-height: 100vh;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
