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
        <label :for="item.text" class="nav-item with-submenu">
          {{ item.text }}
          <fa-icon
            icon="chevron-right"
            class="chevron"
            :class="{ rotate: subMenuOpened == item.text }"
          />
        </label>
        <div class="submenu--mobile" v-show="subMenuOpened == item.text">
          <nuxt-link :to="item.link" class="nav-item nav-item-popup"
            ><span class="ml-4">Accueil </span></nuxt-link
          >
          <nuxt-link
            v-for="(subMenuItem, index) in item.submenu"
            :to="subMenuItem.link"
            class="nav-item nav-item-popup"
            :key="index"
          >
            <span class="ml-4">{{ subMenuItem.text }}</span>
          </nuxt-link>
        </div>
      </div>
      <nuxt-link v-else :to="item.link" class="nav-item nav-item-popup"
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
    computed: {
      ...mapGetters({
        menu: "global/getMenu",
      }),
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
    padding: 0.4em 0;
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
</style>