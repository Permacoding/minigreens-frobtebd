<template>
  <div class="max-w-screen-sm mx-auto">
    <FormulateForm
      v-model="formValues"
      class="flex flex-col elevation-3 border py-3 rounded-lg"
    >
      <h1 class="text-xl font-semibold text-center my-2">Se Connecter</h1>
      <p class="font-light text-center my-2">
        Pas encore de compte ?
        <nuxt-link to="/auth/register">Inscription</nuxt-link>
      </p>
      <FormulateInput
        type="email"
        name="email"
        label="Email"
        validation="required|email"
        :input-class="'w-64'"
        class="my-2 flex justify-center"
        placeholder="example@mail.com"
      />

      <FormulateInput
        type="password"
        name="password"
        label="Mot de passe"
        validation="required|min:6,length"
        class="my-2 flex justify-center"
        :input-class="'w-64'"
      />

      <loading-button
        :loading="loading"
        @click="login()"
        class="bg-indigo-500 text-gray-200 my-2 self-center"
        >Login</loading-button
      >
      <nuxt-link
        to="/auth/forgottenPassword"
        class="self-center font-ligth my-2"
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
      login() {
        console.log(this.formValues);
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
