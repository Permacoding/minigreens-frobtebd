<template>
  <footer class="footer">
    <div class="footer-container">
    <div class="company">
      <div class="split">
        <fa-icon icon="map-marker-alt" style="font-size:20px;" /><br />
        4 rue du general de gaulle
        <br />
        Aix en Provence <br />
        France<br />
      </div>
    
        <div class="split">
          <fa-icon icon="phone-alt" style="font-size:20px;" /> 06 12 32 32 32 <br />
        </div>
        <div class="split">
          <fa-icon :icon="['far', 'envelope']"  style="font-size:20px;"/><a href="mailto:contact@minigreens.fr"
            >contact@minigreens.fr</a
          ><br />
        </div>
      </p>
      <img src="@/assets/logo_fond_blanc.png" alt="logo footer" />
    </div>
    <div class="blog">
      <nuxt-link to="/blog" class="nav-item-footer">Blog</nuxt-link>
      <nuxt-link
        v-for="article in lastThreeArticles"
        :key="article.id"
        :to="'/articles/' + article.slug"
        class="nav-item-footer"
      >
        {{ article.title }}
      </nuxt-link>
    </div>
    <div class="menu--footer">
      <div >
        <nuxt-link
          v-for="(item, index) in menu"
          :key="index"
          :to="item.link"
          class="nav-item-footer"
        >
          {{ item.text }}
        </nuxt-link>
      </div>
      <div class="social">
        <fa-icon :icon="['fab', 'facebook']" />
        <fa-icon :icon="['fab', 'instagram']" />
      </div>
    </div>
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
          { text: "Mentions legales", link: "/legal" },
          { text: "Politique de confidentialite", link: "/confidentialite" },
        ],
      };
    },
  };
</script>

<style>
.nav-item-footer {
  display: block;
  font-size: 1.1em;
  margin-top: 0.4em;
}
.nav-item-footer:hover {
  color: var(--clr-brand-light);
}
.social {
  font-size: 2.5rem;
}
.footer {
  background-color: var(--clr-bg-darker);
}
.footer-container {
  display: grid;
  max-width: 1200px;
  margin: 3rem auto 0 auto;
  padding: 2.5rem var(--p-section);
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  color: var(--clr-font-light);
  font-size: 0.9em;
  font-weight: 500;
  gap: 1.5em;
}
.footer-container > * {
  padding: 0.5em;
  min-width: 250px;
  flex-basis: 32%;
}
.blog > * + * {
  margin-top: 0.9em;
  padding-left: 0.4em;
}
.company > * + * {
  margin-top: 1.5em;
}
.company img {
  max-width: 15em;
}

.menu--footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1em;
}
.split {
  display: flex;
  gap: 1em;
  align-items: center;
}
</style>