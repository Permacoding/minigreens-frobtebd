<template>
  <div class="container__section">
    <h1 class="page__title">Mentions Legales</h1>
    <div
      class="page__content"
      v-if="legal.content"
      v-html="$md.render(legal.content)"
    ></div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $strapi }) {
      return {
        legal: await $strapi.find("legal"),
      };
    },
  };
</script>

<style lang="scss" scoped>
</style>