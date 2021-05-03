<template>
  <section class="articles">
    <ArticleCard
      v-for="(article, index) in articles"
      :observer="observer"
      :article="article"
      :index="index"
      :key="index"
      :class="{
        'last--article': index == 0,
        'medium--article': index == 2 || index == 5,
      }"
    >
    </ArticleCard>
  </section>
</template>

<script >
  import { getMetaTags } from "../utils/seo";
  import { getStrapiMedia } from "../utils/medias";
  import { mapGetters } from "vuex";
  import { observer } from "../mixins/observer";

  export default {
    mixins: [observer],
    async asyncData({ $strapi }) {
      return {
        blog: await $strapi.find("blog"),
      };
    },

    computed: mapGetters({
      global: "global/getGlobal",
      articles: "articles/allArticles",
    }),

    head() {
      const { seo } = this.blog;
      const { defaultSeo, favicon, siteName } = this.global;

      const fullSeo = {
        ...defaultSeo,
        ...seo,
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

<style lang="scss">
.articles {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5em;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(10rem));
  grid-auto-flow: dense;
  grid-gap: 1.7em;
}

.last--article {
  grid-column: span 3;
  grid-row: span 2;
}

.medium--article {
  h2 {
    font-size: 2rem;
  }
  grid-column: span 2;
  grid-row: span 2;
}

@media (max-width: 800px) {
  .last--article {
    grid-column: span 2;
    grid-row: span 2;
  }
}
@media (max-width: 400px) {
  .last--article {
    grid-column: span 1;
    grid-row: span 2;
  }
  .medium--article {
    grid-column: span 1;
    grid-row: span 2;
  }
  .articles {
    padding: 0;
  }
}
</style>
