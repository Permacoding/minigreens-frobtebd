<template>
  <div class="cart__sidebar">
    <div class="cart__sidebar__header" @click="closeCart()">
      <fa-icon icon="chevron-left" />
      Continuer mes achats
    </div>
    <div class="cart__sidebar__content">
      <div class="w-full" v-if="nbCartItems > 0">
        <div class="cart__item cart__item--header">
          <div>Produit</div>
          <div>Quantité</div>
          <div>Prix (€)</div>
        </div>
        <ul class="cart__list">
          <li
            class="cart__item"
            v-for="item in cartItems"
            :key="item.product.id"
          >
            <nuxt-link
              :to="'/shop/' + item.product.slug"
              class="cart__product__link"
              >{{ item.product.title }}</nuxt-link
            >
            <div>{{ item.quantity }}</div>
            <div>
              {{ item.product.price * item.quantity }}
              <fa-icon
                :icon="['far', 'trash-alt']"
                class="trash__icon"
                @click="setCartItem({ product: item.product, quantity: 0 })"
              />
            </div>
          </li>
        </ul>
      </div>
      <span class="cart__empty" v-else>
        Pas de produits dans votre Panier
      </span>
    </div>
    <div class="cart__sidebar__footer">
      <div class="cart__sidebar__subtotal">
        <div>
          Total :
          <span class="nb--items">( {{ nbCartProducts }} produits )</span>
        </div>
        <span class="price--total">{{ cartPrice }} €</span>
      </div>
      <nuxt-link
        class="cart__checkout button__action"
        to="/orders"
        :disabled="nbCartItems == 0"
      >
        Commander
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  export default {
    computed: {
      ...mapGetters({
        nbCartItems: "products/nbCartItems",
        nbCartProducts: "products/getNbCartProducts",
        cartItems: "products/getCart",
        cartPrice: "products/getCartTotalPrice",
      }),
    },
    methods: {
      ...mapMutations({
        closeCart: "modal/closeModal",
        setCartItem: "products/setCartItem",
      }),
    },
  };
</script>

<style lang="scss" scoped>
.cart__sidebar {
  position: absolute;
  height: calc(100vh - var(--h-menu));
  top: var(--h-menu);
  right: 0;
  background-color: white;
  border-left: 1px solid var(--clr-brand-darker);
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22rem;
  font-weight: 600;
}
.cart__sidebar__header {
  svg {
    margin-right: 0.2em;
  }
  font-size: 1em;
  text-transform: uppercase;
  color: var(--clr-font-light);
  padding: 1.3em 1em;
  background-color: var(--clr-brand-darker);
  cursor: pointer;
}

.cart__sidebar__content {
  flex-grow: 1;
  display: flex;
}

.cart__empty {
  align-self: center;
  margin: auto;
}

.cart__item--header {
  border-bottom: 1px solid var(--clr-brand-dark);
}
.cart__product__link:hover {
  text-decoration: underline;
}
.cart__item {
  &:not(.cart__item--header):hover,
  &:not(.cart__item--header):focus {
    background-color: var(--clr-font-light);
  }
  display: flex;
  align-items: center;
  padding: 0.9em 0.7em;
  :nth-child(1) {
    flex-basis: 50%;
  }
  :nth-child(2) {
    flex-basis: 25%;
    text-align: center;
  }
  :nth-child(3) {
    flex-basis: 25%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.cart__item--header {
  font-weight: light;
}

.cart__sidebar__footer {
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-size: 1.2em;
  color: var(--clr-font-light);
  background-color: var(--clr-brand-darker);
  padding: 0.8em 1em;
}
.cart__sidebar__subtotal {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
.nb--items {
  font-weight: 400;
}
</style>