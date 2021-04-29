<template>
  <div class="article text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
    <img :src="getStrapiMedia(article.cover.url)" class="w-full" />
    <h1>{{ article.title }}</h1>
        <div
          v-if="article.content"
          v-html="$md.render(article.content)"
          class="article--body tracking-wide"
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
.article {
  padding: 1rem;
  max-width: 70ch;
  margin: auto;
}
.article h1 {
  line-height: 1em;
}
.article--body {
  text-align: justify;
  line-height: 1.6em;
  margin-top: 1em;
}
.article--body > * + * {
  padding: 1em 0 1em 0;
}
</style>