<template>
  <div class="container__section">
    <div class="auth__form__container">
      <div class="auth__form__header">
        <h1 class="auth__form__title">Connexion</h1>
        <p class="font-light text-center text-sm mt-1">
          Pas encore de compte ?
          <nuxt-link to="/auth/register" class="link">Inscription</nuxt-link>
        </p>
      </div>
      <FormulateForm v-model="formValues" class="auth__form">
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
          class="button__action text-lg self-center mt-4 w-full"
          >Se connecter</loading-button
        >
        <nuxt-link
          to="/auth/forgottenPassword"
          class="self-center font-light mt-2 text-sm link"
          >Mot de passe oublie ?</nuxt-link
        >
      </FormulateForm>
    </div>
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
