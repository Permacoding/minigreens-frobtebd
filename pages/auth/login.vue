<template>
  <div class="container-section">
    <h1 class="text-2xl font-semibold text-center">Connexion</h1>
    <p class="font-light text-center text-sm mb-6 mt-1">
      Pas encore de compte ?
      <nuxt-link to="/auth/register" class="link">Inscription</nuxt-link>
    </p>
    <FormulateForm v-model="formValues" class="max-w-88 m-auto flex flex-col">
      <FormulateInput
        type="email"
        name="identifier"
        label="Email"
        validation="required|email"
        class="max-w-88"
      />

      <FormulateInput
        type="password"
        name="password"
        label="Mot de passe"
        validation="required|min:6,length"
        validation-name="Mot de passe"
        class="max-w-80"
      />
      <loading-button
        :loading="loading"
        @click="login()"
        class="button__action text-lg self-center min-w-76 mt-4"
        >Se connecter</loading-button
      >
      <nuxt-link
        to="/auth/forgottenPassword"
        class="self-center font-light mt-2 text-sm link"
        >Mot de passe oublie ?</nuxt-link
      >
    </FormulateForm>
  </div>
</template>

<script >
  import { getMetaTags } from "@/utils/seo";
  import { getStrapiMedia } from "@/utils/medias";
  import { mapGetters } from "vuex";

  export default {
    middleware: ["guest"],
    computed: mapGetters({
      global: "global/getGlobal",
    }),
    data() {
      return {
        loading: false,
        formValues: {},
      };
    },
    methods: {
      async login() {
        this.loading = true;
        try {
          console.log(this.formValues);
          await this.$strapi.login(this.formValues);
          this.$toast.success("Bienvenue " + this.$strapi.user.username);
          this.$router.push("/");
        } catch {}
        this.loading = false;
      },
    },
    head() {
      const { defaultSeo, favicon, siteName } = this.global;

      const fullSeo = {
        ...defaultSeo,
      };
      return {
        titleTemplate: `%s | ${siteName}`,
        title: fullSeo.metaTitle,
        meta: getMetaTags(fullSeo),
        link: [
          {
            rel: "icon",
            href: getStrapiMedia(favicon.url),
          },
        ],
      };
    },
  };
</script>

<style>
</style>
