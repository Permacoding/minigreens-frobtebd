<template>
  <div>
    <h2 class="mb-4">
      <slot></slot>
    </h2>
    <FormulateInput
      type="text"
      name="num"
      label="Numéro et nom de rue  *"
      validation-name="nom de rue"
      validation="required"
      class="mr-2 flex-grow"
    />

    <FormulateInput
      type="text"
      name="num"
      label="Code postal  *"
      validation-name="code postal"
      validation="required"
      class="mr-2 flex-grow max-w-48"
    />

    <FormulateInput
      type="text"
      name="num"
      label="Ville  *"
      validation-name="Ville"
      validation="required"
      class="mr-2 flex-grow"
    />

    <FormulateInput
      type="text"
      name="num"
      label="Téléphone *"
      validation-name="Telephone"
      validation="required"
      class="mr-2 flex-grow"
    />
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
</style>