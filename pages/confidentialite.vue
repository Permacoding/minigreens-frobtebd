<template>
  <div class="container__section">
    <h1 class="page__title">Mentions Legales</h1>
    <div
      class="page__content"
      v-if="confidentialite.content"
      v-html="$md.render(confidentialite.content)"
    ></div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $strapi }) {
      return {
        confidentialite: await $strapi.find("confidentialite"),
      };
    },
  };
</script>

<style lang="scss" scoped>
</style>