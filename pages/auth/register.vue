<template>
  <div class="container-section">
    <div class="auth__form__container">
      <div class="auth__form__header">
        <h1 class="auth__form__title">Inscription</h1>
        <p class="font-light text-center mb-6 text-sm mt-1">
          Déjà un compte ?
          <nuxt-link to="/auth/login" class="link">Connexion</nuxt-link>
        </p>
      </div>
      <FormulateForm v-model="formValues" class="auth__form">
        <FormulateInput
          type="text"
          name="username"
          label="Nom d'utilisateur *"
          validation="required"
          class="max-w-88"
        />
        <FormulateInput
          type="email"
          name="email"
          label="Email *"
          validation="required|email"
          class="max-w-88"
          placeholder="example@mail.com"
        />
        <FormulateInput
          type="password"
          name="password"
          label="Mot de passe *"
          validation="required|min:6,length"
          validation-name="Mot de passe"
          class="max-w-80"
        />
        <FormulateInput
          type="password"
          name="password_confirm"
          label="Confirmation mot de passe *"
          validation="required|confirm"
          validation-name="Confirmation"
          class="max-w-80"
        />
        <loading-button
          :loading="loading"
          @click="register()"
          class="button__action min-w-76 text-lg self-center mt-4"
          >S'inscrire</loading-button
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
    async mounted() {
      try {
        await this.$recaptcha.init();
      } catch (e) {
        console.error(e);
      }
    },
    beforeDestroy() {
      this.$recaptcha.destroy();
    },
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
          const token = await this.$recaptcha.execute("login");
          this.formValues.token = token;
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
