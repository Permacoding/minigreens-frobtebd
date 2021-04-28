<template>
  <div class="max-w-screen-sm mx-auto">
    <FormulateForm v-model="formValues" class="flex flex-col py-3">
      <h1 class="text-2xl font-semibold text-center">Connexion</h1>
      <p class="font-light text-center text-sm mb-6 mt-1">
        Pas encore de compte ?
        <nuxt-link to="/auth/register" class="link">Inscription</nuxt-link>
      </p>
      <FormulateInput
        type="email"
        name="identifier"
        label="Email"
        validation="required|email"
        :input-class="'w-full'"
        class="my-2 self-center flex flex-col w-64"
      />

      <FormulateInput
        type="password"
        name="password"
        label="Mot de passe"
        validation="required|min:6,length"
        validation-name="Mot de passe"
        class="my-2 self-center flex flex-col w-64"
        :input-class="'w-full'"
      />
      <loading-button
        :loading="loading"
        @click="login()"
        class="bg-indigo-500 text-gray-200 my-2 self-center"
        >Se connecter</loading-button
      >
      <nuxt-link
        to="/auth/forgottenPassword"
        class="self-center font-light my-2 text-sm link"
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
