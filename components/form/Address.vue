<template>
  <div class="address">
    <FormulateInput type="group" :name="group">
      <div class="form-line">
        <FormulateInput
          type="text"
          name="last_name"
          label="Nom *"
          validation-name="Nom "
          validation="required"
          class="min-w-44"
        />
        <FormulateInput
          type="text"
          name="first_name"
          label="Prénom *"
          validation-name="Prenom"
          validation="required"
          class="min-w-44"
        />
      </div>
      <FormulateInput
        type="text"
        name="street"
        label="Numéro et nom de rue  *"
        validation-name="nom de rue"
        validation="required"
        class=""
      />

      <FormulateInput
        type="text"
        name="zipCode"
        label="Code postal  *"
        validation-name="code postal"
        validation="required"
        class="max-w-48"
      />

      <FormulateInput
        type="text"
        name="city"
        label="Ville  *"
        validation-name="Ville"
        validation="required"
        class="mr-2 flex-grow"
      />

      <FormulateInput
        type="text"
        name="phone"
        label="Téléphone *"
        validation-name="Telephone"
        validation="required"
        class="mr-2 flex-grow"
      />
    </FormulateInput>
  </div>
</template>

<script>
  export default {
    props: {
      group: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>