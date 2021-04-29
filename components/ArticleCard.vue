<template>
    <nuxt-link :to="'/articles/'+article.slug" class="card--article" :class="index % 2 === 0 ? 'from-right' : 'from-left'">
      <div><img :src="getStrapiMedia(article.cover.url)" alt="cover article" class="w-full" /></div>
      <div class="card--body">
        <h2>{{article.title}}</h2>
        <p class="flex flex-col self-end">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quaerat
          quae cum cumque cupiditate vel enim voluptatibus consequatur, repellat,
          at quasi sequi deserunt minima totam aspernatur. Possimus eum dolorum
          porro facere nostrum nemo minima alias.
          <span class="opacity-75 font-bold text-sm self-end mt-2">Publie le {{ $moment(article.published_at).format('DD/MM/YY')}}</span>
        </p>
      </div>
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
.card--article {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 -1rem;
}

.card--article > * {
  flex: 1 1 350px;
  margin-left: 1rem;
  margin-bottom: 2rem;
}
.card--body {
  display: flex;
  flex-direction: column;
}
.card--body p {
  text-align: justify;
  margin-top: 0.5rem;
}
</style>