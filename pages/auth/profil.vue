<template>
  <div class="max-w-screen-lg mx-auto">
    <FormulateForm v-model="formValues" class="flex flex-col w-full flex-grow">
      <h1 class="text-center mt-2 mb-4">Profil</h1>
      <div class="form-2-col">
        <FormPersonal class="form-col w-full" :disableEmail="true"
          >Informations personnelles</FormPersonal
        >
        <FormAddress class="form-col w-full"
          >Adresse de Facturation</FormAddress
        >
      </div>
      <loading-button
        :loading="loading"
        @click="register()"
        class="bg-indigo-500 text-gray-200 my-2 w-80 self-end button-default"
        >Mettre à jour</loading-button
      >
    </FormulateForm>
  </div>
</template>

<script >
  import { getMetaTags } from "@/utils/seo";
  import { getStrapiMedia } from "@/utils/medias";
  import { mapGetters } from "vuex";

  export default {
    middleware: ["authentificated"],
    mounted() {
      this.formValues = this.$strapi.user;
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
      async updateUser() {
        this.loading = true;
        try {
          // const res = await this.$strapi.register(this.formValues);
          this.$toast.success("Informations personnelles mises a jour.");
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
