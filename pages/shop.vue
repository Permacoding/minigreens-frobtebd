<template>
  <section class="shop">
    <div class="filters">
      <div class="filter-item">
      <input
        id="filter--kit"
        type="checkbox"
        v-model="filters.types"
        name="filter_type[]"
        value="kit"
      />
      <label for="filter--kit">Kits</label>
      </div>
      <div class="filter-item">
      <input
        id="filter--micropousse"
        type="checkbox"
        v-model="filters.types"
        name="filter_type[]"
        value="micropousse"
      />
      <label for="filter--micropousse">Micropousses</label>
      </div>
    </div>
    </div>
    <div
      class="card--product"
      :class="product.type"
      v-for="product in products"
      :key="product.id"
    >
      <div
        class="card--image"
        :style="
          'background-image: url(' + getStrapiMedia(product.image[0].url) + ')'
        "
      ></div>
      <div class="card-content"></div>
    </div>
  </section>
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
    data() {
      return {
        filters: {
          types: [],
        },
      };
    },
    methods: {
      getStrapiMedia,
    },
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
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
}
.filters {
  grid-column: 1/-1;
}

.card--image {
  width: 100%;
  height: 70%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5% 5% 0 0;
  position: relative;
  overflow: hidden;
}

.kit > .card--image::after {
  content: "KiT";
  font-family: "NanumPen";
  position: absolute;
  right: 0rem;
  top: 0rem;
  display: block;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  color: var(--font-light);
  box-shadow: 0 6px 4px -1px rgba(0, 0, 0, 0.1),
    0 4px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 0 20%;
  padding: 0 0.4em;
  background-color: hsl(204, 99%, 45%);
}

.card--product {
  display: flex;
  height: 18em;
  border-radius: 2%;
  background: var(--clr-brand-blue);
  box-shadow: var(--shadow);
  transition: all 200ms ease-in-out;
}
.card--product:hover {
  transform: scale(1.05);
}
</style>
