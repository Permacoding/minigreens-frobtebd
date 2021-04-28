<template>
  <div>
    <div
      id="cart"
      @click="isOpen = isOpen === false ? 'cart' : false"
      class="relative mr-1 cursor-pointer cart"
    >
      <fa-icon icon="shopping-cart" class="text-2xl"></fa-icon>
      <span
        class="absolute top-0 right-1 -mt-3 -mr-4 px-2 text-center rounded-full bg-gray-200 text-gray-900 text-sm font-bold"
        >{{ nbCartItems }}</span
      >
    </div>

    <transition name="slide-left">
      <div
        id="cart--sidebar"
        class="cart--sidebar mt-16"
        v-show="isOpen"
        v-closable="{
          exclude: ['hamburger', 'cart', 'menu--mobile', 'cart--sidebar'],
          handler: 'closeCart',
        }"
      >
        <div v-if="nbCartItems > 0"></div>
        <div
          class="flex h-12 items-center justify-center text-sm border border-dashed border-t-0 border-r-0 border-l-0 border-gray-900 mx-2 my-2"
          v-else
        >
          Pas de produits dans votre Panier
        </div>
        <AuthLinks />
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    props: {
      isCartOpened: {
        required: true,
      },
    },
    methods: {
      closeCart() {
        this.isOpen = false;
      },
    },

    computed: {
      ...mapGetters({
        nbCartItems: "products/nbCartItems",
        cartItems: "products/getCart",
      }),
      isOpen: {
        get: function () {
          return this.isCartOpened === "cart";
        },
        set: function (value) {
          this.$emit(`update:isOpen`, value);
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
.cart--sidebar {
  @apply absolute top-4 right-0 w-64 bg-gray-200 border  border-r-0 border-gray-600 flex flex-col;
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