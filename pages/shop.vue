<template>
  <div class="shop">
    <div
      class="card--product ml-4 mt-4"
      v-for="product in products"
      :key="product.id"
    >
      <div
        class="card--image"
        :style="'background-image: url(' + product.image[0].url + ')'"
      ></div>
      <div class="card-content"></div>
    </div>
  </div>
</template>

<script >
  import { getMetaTags } from "../utils/seo";
  import { getStrapiMedia } from "../utils/medias";
  import { mapGetters } from "vuex";

  export default {
    computed: mapGetters({
      global: "global/getGlobal",
      products: "products/allProducts",
    }),

    head() {
      const { defaultSeo, favicon, siteName } = this.global;

      const fullSeo = {
        ...defaultSeo,
      };
      return {
        titleTemplate: `%s | ${siteName}`,
        title: fullSeo.metaTitle,
        meta: getMetaTags(fullSeo),
        link: [
          {
            rel: "icon",
            href: getStrapiMedia(favicon.url),
          },
        ],
      };
    },
  };
</script>

<style scoped>
.shop {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 -1rem;
}

.card--image {
  width: 100%;
  height: 70%;
  background-image: url("/uploads/basilic_04397b9cc1.jpg");
}
.shop > * {
  flex-basis: 33%;
}
.card--product {
  display: flex;
  height: 18em;
  border-radius: 5%;
  background: rgb(214, 214, 214);
  overflow: hidden;
}
</style>
