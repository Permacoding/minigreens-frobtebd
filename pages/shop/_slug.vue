<template>
  <section class="fiche--article container__section">
    <h1 class="product--title">{{ product.title }}</h1>
    <div>
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
    </div>
    <div>
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
        <div class="product__weigth">
          Poids:
          {{
            product.poids > 1000
              ? (product.poids / 1000).toFixed(1) + " kg"
              : product.poids + " g"
          }}
        </div>
      </div>
      <Accordeon :tabs="tabs" />
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
      tabs() {
        const result = [];

        if (this.product.description)
          result.push({
            title: "Description",
            content: this.$md.render(this.product.description),
          });

        if (this.product.nutrition)
          result.push({
            title: "Nutrition",
            content: this.$md.render(this.product.nutrition),
          });

        if (this.product.conseils)
          result.push({
            title: "Conseils",
            content: this.$md.render(this.product.conseils),
          });

        if (this.product.benefices) {
          let content = `<ul class="benefices-list">`;
          this.product.benefices.list.forEach((e, index) => {
            content =
              content +
              `<li class="` +
              this.colorClassByIndex(index) +
              `">` +
              e.text +
              `</li>`;
          });
          content = content + `</ul>`;

          result.push({
            title: "Bénéfices",
            content: content,
          });
        }

        return result;
      },
      currentPhoto() {
        if (this.product.images && this.product.images.length > 0)
          return this.getStrapiMedia(
            this.product.images[this.currentIndexPhoto].formats.medium.url
          );
        else return "https://via.placeholder.com/300x300?text=Minigreens";
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
  grid-gap: 1rem 1.5rem;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  grid-auto-flow: dense;
}

@media (max-width: 800px) {
  .fiche--article {
    display: block;
  }
  .fiche--article > * {
    margin-top: 1rem;
  }
}

.benefices-list {
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

.product__add_to_cart {
  display: flex;
  align-items: center;
}
.product__add_to_cart > * {
  margin: 0rem 1rem;
}
.infos-price {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.cadre-price {
  background-color: var(--clr-brand-yellow2);
  padding: 0.2em 1em;
  display: inline-block;
  margin-bottom: 1rem;
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
.product--title {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  font-family: var(--handwriting);
}
.photo {
  grid-row: span 2;
  width: 100%;
  height: min(400px, 100vw);
  object-fit: cover;
}
.other-photo-item {
  width: 4rem;
  margin: 0 0.5rem 0 0;
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
  display: flex;
  flex-wrap: wrap;
}
.product__weigth {
  color: var(--clr-brand-darker);
  font-weight: 600;
  font-size: 1.3rem;
  margin: 1rem 0;
}
.h2-product {
  font-size: 1.5em;
  font-weight: 600;
  font-family: var(--handwriting);
  color: var(--clr-brand-normal);
  margin-bottom: 0.8rem;
}
</style>
