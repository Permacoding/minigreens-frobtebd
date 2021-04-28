<template>
  <header class="bg-white">
    <nuxt-link to="/">
      <img src="@/assets/logo.jpg" class="w-32" alt="logo" />
    </nuxt-link>
    <nav class="flex items-center">
      <!-- MENU part only for md+  -->
      <div class="md:flex hidden">
        <nuxt-link
          v-for="item in menu"
          :key="item.text"
          :to="item.link"
          class="nav-item-mobile"
          >{{ item.text }}</nuxt-link
        >
      </div>
      <!-- END MENU part only for sm+  -->

      <!-- Absolute Menu only for mobile if opened -->
      <transition name="slide-left">
        <div
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
            class="nav-item-mobile"
            >{{ item.text }}</nuxt-link
          >
        </div>
      </transition>
      <!-- END Absolute Menu only for mobile if opened-->
    </nav>
    <div class="flex items-center" id="sidebar-mobile">
      <HamburgerMenu
        class="md:hidden mr-2"
        :isMenuOpened="isOpened"
        @update:isOpen="isOpened = $event"
      />

      <Cart
        class="nav-item"
        :isCartOpened="isOpened"
        @update:isOpen="isOpened = $event"
      />
    </div>
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
  @apply flex justify-between z-20 w-full fixed border border-r-0 border-l-0 border-t-0 shadow-sm top-0 right-0 left-0 items-center px-2 h-16;
}
.nav-item {
  @apply px-2;
}
.nav-item-mobile {
  @apply px-4 py-2 flex hover:bg-white;
}
.menu--mobile {
  @apply absolute top-0 bottom-0 right-0 w-64 bg-gray-200 border border-t-0 border-r-0 border-b-0 border-gray-600 h-screen flex flex-col;
}

.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition duration-300 ease-in;
}

.slide-left-enter, .slide-left-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(18rem);
  opacity: 0;
}
</style>