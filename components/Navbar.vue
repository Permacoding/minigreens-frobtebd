<template>
  <div class="flex justify-end">
    <nuxt-link to="/farm" class="nav-item">La ferme</nuxt-link>
    <nuxt-link to="/blog" class="nav-item">Blog</nuxt-link>
    <nuxt-link to="/shop" class="nav-item">Boutique</nuxt-link>
    <nuxt-link to="/contact" class="nav-item">Contact</nuxt-link>
    <nuxt-link to="/auth/login" class="nav-item">Login</nuxt-link>
    <nuxt-link to="/cart" class="nav-item"
      ><fa-icon icon="shopping-cart"></fa-icon
    ></nuxt-link>
  </div>
</template>

<script>
  export default {};
</script>

<style>
.nav-item {
  @apply px-4 py-2;
}
</style>