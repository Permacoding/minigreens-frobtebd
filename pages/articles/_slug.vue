<template>
  <div class="max-w-screen-lg mx-auto">
    <img :src="getStrapiMedia(article.cover.url)" class="w-full" />
    <h1 class="text-xl font-semibold py-4">{{ article.title }}</h1>

    <div>
      <div>
        <div
          v-if="article.content"
          v-html="$md.render(article.content)"
          id="article"
        />
        <p class="italic text-right">
          publie le {{ $moment(article.published_at).format("Do MMM YYYY") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getStrapiMedia } from "@/utils/medias";
  import { getMetaTags } from "@/utils/seo";
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        global: "global/getGlobal",
        getArticleBySlug: "articles/bySlug",
      }),
      article() {
        return this.getArticleBySlug(this.$route.params.slug);
      },
    },
    methods: {
      getStrapiMedia,
    },
    head() {
      const { defaultSeo, favicon, siteName } = this.global;
      // Merge default and article-specific SEO data
      const fullSeo = {
        ...defaultSeo,
        metaTitle: this.article.title,
        metaDescription: this.article.description,
        shareImage: this.article.cover,
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

<style>
#article p {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>