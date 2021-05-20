<template>
  <div class="form__col">
    <h2 class="form__col__title">Votre Panier</h2>
    <div v-if="cartItems.length">
      <div
        v-for="cartLine in cartItems"
        :key="cartLine.product.id"
        class="cart__item"
      >
        <div class="product__image">
          <img
            :src="
              getStrapiMedia(cartLine.product.images[0].formats.thumbnail.url)
            "
            :alt="cartLine.product.images[0].caption"
          />
        </div>
        <div class="product__title">
          {{ cartLine.product.title }}
        </div>
        <div class="product__quantity">
          <number-input
            :number="cartLine.quantity"
            :min="1"
            @changeNumber="
              setCartItem({ product: cartLine.product, quantity: $event })
            "
          ></number-input>
        </div>
        <div class="product__unit__price">
          {{ cartLine.product.price.toFixed(2) }} €
        </div>
        <div class="product__total__price">
          {{ (cartLine.product.price * cartLine.quantity).toFixed(2) }} €
        </div>
        <div class="product__remove">
          <fa-icon
            :icon="['far', 'trash-alt']"
            class="trash__icon"
            @click="setCartItem({ product: cartLine.product, quantity: 0 })"
          />
        </div>
      </div>
    </div>
    <div v-else class="empty__cart">Votre panier est vide.</div>
    <div class="cart__total__price">
      <span>Prix Panier :</span> {{ totalPrice }} €
    </div>
  </div>
</template>

<script>
  import { getStrapiMedia } from "@/utils/medias";
  import { mapGetters, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        global: "global/getGlobal",
        cartItems: "products/getCart",
        totalPrice: "products/getCartTotalPrice",
      }),
    },
    methods: {
      getStrapiMedia,
      ...mapMutations({
        setCartItem: "products/setCartItem",
      }),
    },
  };
</script>

<style lang="scss" scoped>
.cart__item {
  display: flex;
  width: 100%;
  margin: 1.5rem 0rem;
  align-items: center;
}

@media (max-width: 800px) {
  .product__image,
  .product__unit__price {
    display: none;
  }
}

.product__image {
  flex-basis: 40%;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product__title {
  flex-basis: 30%;
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0 0.5rem;
  text-align: center;
}

.product__quantity {
  flex-basis: 20%;
  height: 100%;
}

.product__unit__price {
  color: var(--clr-font-gray);
  font-weight: 600;
  font-size: 1.2rem;
  flex-basis: 20%;
  text-align: center;
  padding: 0 1rem;
}

.product__total__price {
  font-weight: 600;
  font-size: 1.3rem;
  flex-basis: 20%;
  text-align: center;
}
.product__remove {
  flex-basis: 10%;
}

.empty__cart {
  display: flex;
  height: 160px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--clr-font-gray);
  justify-content: center;
  align-items: center;
}
.cart__total__price {
  span {
    font-weight: 400;
  }
  align-self: end;
  font-weight: 700;
  font-size: 1.3em;
  padding: 0.4rem 1rem;
  color: var(--clr-font-light);
  background: var(--clr-brand-dark);
}
</style>