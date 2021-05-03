<template>
  <header class="bg-white">
    <nuxt-link to="/">
      <img src="@/assets/logo.jpg" class="w-32" alt="logo" />
    </nuxt-link>
    <nav class="flex items-center">
      <!-- MENU part only for md+  -->
      <div class="md:flex hidden menu--desktop">
        <nuxt-link
          v-for="item in menu"
          :key="item.text"
          :to="item.link"
          class="nav-item"
          >{{ item.text }}</nuxt-link
        >
      </div>
      <!-- END MENU part only for sm+  -->
    </nav>

    <div class="flex items-center w-32 justify-end">
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
        <nuxt-link
          v-for="item in menu"
          :key="item.text"
          :to="item.link"
          class="nav-item"
          >{{ item.text }}</nuxt-link
        >
      </nav>
    </transition>
    <!-- END Absolute Menu only for mobile if opened-->
  </header>
</template>

<script>
  export default {
    data() {
      return {
        isOpened: false,
        menu: [
          { text: "La ferme", link: "/farm" },
          { text: "Blog", link: "/blog" },
          { text: "Boutique", link: "/shop" },
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

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  width: 100%;
  height: var(--h-menu);
  padding: 0 2rem;
  border-bottom: 1px solid var(--bg-dark);
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
.menu--mobile .nuxt-link-active {
  background: var(--clr-brand-light);
}
.nav-item {
  display: block;
  margin: 0.5em 1em;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.11em;
}

.menu--mobile > .nav-item {
  padding: 0.75em 1.5em;
  margin: 0;
}
.menu--mobile > .nav-item:hover,
.menu--mobile > .nav-item:focus {
  color: var(--clr-brand-darker);
  background: var(--bg-light);
}
.nav-item::after {
  content: "";
  background-color: currentColor;
  position: absolute;
}

.menu--desktop > .nav-item::after,
.menu--desktop > .nav-item:focus::after {
  height: 0.2em;
  width: 100%;
  bottom: 0;
  right: 0;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 250ms ease-in;
}

.menu--desktop > .nav-item:hover::after,
.menu--desktop > .nav-item:focus::after {
  transform: scaleX(1);
  transform-origin: left;
}

.menu--mobile > .nav-item::after {
  height: 100%;
  width: 0.3em;
  top: 0;
  left: -0.3em;
  transition: all 250ms ease-in;
}

.menu--mobile > .nav-item:hover::after,
.menu--mobile > .nav-item:focus::after {
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