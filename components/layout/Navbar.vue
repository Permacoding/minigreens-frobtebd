<template>
  <header class="bg-white">
    <div class="container--header">
      <nuxt-link to="/">
        <img src="@/assets/logo.png" class="logo" alt="logo" />
      </nuxt-link>
      <nav class="flex items-center">
        <!-- MENU Dekstop  -->
        <div class="md:flex hidden menu--desktop">
          <nuxt-link
            v-for="item in menu"
            :key="item.text"
            :to="item.link"
            class="nav-item nav-item-desktop"
            :class="{ 'with--submenu': 'submenu' in item }"
            >{{ item.text }}
            <div class="submenu--desktop" v-if="'submenu' in item">
              <nuxt-link
                v-for="(submenuItem, index) in item.submenu"
                :to="submenuItem.link"
                class="nav-item nav-item-popup"
                :key="index"
              >
                {{ submenuItem.text }}
              </nuxt-link>
            </div>
          </nuxt-link>
        </div>
        <!-- END MENU DEsktop  -->
      </nav>
      <div class="flex items-center justify-end">
        <HamburgerMenu
          class="md:hidden mr-4"
          :isMenuOpened="isOpened"
          @update:isOpen="isOpened = $event"
        />
        <Cart :isCartOpened="isOpened" @update:isOpen="isOpened = $event" />
      </div>
      <!-- Absolute Menu only for mobile if opened -->
      <transition name="slide-left">
        <nav
          id="menu--mobile"
          class="menu--mobile mt-16"
          v-show="isOpened === 'menu'"
          v-closable="{
            exclude: ['hamburger', 'cart', 'menu--mobile', 'cart--sidebar'],
            handler: 'close',
          }"
        >
          <div v-for="item in menu" :key="item.text">
            <div v-if="'submenu' in item">
              <input
                :id="item.text"
                type="checkbox"
                class="input-nav-mobile"
                :value="subMenuOpened === item.text ? '' : item.text"
                @input="subMenuOpened = $event.target.value"
                name="submenu"
              />
              <label :for="item.text" class="nav-item with--submenu--mobile">{{
                item.text
              }}</label>
              <div class="submenu--mobile" v-show="subMenuOpened == item.text">
                <nuxt-link :to="item.link" class="nav-item nav-item-popup"
                  ><span class="ml-4"> Accueil </span></nuxt-link
                >
                <nuxt-link
                  v-for="(submenuItem, index) in item.submenu"
                  :to="submenuItem.link"
                  class="nav-item nav-item-popup"
                  :key="index"
                >
                  <span class="ml-4"> {{ submenuItem.text }}</span>
                </nuxt-link>
              </div>
            </div>
            <nuxt-link v-else :to="item.link" class="nav-item nav-item-popup"
              >{{ item.text }}
            </nuxt-link>
          </div>
        </nav>
      </transition>
      <!-- END Absolute Menu only for mobile if opened-->
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        isOpened: false,
        subMenuOpened: "",
        menu: [
          { text: "La ferme", link: "/farm" },
          { text: "Blog", link: "/blog" },
          {
            text: "Boutique",
            link: "/shop",
            submenu: [
              { text: "Micropousses", link: "/shop?type=micropousse" },
              { text: "Kits", link: "/shop?type=kits" },
            ],
          },
          { text: "Contact", link: "/contact" },
        ],
      };
    },
    methods: {
      close() {
        this.isOpened = false;
      },
      setCartOpened() {
        this.isOpened = "cart";
      },
      setMenuOpened() {
        this.isOpened = "menu";
      },
    },
    watch: {
      $route(newValue, oldValue) {
        this.isOpened = false;
      },
    },
  };
</script>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  width: 100%;
  height: var(--h-menu);
  @media (min-width: 1200px) {
    justify-content: space-around;
  }
}

.logo {
  height: var(--h-menu);
}

.container--header {
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  max-width: 1200px;
  padding: 0 var(--p-section);
  height: 100%;
}

.menu--mobile {
  position: absolute;
  top: 1rem;
  bottom: 0;
  right: 0;
  border-radius: 5% 0 0 5%;
  border: 0;
  overflow: hidden;
  width: 16rem;
  color: var(--font-light);
  background-color: var(--clr-brand-darker);
  height: max-content;
}

.nav-item {
  display: block;
  padding: 0.5em 1.8em;
  font-weight: 600;
  position: relative;
  letter-spacing: 0.11em;
}

.with--submenu::after,
.with--submenu--mobile::after {
  content: "";
  position: absolute;
  border: 0.4em solid transparent;
  border-left-color: currentColor;
  top: 1em;
  left: 0.8em;
}

.input-nav-mobile {
  display: none;
}

.with--submenu:hover::after,
.input-nav-mobile:checked ~ .with--submenu--mobile::after {
  border-top-color: currentColor;
  border-left-color: transparent;
  top: 1.2em;
  left: 0.55em;
}

.input-nav-mobile:checked ~ label {
  color: var(--clr-brand-light);
}

.nav-item::before {
  content: "";
  background-color: currentColor;
  position: absolute;
}

.nav-item:hover,
.nav-item:focus {
  color: var(--clr-brand-normal);
}

.submenu--desktop,
.submenu--mobile,
.with--submenu::after {
  transition: all 400ms ease-in-out;
  transition-delay: 200ms;
}
.nav-item > .submenu--desktop {
  border: 1px solid var(--bg-darker);
  color: var(--font-light);
  border-radius: 5%;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 3.2em;
  height: max-content;
  opacity: 0;
  overflow: hidden;
  visibility: hidden;
  background-color: var(--clr-brand-darker);
}

.nav-item:hover > .submenu--desktop {
  opacity: 1;
  visibility: visible;
}

nav-item-popup {
  padding: 0.75em 1.5em;
  margin: 0;
}

.nav-item-popup::before {
  height: 100%;
  width: 0.3em;
  top: 0;
  left: -0.3em;
  transition: all 250ms ease-in;
}

.nav-item-popup:hover,
.nav-item-popup:focus {
  color: var(--clr-brand-darker);
  background: var(--bg-light);
}

.nav-item-popup:hover::before,
.nav-item-popup:focus::before {
  left: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 300ms ease-in;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(18rem);
  opacity: 0;
}
</style>