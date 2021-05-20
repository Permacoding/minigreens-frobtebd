<template>
  <section class="fiche--article container-section">
    <h1 class="product--title">{{ product.title }}</h1>
    <img class="photo" :src="currentPhoto" />
    <div class="other-photos h-20 items-center">
      <img
        v-for="(photo, index) in product.images"
        :key="index"
        :src="getStrapiMedia(photo.formats.thumbnail.url)"
        class="other-photo-item"
        :class="{ bordered: currentIndexPhoto == index }"
        :alt="index"
        @click="currentIndexPhoto = index"
      />
    </div>
    <div class="infos-price">
      <div class="cadre-price">
        <span class="price">{{ product.price }}€</span
        ><span class="unite">unité</span>
      </div>
      <div class="product__add_to_cart">
        <number-input
          @changeNumber="nbProductToAdd = $event"
          :number="nbProductToAdd"
        ></number-input>
        <loading-button
          :loading="loading"
          @click="addToCart({ product: product, quantity: nbProductToAdd })"
          class="button__action text-lg"
          >Ajouter au panier</loading-button
        >
      </div>
    </div>
    <div class="description">
      <h2 class="h2-product">Description</h2>
      {{ product.description }}
    </div>
    <div class="related-recipe">
      <h2 class="h2-product">Recettes Associées</h2>
      Test, test , lalal , lala.
    </div>
    <div class="conseils">
      <h2 class="h2-product">Conseils</h2>
      <p class="p-product">
        {{ product.conseils }}
      </p>
    </div>

    <div class="benefices" v-if="product.benefices">
      <h2 class="h2-product">Bénéfices</h2>
      <ul class="benefices-list">
        <li
          v-for="(benefice, index) in product.benefices.list"
          :key="index"
          :class="colorClassByIndex(index)"
        >
          {{ benefice.text }}
        </li>
      </ul>
    </div>
    <div class="nutrition">
      <h2 class="h2-product">Nutrition</h2>
      <p class="p-product">{{ product.nutrition }}</p>
    </div>
  </section>
</template>

<script >
  import { getStrapiMedia } from "@/utils/medias";
  import { getMetaTags } from "@/utils/seo";
  import { mapGetters, mapMutations } from "vuex";

  export default {
    data() {
      return {
        currentIndexPhoto: 0,
        nbProductToAdd: 1,
        loading: false,
      };
    },
    computed: {
      ...mapGetters({
        global: "global/getGlobal",
        getProductBySlug: "products/bySlug",
      }),
      product() {
        return this.getProductBySlug(this.$route.params.slug);
      },
      currentPhoto() {
        return this.getStrapiMedia(
          this.product.images[this.currentIndexPhoto].formats.medium.url
        );
      },
    },
    methods: {
      getStrapiMedia,
      colorClassByIndex(index) {
        const colorClass = ["light", "dark", "darker", "normal"];
        return colorClass[(colorClass.length + 1) % (index + 1)];
      },
      addToCart(payload) {
        this.loading = true;
        this.setCartItem(payload);
        this.$toast.success("Produit ajouté au panier.");
        this.loading = false;
      },
      ...mapMutations({ setCartItem: "products/addCartItem" }),
    },
    head() {
      const { defaultSeo, favicon, siteName } = this.global;
      // Merge default and article-specific SEO data
      const fullSeo = {
        ...defaultSeo,
        metaTitle: this.product.title,
        metaDescription: this.product.description,
        shareImage: "",
      };
      return {
        titleTemplate: `%s | ${siteName}`,
        title: fullSeo.metaTitle,
        meta: getMetaTags(fullSeo),
        link: [
          {
            rel: "favicon",
            href: getStrapiMedia(favicon.url),
          },
        ],
      };
    },
  };
</script>
  });
</script>

<style>
.fiche--article {
  margin: auto;
  display: grid;
  gap: 1rem 1.5rem;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  grid-auto-flow: dense;
  grid-template-areas:
    "title title"
    "top-photo price"
    "top-photo description"
    "other-photo benefices"
    "recipes benefices"
    "conseils nutrition";
}

@media (max-width: 700px) {
  .fiche--article {
    grid-template-columns: minmax(300px, 1fr);
    grid-template-areas:
      "title"
      "top-photo"
      "other-photo"
      "price"
      "description"
      "nutrition"
      "benefices"
      "recipes"
      "conseils";
    gap: 1rem;
  }
}
.conseils {
  grid-area: conseils;
}
.benefices {
  grid-area: benefices;
}
.benefices-list {
  margin: 1.5rem 0;
  padding-left: 1rem;
}
.benefices-list > li {
  margin-bottom: 0.8em;
  margin-left: 2rem;
}
.benefices-list > li:before {
  content: "\23FA";
  margin-right: 1rem;
  font-size: 0.6rem;
  width: 0.3em;
  height: 0.3em;
}

.light:before {
  color: var(--clr-brand-light);
}
.dark:before {
  color: var(--clr-brand-dark);
}
.normal:before {
  color: var(--clr-brand-normal);
}
.darker:before {
  color: var(--clr-brand-darker);
}

.description {
  grid-area: description;
}
.product__add_to_cart {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.product__add_to_cart > * {
  margin: 1rem 1rem 1rem 0;
}
.infos-price {
  grid-area: price;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
.cadre-price {
  background-color: var(--clr-brand-yellow2);
  padding: 0.2em 1em;
  display: inline-block;
}
.price {
  font-weight: 700;
  color: var(--clr-brand-darker);
  font-size: 2rem;
}
.price:after {
  content: "/";
  font-weight: 500;
  font-size: 1.5rem;
  margin-left: 0.2em;
}
.unite {
  font-size: 500;
  margin-left: 0.2em;
  letter-spacing: 0.2em;
}
.related-recipe {
  grid-area: recipes;
}
.nutrition {
  grid-area: nutrition;
}
.product--title {
  grid-area: title;
  display: flex;
  justify-content: center;
  font-family: var(--handwriting);
}
.photo {
  grid-area: top-photo;
  width: 100%;
  height: min(400px, 100vw);
  object-fit: cover;
}
.other-photo-item {
  width: 4rem;
  cursor: pointer;
  border-radius: 5%;
  height: 4rem;
  object-fit: cover;
}
.other-photo-item:hover,
.bordered {
  border: 2px solid var(--clr-brand-blue);
}
.other-photos {
  grid-area: other-photo;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.h2-product {
  font-size: 1.5em;
  font-weight: 600;
  font-family: var(--handwriting);
  color: var(--clr-brand-normal);
  margin-bottom: 0.8rem;
}
</style>
