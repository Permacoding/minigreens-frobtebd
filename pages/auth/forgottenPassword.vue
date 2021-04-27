<template>
  <div class="max-w-screen-sm mx-auto">
    <FormulateForm
      v-model="formValues"
      class="flex flex-col elevation-3 border py-3 rounded-lg"
    >
      <h1 class="text-xl font-semibold text-center my-2">
        Mot de passe oublié ?
      </h1>
      <FormulateInput
        type="email"
        name="email"
        label="Email"
        validation="required|email"
        :input-class="'w-64'"
        class="my-2 justify-center flex"
        placeholder="example@mail.com"
      />
      <loading-button
        :loading="loading"
        @click="sendForgotPasswordMail()"
        class="bg-indigo-500 text-gray-200 my-2 self-center"
        >Envoyer le mail de réinitialisation</loading-button
      >
    </FormulateForm>
  </div>
</template>

<script >
  import { getMetaTags } from "@/utils/seo";
  import { getStrapiMedia } from "@/utils/medias";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        loading: false,
        formValues: {},
      };
    },
    computed: mapGetters({
      global: "global/getGlobal",
    }),
    methods: {
      async sendForgotPasswordMail() {
        this.loading = true;
        try {
          await this.$strapi.forgotPassword(this.formValues);
          this.$toast.success(
            "Nous venons de vous envoyer un mail afin de réintialiser votre mot de passe."
          );
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
