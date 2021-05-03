<template>
  <div class="auth-container">
    <h1 class="text-2xl font-semibold text-center mb-4">
      Mot de passe oublié ?
    </h1>
    <FormulateForm v-model="formValues" class="flex flex-col">
      <div class="form-col">
        <FormulateInput
          type="email"
          name="email"
          label="Email"
          validation="required|email"
          :input-class="'w-80'"
          class="mx-auto mb-4"
          placeholder="example@mail.com"
        />
        <loading-button
          :loading="loading"
          @click="sendForgotPasswordMail()"
          class="bg-indigo-500 text-gray-200 my-2"
          >Envoyer le mail de réinitialisation</loading-button
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
