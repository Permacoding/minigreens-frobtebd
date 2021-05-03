<template>
  <div class="flex flex-col items-center my-2">
    <nuxt-link
      to="/auth/login"
      class="button--action button--light text-sm my-1"
      v-if="!$strapi.user"
      >Se connecter</nuxt-link
    >
    <nuxt-link v-if="$strapi.user" to="/auth/profil" class="my-1">
      {{ $strapi.user.username }}
    </nuxt-link>
    <span
      @click="logout"
      v-if="$strapi.user"
      class="button--action button--dark my-1"
    >
      Se deconnecter
    </span>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log(this.$route.meta);
    },
    methods: {
      async logout() {
        this.$loading = true;
        try {
          await this.$strapi.logout();
          if (["auth-profil"].includes(this.$route.name))
            this.$router.push({ name: "auth-login" });
          this.$toast.success("Déconnection");
        } catch {}
        this.$loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>