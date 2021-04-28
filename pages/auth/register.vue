<template>
  <div class="flex flex-col max-w-screen-xl w-full py-3 m-auto">
    <h1 class="text-3xl font-semibold text-center">Inscription</h1>
    <p class="font-light text-center mb-6 text-sm mt-1">
      Déjà un compte ?
      <nuxt-link to="/auth/login" class="link">Connexion</nuxt-link>
    </p>
    <FormulateForm
      v-model="formValues"
      class="flex flex-col justify-center max-w-screen-lg m-auto w-full"
    >
      <div class="form-content">
        <FormPersonal class="split" :askCreation="false"
          >Informations personnelles</FormPersonal
        >
        <FormAddress class="split">Adresse de Facturation</FormAddress>
      </div>
      <div class="flex flex-col items-center mt-4">
        <loading-button
          :loading="loading"
          @click="register()"
          class="bg-indigo-500 text-gray-200 mt-4 min-w-76"
          >S'inscrire</loading-button
        >
      </div>
    </FormulateForm>
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
.form-content {
  @apply flex  flex-wrap flex-1 w-full;
}

.form-line {
  @apply flex flex-wrap justify-between;
}
.split {
  @apply flex flex-col  min-w-96 max-w-screen-sm flex-grow pl-4 self-start mx-auto;
}
.split > * {
  margin-bottom: 0.75rem;
}
.form-content > * {
  flex-basis: 50%;
}
</style>
