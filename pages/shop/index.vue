<template>
  <section class="shop container-section">
    <!--  <div class="filters">
      <div class="filter-item">
        <input
          id="filter--kit"
          type="checkbox"
          v-model="filters.types"
          name="filter_type[]"
          value="kit"
        />
        <label for="filter--kit" class="handwriting label-checkmark"
          >kits</label
        >
      </div>
      <div class="filter-item">
        <input
          id="filter--micropousse"
          type="checkbox"
          v-model="filters.types"
          name="filter_type[]"
          value="micropousse"
        />
        <label for="filter--micropousse" class="handwriting label-checkmark"
          >micropousses</label
        >
      </div>
    </div> -->
    <div
      class="card__product"
      @mouseenter="hover = product.id"
      @mouseleave="hover = null"
      :class="{ 'card__product--full': product.type == 'kit' }"
      v-for="product in products"
      :key="product.id"
    >
      <nuxt-link :to="'/shop/' + product.slug" class="link__wrapper">
        <div
          class="card__image"
          :style="
            'background-image: url(' + getProductImgBackground(product) + ')'
          "
        >
          <transition-group name="fade" v-if="product.images.length > 1">
            <img
              :src="getStrapiMedia(product.images[0].url)"
              v-if="hover != product.id"
              alt="img-top"
              key="first"
            />
          </transition-group>
        </div>
        <div class="card__content">
          <h3
            class="product__name"
            :class="{ 'product__name--hover': hover == product.id }"
          >
            {{ product.title }}
          </h3>
          <span class="product__price">{{ product.price.toFixed(2) }}</span>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script >
  import { getMetaTags } from "@/utils/seo";
  import { getStrapiMedia } from "@/utils/medias";
  import { mapGetters, mapMutations } from "vuex";

  export default {
    computed: mapGetters({
      global: "global/getGlobal",
      products: "products/allProducts",
    }),
    data() {
      return {
        hover: null,
        loading: false,
      };
    },
    methods: {
      getStrapiMedia,
      getProductImgBackground(product) {
        if (product.images && product.images.length > 1)
          return getStrapiMedia(product.images[1].url);
        else if (product.images && product.images.length == 1)
          return getStrapiMedia(product.images[0].url);
        else return "https://via.placeholder.com/300x300?text=Minigreens";
      },
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

<style lang="scss" scoped>
.link__wrapper {
  height: 22rem;
}
.shop {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  padding-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-flow: dense;
}

.filters {
  grid-column: 1/-1;
}

.card__product {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 400ms ease-in-out;
  @media (min-width: 700px) {
    &--full {
      grid-column: span 2;
    }
  }
}

.card__image {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  background-origin: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 80%;
  position: relative;
  overflow: hidden;
}

.card__content {
  font-size: 1.6rem;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  color: var(--clr-brand-darker);
}

.product__name {
  letter-spacing: 0.1ch;
  font-weight: 700;
  text-transform: uppercase;
  &--hover {
    text-decoration: underline;
  }
}
.product__is__hover .product__price {
  font-weight: 300;
}
.product__price:after {
  content: "€";
}

/* .filters {
  display: flex;
  justify-content: center;
  margin: 0.2em 0;
  flex-wrap: wrap;
  font-size: 3rem;
  line-height: 2rem;
  gap: 0rem 2em;
}
.filter-item input {
  display: none;
}

.label-checkmark {
  position: relative;
  padding-left: 0.7em;
  color: var(--clr-brand-darker);
}
.label-checkmark::before {
  content: "";
  width: 0.5em;
  height: 0.5em;
  background-color: var(--clr-brand-light);
  border-radius: 5%;
  position: absolute;
  left: 0;
  top: 0.45em;
}

.label-checkmark::after {
  content: "";
  width: 0.2em;
  height: 0.35em;
  border-right: 5px solid #fff;
  border-bottom: 5px solid #fff;
  position: absolute;
  left: 0;
  opacity: 0;
  transform: translate(80%, 90%) rotate(40deg) scale(3);
  transition: all 0.4s;
}

.filter-item input:checked ~ .label-checkmark::after {
  opacity: 1;
  transform: translate(80%, 90%) rotate(40deg) scale(1);
} */
</style>
