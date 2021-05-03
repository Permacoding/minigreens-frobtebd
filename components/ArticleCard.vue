<template>
  <nuxt-link
    :to="'/articles/' + article.slug"
    class="card--article fade-from-bot"
  >
    <img
      class="card--img"
      :src="getStrapiMedia(article.cover.url)"
      :alt="article.cover.alternativeText"
    />
    <div class="card--body">
      <h2>{{ article.title }}</h2>
      <span class="date"
        >Publie le
        {{ $moment(article.published_at).format("DD MMMM yyyy") }}</span
      >
      <p v-if="index == 0 || index == 2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quaerat
        quae cum cumque cupiditate vel enim voluptatibus consequatur, repellat,
        at quasi sequi deserunt minima totam aspernatur. Possimus eum dolorum
        porro facere nostrum nemo minima alias.
      </p>
    </div>
  </nuxt-link>
</template>

<script>
  import Vue from "vue";
  import { getStrapiMedia } from "../utils/medias";

  export default Vue.extend({
    props: ["observer", "index", "article"],
    mounted() {
      this.observer.observe(this.$el);
    },
    methods: {
      getStrapiMedia,
    },
  });
</script>

<style>
h2 {
  font-size: 1.5em;
  margin: 0.2em 0 0.1em 0;
}

.last--article > .card--body > h2 {
  font-size: 3rem;
}
.card--img {
  width: 100%;
  max-height: 60vh;
  object-fit: cover;
}
medium--article > .card--body > h2 {
  font-size: 4rem;
}
last--article > .card--body > h2 {
  font-size: 5rem;
}
@media (max-width: 400px) {
  .card--body {
    padding: 0 0.7em 0 0.7em;
  }
}
.card--body p {
  margin-top: 1rem;
  line-height: 160%;
  max-width: 60ch;
}
</style>