<template>
  <div class="container-section order">
    <div class="order__header">
      <h1>Ma Commande</h1>
      <nuxt-link to="/auth/login" class="button__action--secondary--light"
        >Déjà un compte ? Connectez-vous.</nuxt-link
      >
    </div>
    <FormulateForm v-model="formOrder" class="form__order">
      <div class="form_col">
        <h2 class="mb-4">Détails de Facturation</h2>
        <FormAddress suffix="_paiement" />
        <FormulateInput
          type="email"
          name="email"
          label="E-mail *"
          validation="required|email"
          class="max-w-88"
        />
      </div>
      <div class="form_col">
        <h2 class="mb-4">Détails de Livraison</h2>
        <FormAddress suffix="_delivery" />
      </div>
    </FormulateForm>
  </div>
</template>

<script >
  import { getStrapiMedia } from "../utils/medias";
  import { mapGetters } from "vuex";
  import { getMetaTags } from "../utils/seo";

  export default {
    data() {
      return {
        formOrder: {},
      };
    },
    computed: mapGetters({
      global: "global/getGlobal",
    }),

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

<style lang="scss">
.order {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  h1 {
    font-weight: 600;
    font-size: 2.2rem;
  }
  h2 {
    color: var(--clr-font-gray);
    font-size: 1.6rem;
    font-weight: 600;
  }
}
.order__header {
  margin: 2rem 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.form__order {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.form_col {
  min-width: min(100%, 25rem);
  max-width: 40rem;
  flex-grow: 1;
}
</style>
