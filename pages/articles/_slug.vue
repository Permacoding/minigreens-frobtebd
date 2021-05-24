<template>
  <section class="article text-sm sm:text-base md:text-lg lg:text-xl">
    <img :src="getStrapiMedia(article.cover.url)" class="article--img" />
    <div class="img--legend">{{ article.cover.caption }}</div>
    <h1>{{ article.title }}</h1>
    <div>
      <div
        v-if="article.content"
        v-html="$md.render(article.content)"
        class="article--body"
      ></div>
      <p class="date">
        publié le {{ $moment(article.published_at).format("Do MMM YYYY") }}
      </p>
    </div>
  </section>
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
.article--img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}
.img--legend {
  font-size: 0.7em;
  line-height: 1em;
  color: #786981;
}
.article h1 {
  line-height: 1em;
  margin: 0.25em 0 0.5em 0;
  font-size: 3em;
}
.article--body {
  text-align: justify;
  line-height: 1.6em;
  margin-top: 1em;
}

.article--body > ul > li {
  margin-bottom: 0.8em;
  margin-left: 2rem;
}
.article--body > ul > li:before {
  content: "\23FA";
  margin-right: 1rem;
  font-size: 0.6rem;
  width: 0.3em;
  height: 0.3em;
}
.article--body > * + * {
  padding: 1em 0 1em 0;
}
</style>