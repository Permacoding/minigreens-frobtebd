<template>
  <nav class="menu__mobile">
    <div class="header">Menu</div>
    <div v-for="item in menu" :key="item.text">
      <div v-if="item.submenu.length > 0">
        <input
          :id="item.text"
          type="checkbox"
          class="input-nav-mobile"
          :value="subMenuOpened === item.text ? '' : item.text"
          @input="subMenuOpened = $event.target.value"
          name="submenu"
        />
        <label :for="item.text" class="nav-item">
          {{ item.text }}
          <fa-icon
            icon="chevron-right"
            class="chevron"
            :class="{ rotate: subMenuOpened == item.text }"
          />
        </label>
        <div class="submenu__mobile" v-show="subMenuOpened == item.text">
          <nuxt-link :to="item.link" class="nav-item">Accueil </nuxt-link>
          <div
            v-for="(submenuItem, index) in item.submenu"
            :key="index"
            class="nav-item"
          >
            <nuxt-link v-if="'link' in submenuItem" :to="submenuItem.link">
              {{ submenuItem.text }}
            </nuxt-link>
            <button v-else @click="logout()">
              {{ submenuItem.text }}
            </button>
          </div>
        </div>
      </div>
      <nuxt-link v-else :to="item.link" class="nav-item"
        >{{ item.text }}
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        subMenuOpened: "",
      };
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
    props: {
      menu: {
        type: Array,
        default: [],
      },
    },
  };
</script>

<style lang="scss" scoped>
.input-nav-mobile {
  display: none;
}
.chevron {
  transition: transform 300ms;
}
.rotate {
  transform: rotate(90deg);
}

.menu__mobile {
  .header {
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    text-align: center;
    color: var(--clr-font-light);
    font-weight: 600;
    padding: 0.8em 0;
    background-color: var(--clr-brand-darker);
  }
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6em 1.4em;
    font-weight: 600;
    position: relative;
    letter-spacing: 0.11em;
    font-size: 1.1em;
    user-select: none;

    &:hover,
    &:focus {
      background-color: var(--clr-brand-light);
      color: white;
    }
  }
  position: absolute;
  top: calc(var(--h-menu) + 1.5rem);
  right: 0;
  overflow: hidden;
  width: 18rem;
  border: 1px solid var(--clr-bg-dark);
  border-right: 0;
  background-color: white;
  height: max-content;
}
.submenu__mobile > .nav-item {
  padding-left: 2.2em;
}
</style>