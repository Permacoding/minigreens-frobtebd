<template>
  <nav
    class="flex items-center justify-end text-lg tracking-wide font-semibold"
  >
    <!-- MENU part only for sm+  -->
    <div class="sm:flex hidden">
      <nuxt-link to="/farm" class="nav-item">La ferme</nuxt-link>
      <nuxt-link to="/blog" class="nav-item">Blog</nuxt-link>
      <nuxt-link to="/shop" class="nav-item">Boutique</nuxt-link>
      <nuxt-link to="/contact" class="nav-item">Contact</nuxt-link>
      <nuxt-link to="/auth/login" class="nav-item" v-if="!$strapi.user"
        >Login</nuxt-link
      >
      <div v-else>
        <nuxt-link to="/auth/profil" class="nav-item">
          {{ $strapi.user.username }}
        </nuxt-link>
        <span @click="logout" class="nav-item cursor-pointer">
          <fa-icon icon="sign-out-alt"></fa-icon>
        </span>
      </div>
    </div>
    <!-- END MENU part only for sm+  -->

    <!--  CART -->
    <nuxt-link to="/cart" class="nav-item"
      ><fa-icon icon="shopping-cart"></fa-icon
    ></nuxt-link>
    <!-- END CART -->

    <!-- Absolute Menu for mobile -->
    <div class="menu--mobile" v-show="isOpened">
      <nuxt-link to="/farm" class="nav-item-mobile">La ferme</nuxt-link>
      <nuxt-link to="/blog" class="nav-item-mobile">Blog</nuxt-link>
      <nuxt-link to="/shop" class="nav-item-mobile">Boutique</nuxt-link>
      <nuxt-link to="/contact" class="nav-item-mobile">Contact</nuxt-link>
      <nuxt-link to="/auth/login" class="nav-item-mobile" v-if="!$strapi.user"
        >Login</nuxt-link
      >
      <div v-else>
        <nuxt-link to="/auth/profil" class="nav-item">
          {{ $strapi.user.username }}
        </nuxt-link>
        <span @click="logout" class="nav-item cursor-pointer">
          <fa-icon icon="sign-out-alt"></fa-icon>
        </span>
      </div>
    </div>
    <!-- END Absolute Menu for mobile -->
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        isOpened: true,
      };
    },
    methods: {
      async logout() {
        this.$loading = true;
        try {
          await this.$strapi.logout();
          this.$toast.success("Deconnection");
        } catch {}
        this.$loading = false;
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
.nav-item {
  @apply px-4 py-2;
}
.nav-item-mobile {
  @apply px-4 py-2 flex hover:bg-white;
}
.menu--mobile {
  @apply absolute top-0 right-0 w-64 bg-gray-200 border border-t-0 border-r-0 border-b-0 border-gray-600 h-screen flex flex-col;
}
</style>