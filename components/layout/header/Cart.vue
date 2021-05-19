<template>
  <div class="cart__icon" @click="isOpen = !isOpen">
    <fa-icon icon="shopping-cart"></fa-icon>
    <span class="badge--nb--items">{{ nbCartItems }}</span>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    props: {
      modalOpenedName: {
        type: String,
        default: "",
      },
    },
    computed: {
      ...mapGetters({
        nbCartItems: "products/nbCartItems",
      }),
      isOpen: {
        get: function () {
          return this.modalOpenedName === "cart";
        },
        set: function (value) {
          this.$emit(`update:isOpen`, value);
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
.cart__icon {
  position: relative;
  cursor: pointer;
  font-size: 1.7em;
  .badge--nb--items {
    position: absolute;
    user-select: none;
    top: -0.5em;
    right: -0.5em;
    background-color: var(--clr-brand-normal);
    color: var(--clr-font-light);
    padding: 0 0.3em;
    font-size: 0.6em;
    font-weight: 600;
    border-radius: 50px;
  }
}
</style>