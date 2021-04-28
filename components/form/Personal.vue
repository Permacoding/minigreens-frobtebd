<template>
  <div class="personal">
    <h2 class="mb-4"><slot></slot></h2>
    <div class="form-line">
      <FormulateInput
        type="text"
        name="name"
        label="Nom *"
        validation-name="Nom "
        validation="required"
        class="mr-2 min-w-44 max-w-72 flex-grow"
      />
      <FormulateInput
        type="text"
        name="fname"
        label="Prénom *"
        validation-name="Prenom"
        validation="required"
        class="mr-2 min-w-44 max-w-72 flex-grow"
      />
    </div>
    <FormulateInput
      type="email"
      name="email"
      label="Email *"
      :disabled="disableEmail"
      validation="required|email"
      class="max-w-88"
      placeholder="example@mail.com"
    />
    <FormulateInput
      type="checkbox"
      name="create"
      label="Créer un compte ?"
      v-model="showPassword"
      wrapper-class="flex flex-row items-center "
      label-class="ml-4"
      v-if="askCreation"
    />
    <FormulateInput
      type="password"
      name="password"
      label="Mot de passe *"
      validation="required|min:6,length"
      validation-name="Mot de passe"
      v-if="showPassword"
      class="max-w-80"
    />

    <FormulateInput
      type="password"
      name="password_confirm"
      label="Confirmation mot de passe *"
      validation="required|confirm"
      validation-name="Confirmation"
      v-if="showPassword"
      class="max-w-80"
    />
  </div>
</template>

<script>
  export default {
    props: {
      askCreation: {
        type: Boolean,
        default: false,
      },
      showMdp: {
        type: Boolean,
        default: false,
      },
      disableEmail: {
        type: Boolean,
        default: false,
      },
    },
    created() {
      this.showPassword = this.showMdp;
    },
    data() {
      return {
        showPassword: true,
      };
    },
  };
</script>

<style lang="scss" scoped>
.personal > * {
  margin-bottom: 0.75rem;
}
</style>