<template>
  <div class="max-w-screen-sm mx-auto">
    <FormulateForm
      v-model="formValues"
      class="flex flex-col elevation-3 border py-3 rounded-lg"
    >
      <h1 class="text-xl font-semibold text-center my-2">Inscription</h1>
      <p class="font-light text-center my-2">
        Deja un compte ?
        <nuxt-link to="/auth/login">Connexion</nuxt-link>
      </p>
      <FormulateInput
        type="text"
        name="username"
        label="Nom utilisateur"
        validation-name="Nom d'utilisateur"
        validation="required"
        :input-class="'w-64'"
        class="my-2 items-center flex flex-col"
      />

      <FormulateInput
        type="email"
        name="email"
        label="Email"
        validation="required|email"
        :input-class="'w-64'"
        class="my-2 items-center flex flex-col"
        placeholder="example@mail.com"
      />

      <FormulateInput
        type="password"
        name="password"
        label="Mot de passe"
        validation="required|min:6,length"
        validation-name="Mot de passe"
        class="my-2 items-center flex flex-col"
        :input-class="'w-64'"
      />

      <FormulateInput
        type="password"
        name="password_confirm"
        label="Confirmation mot de passe"
        validation="required|confirm"
        validation-name="Confirmation"
        class="my-2 items-center flex flex-col"
        :input-class="'w-64'"
      />

      <loading-button
        :loading="loading"
        @click="register()"
        class="bg-indigo-500 text-gray-200 my-2 self-center"
        >S'inscrire</loading-button
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
      async register() {
        this.loading = true;
        try {
          const res = await this.$strapi.register(this.formValues);
          this.$toast.success("Merci pour votre inscription.");
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
