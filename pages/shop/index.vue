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
      <label for="filter--kit" class="handwriting label-checkmark">kits</label>
      </div>
      <div class="filter-item">
      <input
        id="filter--micropousse"
        type="checkbox"
        v-model="filters.types"
        name="filter_type[]"
        value="micropousse"
      />
      <label for="filter--micropousse" class="handwriting label-checkmark">micropousses</label>
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
          'background-image: url(' + getStrapiMedia(product.images[0].url) + ')'
        "
      ></div>
      <div class="card--content">
        <nuxt-link class="info" :to="'/shop/'+product.slug">
        <h3 class="product-name">{{ product.title }}</h3>
        <span class="product-price">{{ product.price }}</span>
        </nuxt-link>
        <loading-button :loading="loading" class="add-to-cart" @click="addToCart({product:product, quantity:1})" title="ajouter au panier">
         <fa-icon icon="cart-plus" />
        </loading-button>
      </div>
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
        loading: false,
        filters: {
          types: [],
        },
      };
    },
    methods: {
      getStrapiMedia,
      addToCart(payload) {
        this.loading = true;
        this.addCartItem(payload);
        this.$toast.success("Produit ajouté au panier.");
        this.loading = false;
      },
      ...mapMutations({ addCartItem: "products/addCartItem" }),
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
  gap: 1.5em;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
}

.filters {
  grid-column: 1/-1;
}

.card--image {
  width: 100%;
  height: 80%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.kit > .card--image::after {
  content: "kit";
  font-family: var(--handwriting);
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
  background-color: var(--clr-brand-dark);
}

.card--product {
  display: flex;
  flex-direction: column;
  height: 18em;
  border-radius: 2%;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 400ms ease-in-out;
}

.card--content {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}
.info {
  padding: 0.2rem 0.4rem;
  width: 100%;
}

.info:hover > .product-name {
  text-decoration: underline;
}

.card--product:hover > .card--content > .add-to-cart {
  opacity: 1;
  transform: translateX(0%);
}

.add-to-cart {
  transition: all 0.3s;
  opacity: 0;
  position: relative;
  font-size: 1.7rem;
  width: 4rem;
  height: 100%;
  color: var(--clr-brand-darker);
  display: flex;
  align-items: center;
  transform: translateX(100%);
  background-color: var(--clr-brand-yellow2);
}

.product-name {
  font-weight: 600;
}
.product-price {
  color: var(--clr-brand-dark);
  letter-spacing: 0.09rem;
}
.product-price:after {
  content: "€";
}

.filters {
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
}
</style>
