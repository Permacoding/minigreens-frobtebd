<template>
  <div class="address">
    <div class="form-line">
      <FormulateInput
        type="text"
        :name="'last_name' + suffix"
        label="Nom *"
        validation-name="Nom "
        validation="required"
        class="min-w-44"
      />
      <FormulateInput
        type="text"
        :name="'first_name' + suffix"
        label="Prénom *"
        validation-name="Prenom"
        validation="required"
        class="min-w-44"
      />
    </div>
    <FormulateInput
      type="text"
      :name="'street' + suffix"
      label="Numéro et nom de rue  *"
      validation-name="nom de rue"
      validation="required"
      class=""
    />

    <FormulateInput
      type="text"
      :name="'zipCode' + suffix"
      label="Code postal  *"
      validation-name="code postal"
      validation="required"
      class="max-w-48"
    />

    <FormulateInput
      type="text"
      :name="'city' + suffix"
      label="Ville  *"
      validation-name="Ville"
      validation="required"
      class="mr-2 flex-grow"
    />

    <FormulateInput
      type="text"
      :name="'phone' + suffix"
      label="Téléphone *"
      validation-name="Telephone"
      validation="required"
      class="mr-2 flex-grow"
    />
  </div>
</template>

<script>
  export default {
    props: {
      suffix: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>