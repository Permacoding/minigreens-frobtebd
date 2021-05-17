<template>
  <div class="spinner">
    <div class="spinner__button spinner__button--prev" @click="add(-1)">-</div>
    <input
      type="number"
      class="input__number"
      value="1"
      v-model="inputNumber"
    />
    <div class="spinner__button spinner__button--next" @click="add()">+</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputNumber: 1,
      };
    },
    methods: {
      add(value = 1) {
        this.inputNumber = Math.max(0, this.inputNumber + value);
      },
    },
    watch: {
      inputNumber(newValue, oldValue) {
        this.$emit("changeNumber", newValue);
      },
    },
  };
</script>

<style lang="scss" scoped>
.spinner {
  position: relative;
  display: flex;
}
input.input__number::-webkit-outer-spin-button,
input.input__number::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.spinner__button {
  background-color: var(--clr-brand-light);
  width: 2rem;
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-font-light);
  cursor: pointer;
  user-select: none;
  &--prev {
    border-radius: 10px 0 0 10px;
  }
  &--next {
    border-radius: 0 10px 10px 0;
  }
}

.input__number {
  -moz-appearance: textfield;
  width: 3rem;
  height: 2.5rem;
  text-align: center;
  border: 1px solid var(--clr-brand-light);
  color: var(--clr-brand-darker);
}
</style>