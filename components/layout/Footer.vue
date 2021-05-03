<template>
  <footer class="footer">
    <div class="company">
      <p>
        Minigreens 4 rue du general de gaulle <br />
        Aix en Provence <br />
        France<br />
        06 12 32 32 32
        <a href="mailto:contact@minigreens.fr">contact@minigreens.fr</a>
      </p>
      <img
        src="@/assets/logo_fond_blanc.png"
        class="w-full"
        alt="logo footer"
      />
    </div>
    <div class="blog">
      <span class="text-lg">BLOG</span>
      <nuxt-link
        v-for="article in lastThreeArticles"
        :key="article.id"
        :to="'/articles/' + article.slug"
        class="nav-item"
      >
        {{ article.title }}
      </nuxt-link>
    </div>
    <div class="menu">
      <div class="split">
        <nuxt-link
          v-for="(item, index) in menu"
          :key="index"
          :to="item.link"
          class="nav-item"
        >
          {{ item.text }}
        </nuxt-link>
      </div>
      <div class="split"></div>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    computed: mapGetters({
      lastThreeArticles: "articles/lastThreeArticles",
    }),

    data() {
      return {
        menu: [
          { text: "La ferme", link: "/farm" },
          { text: "Boutique", link: "/shop" },
          { text: "Contact", link: "/contact" },
          { text: "Mentions legales", link: "/shop" },
          { text: "Politique de confidentialite", link: "/shop" },
        ],
      };
    },
  };
</script>

<style>
.footer {
  padding: 1.5rem;
  max-width: 100%;
  background-color: var(--bg-darker);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 300px));
  color: var(--clr-font-footer);
  font-size: 0.9em;
  font-weight: 600;
  grid-gap: 1.5em;
}
.footer > * {
  padding: 1em;
}
.company > * + * {
  margin-top: 1.5em;
}

.nav-item {
  margin: 0.5em 1em;
  font-weight: 600;
  letter-spacing: 0.11em;
}

.menu {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-around;
  font-size: 1.2em;
  padding: 0.5em 1em;
}
a:hover {
  text-decoration: underline;
}
</style>