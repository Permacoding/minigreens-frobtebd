<template>
  <div class="container-section order">
    <div class="order__header">
      <h1 class="page__title">Ma Commande</h1>
      <nuxt-link to="/auth/login" class="button__action--secondary--light"
        >Déjà un compte ? Connectez-vous.</nuxt-link
      >
    </div>
    <FormulateForm
      v-model="formOrder"
      ref="form"
      class="form__order"
      @validation="formIsValid = $refs.form.isValid"
      :keep-model-data="true"
    >
      <div class="form__line">
        <div class="form__col">
          <h2 class="form__col__title">Détails de Facturation</h2>
          <FormAddress group="addressPaiement" />
          <FormulateInput
            type="email"
            name="email"
            label="E-mail *"
            validation="required|email"
            class="max-w-88"
          />
        </div>
        <div class="form__col">
          <h2 class="form__col__title">Détails de Livraison</h2>
          <FormulateInput
            type="checkbox"
            name="sameAddress"
            label-position="before"
            label="Utiliser la même adresse pour la livraison ?"
            wrapper-class="flex flex-wrap items-center w-full"
            class="no-min-h mb-4"
            input-class="ml-4"
            v-model="sameAddress"
            ignored
          />
          <FormAddress group="addressDelivery" v-if="!sameAddress" />
        </div>
      </div>
      <div class="form__line">
        <CartList />
      </div>
      <loading-button
        :loading="loading"
        :disabled="!formIsValid"
        @click="handleSubmit()"
        class="button__action text-xl self-center mt-4 min-w-80"
        >Procéder au paiement</loading-button
      >
    </FormulateForm>
  </div>
</template>

<script >
  import { getStrapiMedia } from "@/utils/medias";
  import { mapGetters, mapMutations } from "vuex";
  import { getMetaTags } from "@/utils/seo";
  import { unwrapFormGroupData } from "@/utils/dataHandler";

  export default {
    data() {
      return {
        formOrder: {},
        nbProductToAdd: 0,
        sameAddress: true,
        loading: false,
        formIsValid: false,
      };
    },
    computed: {
      ...mapGetters({
        global: "global/getGlobal",
        cartItems: "products/getCart",
      }),
      unwrapedFormData() {
        return unwrapFormGroupData(this.formOrder);
      },
    },
    methods: {
      getStrapiMedia,
      ...mapMutations({
        setCartItem: "products/setCartItem",
      }),
      async handleSubmit() {
        if (this.formIsValid) {
          this.loading = true;
          try {
            await this.$strapi.$orders.create({
              ...this.unwrapedFormData,
              ...{ OrderDetail: this.cartItems },
            });
          } catch (e) {
            this.$toast.error(e);
          }
          this.loading = false;
        }
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

<style lang="scss" scoped>
</style>
