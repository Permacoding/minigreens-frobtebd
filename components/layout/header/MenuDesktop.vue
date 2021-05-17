<template>
  <nav class="nav__desktop">
    <nuxt-link
      v-for="item in menu"
      :key="item.text"
      :to="item.link"
      class="nav-item"
      >{{ item.text }}
      <div class="submenu__desktop" v-if="item.submenu.length > 0">
        <div
          v-for="(submenuItem, index) in item.submenu"
          :key="index"
          class="submenu__item"
        >
          <nuxt-link v-if="'link' in submenuItem" :to="submenuItem.link">
            {{ submenuItem.text }}
          </nuxt-link>
          <button v-else @click="logout()">
            {{ submenuItem.text }}
          </button>
        </div>
      </div>
    </nuxt-link>
  </nav>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    props: {
      menu: {
        type: Array,
        default: [],
      },
    },

    methods: {
      async logout() {
        this.$loading = true;
        try {
          await this.$strapi.logout();
          if (["auth-profil"].includes(this.$route.name))
            this.$router.push({ name: "auth-login" });
          this.$toast.success("Déconnection");
        } catch {}
        this.$loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
.submenu__desktop {
  border: 1px solid var(--clr-bg-darker);
  border-radius: 5%;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 3.2em;
  opacity: 0;
  visibility: hidden;
  height: max-content;
  width: max-content;
  background-color: var(--clr-brand-darker);
  transition: all 0.3s ease-in-out;
  transition-delay: 150ms;
  display: flex;
  flex-direction: column;
  .submenu__item {
    color: var(--clr-font-light);
    padding: 0.6em 1.2em;

    &:hover,
    &:focus {
      background-color: var(--clr-font-light);
      color: var(--clr-font-dark);
    }
  }
}

.nav__desktop {
  .nav-item {
    display: block;
    padding: 0.5em 1.8em;
    font-weight: 600;
    position: relative;
    letter-spacing: 0.11em;
    &:hover {
      color: var(--clr-brand-light);
      .submenu__desktop {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  display: none;
  align-items: center;
  @media (min-width: 800px) {
    display: flex;
  }
}
</style>