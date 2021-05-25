<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="company">
        <div class="split">
          <fa-icon icon="map-marker-alt" style="font-size: 20px" />
          <p v-html="address ? $md.render(address) : ''"></p>
        </div>

        <div class="split">
          <fa-icon icon="phone-alt" style="font-size: 20px" />
          <p>{{ phone }}</p>
        </div>
        <div class="split">
          <fa-icon :icon="['far', 'envelope']" style="font-size: 20px" />
          {{ email }}<br />
        </div>
        <img src="@/assets/logo_fond_blanc.png" alt="logo footer" />
      </div>
      <div class="blog">
        <h3 class="nav__item__footer title__section__footer">
          Meilleurs ventes
        </h3>
        <nuxt-link
          v-for="product in bestSell(3)"
          :key="product.id"
          :to="'/shop/' + product.slug"
          class="nav__item__footer"
        >
          {{ product.title }}
        </nuxt-link>
      </div>
      <div class="menu__footer">
        <div>
          <nuxt-link
            v-for="(item, index) in menuWithLegal"
            :key="index"
            :to="item.link"
            class="nav__item__footer"
          >
            {{ item.text }}
          </nuxt-link>
        </div>
        <div class="social">
          <a :href="facebook" v-if="facebook != ''">
            <fa-icon :icon="['fab', 'facebook']"
          /></a>
          <a :href="'https://www.instagram.com/' + instagram">
            <fa-icon :icon="['fab', 'instagram']"
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        lastThreeArticles: "articles/lastThreeArticles",
        instagram: "contact/getInstagram",
        facebook: "contact/getFacebook",
        phone: "contact/getPhone",
        email: "contact/getEmail",
        address: "contact/getAddress",
        menu: "global/getMenu",
        bestSell: "products/chooseRandom",
      }),

      menuWithLegal() {
        const LegalLinks = [
          { text: "Mentions Légales", link: "/legal" },
          { text: "Politique de confidentialité", link: "/confidentialite" },
        ];

        return [...this.menu, ...LegalLinks];
      },
    },
  };
</script>

<style>
.nav__item__footer {
  display: block;
  font-size: 1.1em;
  margin-top: 0.4em;
}
.nav__item__footer:hover {
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
  font-size: 0.9rem;
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
  align-items: center;
}
.split > * + * {
  margin-left: 1.5rem;
}
.title__section__footer {
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
}
</style>