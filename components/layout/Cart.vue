<template>
  <div>
    <div
      class="clickable-background"
      @click="isOpen = false"
      v-show="isOpen"
    ></div>
    <div
      id="cart"
      @click="isOpen = isOpen === false ? 'cart' : false"
      class="relative mr-1 cursor-pointer cart"
    >
      <fa-icon icon="shopping-cart" class="text-2xl"></fa-icon>
      <span
        class="absolute top-0 right-0 -mt-3 -mr-4 px-2 text-center rounded-full bg-gray-200 text-gray-900 text-sm font-bold"
        >{{ nbCartItems }}</span
      >
    </div>

    <transition name="slide-left">
      <div id="cart--sidebar" class="cart--sidebar mt-16" v-show="isOpen">
        <div v-if="nbCartItems > 0">
          <div class="cart-item font-light">
            <span>Produit</span>
            <span>Quantité </span>
            <span>Prix</span>
          </div>
          <div
            class="cart-item"
            v-for="item in cartItems"
            :key="item.product.id"
          >
            <nuxt-link :to="'/shop/' + item.product.slug">{{
              item.product.title
            }}</nuxt-link>
            <span>{{ item.quantity }} </span>
            <span>{{ item.product.price * item.quantity }} </span>
          </div>
        </div>
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
  position: absolute;
  height: 100vh;
  top: 0.5rem;
  right: 0;
  padding: 0.5rem;
  background-color: var(--clr-brand-darker);
  color: var(--font-light);
  z-index: 20;
  display: flex;
  font-weight: 600;
  flex-direction: column;
  width: 22rem;
}

.cart-item {
  display: flex;
  padding: 0.2rem;
}
.cart-item > * {
  min-width: 5rem;
  flex-basis: 33%;
  display: flex;
  align-items: center;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 300ms ease-in;
}

.slide-left-enter, .slide-left-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(22rem);
  opacity: 0;
}
</style>