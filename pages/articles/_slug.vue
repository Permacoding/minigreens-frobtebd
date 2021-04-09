<template>
  <div>
    <div
      v-if="article.image"
      id="banner"
      class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
      :data-src="getStrapiMedia(article.cover.url)"
      uk-img
    >
      <h1>{{ article.title }}</h1>
    </div>

    <div class="uk-section">
      <div class="uk-container uk-container-small">
        <!-- eslint-disable vue/no-v-html -->
        <div
          v-if="article.content"
          id="editor"
          v-html="$md.render(article.content)"
        />
        <!-- eslint-enable vue/no-v-html -->
        <p>
          {{ $moment(article.published_at).format("MMM Do YY") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getStrapiMedia } from "@/utils/medias";
  import { getMetaTags } from "@/utils/seo";
  export default {
    computed: {
      ...mapGetters({
        global: "global/getGlobal",
        getArticleBySlug: "articles/bySlug",
      }),
      article() {
        return this.getArticleBySlug(params.slug);
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