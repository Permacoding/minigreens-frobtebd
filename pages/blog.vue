<template>
  <div class="pt-12 px-4">
    <ArticleCard
      v-for="(article, index) in articles"
      :observer="observer"
      :article="article"
      :index="index"
      :key="index"
    >
    </ArticleCard>
  </div>
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

<style>
</style>
