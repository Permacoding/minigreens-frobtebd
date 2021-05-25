<template>
  <div>
    <div v-for="(tab, index) in tabs" :key="index" class="tab">
      <div
        class="tab__title"
        :class="{ displayed: index == currentTabDisplayed }"
        @click="currentTabDisplayed = index == currentTabDisplayed ? -1 : index"
      >
        {{ tab.title }}
      </div>
      <div
        class="tab__content"
        :class="{ displayed: index == currentTabDisplayed }"
        v-html="tab.content"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        currentTabDisplayed: 0,
      };
    },
  };
</script>

<style lang="scss" scoped>
.tab {
  border-top: 4px solid var(--clr-brand-normal);
}
.tab__title {
  position: relative;
  user-select: none;
  cursor: pointer;
  font-size: 1.7rem;
  padding: 0rem 0.4rem;
  color: var(--clr-font-dark);
  font-weight: 600;
  letter-spacing: 0.1ch;
  line-height: 140%;
  &::after {
    content: "+";
    position: absolute;
    right: 0;
    top: -0.1em;
  }
}
.tab__title.displayed::after {
  content: "-";
  right: 0.15em;
}

.tab__content {
  max-height: 0;
  overflow: hidden;
  transition: 0.4s ease;
  font-size: 0;
}
.tab__content.displayed {
  max-height: 1000px;
  padding: 0.8em;
  font-size: 1rem;
}
</style>