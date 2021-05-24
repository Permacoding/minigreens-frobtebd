<template>
  <div>
    <div
      class="clickable-background"
      :Style="'top:' + scrollToTop + 'px;'"
      @click="closeModal"
      v-show="isDisplayed"
    ></div>
    <Header />
    <div class="page-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  export default {
    async fetch() {},
    data() {
      return {
        mounted: false,
        scrollToTop: 0,
      };
    },
    computed: {
      ...mapGetters({
        isDisplayed: "modal/isBackgroundDisplayed",
      }),
    },
    methods: {
      ...mapMutations({
        closeModal: "modal/closeModal",
      }),
    },
    watch: {
      isDisplayed(newValue, oldValue) {
        // Hack for prevent body scroll when modal opened
        if (newValue) {
          this.scrollToTop = window.scrollY;
          document.body.style.position = "fixed";
          document.body.style.top = -this.scrollToTop + "px";
          document.body.style.width = "100vw";
        } else {
          document.body.style.position = "";
          window.scrollTo(0, parseInt(this.scrollToTop));
          document.body.style.top = "0px";
        }
      },
    },
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

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-container {
  padding-top: var(--h-menu);
  min-height: 100vh;
}

.clickable-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: black;
  opacity: 0.4;
}
</style>
