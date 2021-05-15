<template>
  <header>
    <div class="container--header">
      <nuxt-link to="/">
        <img src="@/assets/logo.png" class="logo" alt="logo" />
      </nuxt-link>
      <HeaderMenuDesktop />
      <div class="icons__right">
        <HeaderHamburger
          class="hamburger__menu"
          :modalOpenedName="modalOpenedName"
          @update:isOpen="$event ? setModalOpenedName('menu') : closeModal()"
        />
        <HeaderCart
          :modalOpenedName="modalOpenedName"
          @update:isOpen="$event ? setModalOpenedName('cart') : closeModal()"
        />
      </div>
      <!-- Absolute Menu only for mobile if opened -->
      <transition name="slide-left">
        <HeaderMenuMobile v-show="modalOpenedName === 'menu'" />
      </transition>
      <transition name="slide-left">
        <HeaderCartSideBar v-show="modalOpenedName === 'cart'" />
      </transition>
      <!-- END Absolute Menu only for mobile if opened-->
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        modalOpenedName: "modal/getModalOpenedName",
      }),
    },
    methods: {
      ...mapMutations({
        closeModal: "modal/closeModal",
        setModalOpenedName: "modal/setModalOpenedName",
      }),
    },
    watch: {
      $route(newValue, oldValue) {
        this.closeModal();
      },
    },
  };
</script>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  width: 100%;
  background-color: white;
  height: var(--h-menu);
}

.container--header {
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  max-width: 1200px;
  padding: 0 var(--p-section);
  height: 100%;
}

.logo {
  height: var(--h-menu);
}
.icons__right {
  display: flex;
  align-items: center;
  .hamburger__menu {
    margin-right: 1em;
    display: none;
    @media (max-width: 800px) {
      display: flex;
    }
  }
}
</style>