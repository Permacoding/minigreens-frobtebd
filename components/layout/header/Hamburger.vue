<template>
  <div
    id="hamburger"
    class="hamburger flex cursor-pointer"
    :class="{ 'hamburger--is-open': isOpen }"
    @click="isOpen = !isOpen"
  >
    <div class="hamburger__item hamburger__item--first"></div>
    <div class="hamburger__item hamburger__item--middle"></div>
    <div class="hamburger__item hamburger__item--last"></div>
  </div>
</template>

<script>
  import { mapGetters, mapMu } from "vuex";
  export default {
    props: {
      modalOpenedName: {
        required: true,
      },
    },

    computed: {
      isOpen: {
        get: function () {
          return this.modalOpenedName === "menu";
        },
        set: function (value) {
          this.$emit(`update:isOpen`, value);
        },
      },
    },
  };
</script>

<style lang="scss">
.hamburger {
  height: 25px;
  width: 29px;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }

  &__item {
    height: 4px;
    width: 100%;
    background: black;
    transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
      opacity 300ms linear;

    &--first {
      .hamburger--is-open & {
        transform: translate(0, 10.5px) rotate(45deg);
      }
    }

    &--middle {
      .hamburger--is-open & {
        opacity: 0;
      }
    }

    &--last {
      .hamburger--is-open & {
        transform: translate(0, -10.5px) rotate(-45deg);
      }
    }
  }
}
</style>