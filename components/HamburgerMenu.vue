<template>
  <div
    class="hamburger top-0 right-0 absolute mr-8 mt-8"
    @click="isOpen = !isOpen"
    :class="isOpen ? 'hamburger--is-open' : ''"
  >
    <div class="hamburger__item hamburger__item--first"></div>
    <div class="hamburger__item hamburger__item--middle"></div>
    <div class="hamburger__item hamburger__item--last"></div>
  </div>
</template>

<script>
  export default {
    name: "Hamburger",
    props: {
      isMenuOpened: {
        type: Boolean,
        required: true,
      },
    },

    computed: {
      isOpen: {
        get: function () {
          return this.isMenuOpened;
        },
        set: function (value) {
          this.$emit(`update:isMenuOpened`, value);
        },
      },
    },
  };
</script>

<style lang="scss">
.hamburger {
  height: 25px;
  width: 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }

  &__item {
    height: 4px;
    width: 100%;
    background: #f3a83b;
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