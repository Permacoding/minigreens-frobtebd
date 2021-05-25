<template>
  <section class="container__section">
    <h1 class="page__title mt-6">Contactez-nous</h1>
    <div class="contact__content">
      <div class="contact__infos">
        <div class="contact__line">
          <fa-icon icon="map-marker-alt" style="font-size: 32px" />
          <p v-html="address ? $md.render(address) : ''"></p>
        </div>
        <div class="contact__line">
          <fa-icon icon="phone-alt" style="font-size: 32px" />
          <p>{{ phone }}</p>
        </div>
        <div class="contact__line">
          <fa-icon :icon="['far', 'envelope']" style="font-size: 32px" />
          <span> {{ email }}</span>
        </div>
      </div>
      <div class="contact__form">
        <div class="form__col">
          <h2 class="form__col__title">Formulaire de contact</h2>
          <FormulateForm
            v-model="formContact"
            class="form__order"
            ref="form"
            @validation="formIsValid = $refs.form ? $refs.form.isValid : false"
          >
            <div class="form__contact__line">
              <FormulateInput
                type="text"
                name="lastname"
                label="Nom *"
                validation-name="Nom "
                validation="required"
                class="min-w-44"
              />
              <FormulateInput
                type="text"
                name="firstname"
                label="Prénom *"
                validation-name="Prenom"
                validation="required"
                class="min-w-44"
              />
            </div>
            <FormulateInput
              type="email"
              name="email"
              label="E-mail *"
              validation="required|email"
              class="max-w-88"
            />
            <FormulateInput
              type="textarea"
              label="Message"
              name="message"
              validation="required"
            />
            <loading-button
              :loading="loading"
              :disabled="!formIsValid"
              @click="handleSubmit()"
              class="button__action text-xl self-center mt-4 min-w-80"
              >Envoyer votre message</loading-button
            >
          </FormulateForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script >
  import { getMetaTags } from "../utils/seo";
  import { getStrapiMedia } from "../utils/medias";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        formContact: {},
        loading: false,
        formIsValid: false,
      };
    },
    computed: mapGetters({
      global: "global/getGlobal",
      instagram: "contact/getInstagram",
      facebook: "contact/getFacebook",
      phone: "contact/getPhone",
      email: "contact/getEmail",
      address: "contact/getAddress",
    }),

    methods: {
      async handleSubmit() {
        if (this.formIsValid) {
          this.loading = true;
          try {
            await this.$strapi.$messages.create(this.formContact).then(() => {
              this.$toast.success("Message envoyé.");
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
.contact__content {
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
}
.contact__content > * {
  flex-basis: 100%;
}
.contact__infos {
  display: flex;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  color: var(--clr-brand-darker);
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.contact__line {
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
}
.form__contact__line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -1rem;
}
.form__contact__line > * {
  margin-left: 1rem;
  flex-grow: 1;
}
.contact__line > * + * {
  margin-left: 2rem;
}
</style>
