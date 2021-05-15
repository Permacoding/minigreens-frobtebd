<template>
  <section class="carousel">
    <button
      class="carousel__button carousel__button--left"
      @click="currentIndex--"
      v-show="currentIndexModulo > 0"
      aria-label="Button Prev Slide"
    >
      <fa-icon icon="chevron-left" />
    </button>
    <div class="carousel__track-container">
      <ul class="carousel__track">
        <li
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel__slide"
          :style="
            'left:' +
            index * 100 +
            '%;background-image: url(' +
            getStrapiMedia(slide.background.url) +
            ');'
          "
          ref="slides"
        >
          <div class="carousel__content">
            <h2 class="slide__title">{{ slide.title }}</h2>
            <p>{{ slide.text }}</p>
            <nuxt-link :to="slide.button.link" class="button__action">{{
              slide.button.text
            }}</nuxt-link>
          </div>
        </li>
      </ul>
    </div>
    <button
      class="carousel__button carousel__button--right"
      @click="currentIndex++"
      v-show="currentIndexModulo < slides.length - 1"
      aria-label="Button Next Slide"
    >
      <fa-icon icon="chevron-right" />
    </button>
    <div class="carousel__nav">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ 'current-slide': index == currentIndexModulo }"
        class="carousel__indicator"
        @click="currentIndex = index"
      ></button>
    </div>
  </section>
</template>

<script>
  import { getStrapiMedia } from "@/utils/medias";

  export default {
    props: {
      slides: {
        type: Array,
        default: [],
        required: true,
      },
    },
    data() {
      return {
        currentIndex: 0,
      };
    },
    methods: {
      getStrapiMedia,
    },
    computed: {
      currentIndexModulo() {
        if (this.currentIndex == 0) return 0;
        return Math.abs(this.currentIndex % this.slides.length);
      },
    },
    watch: {
      currentIndexModulo(newIndexSlide, currentIndexSlide) {
        this.$refs.slides.forEach((slide, index) => {
          slide.style.transform = "translateX(" + -newIndexSlide * 100 + "%)";
        });
      },
    },
  };
</script>

<style lang="scss" >
.carousel {
  position: relative;
  width: 100%;
  height: max(40vw, 50vh);
}

.carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel__track-container {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
}

.carousel__track {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.carousel__slide {
  position: absolute;
  top: 0;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  transition: transform 0.6s;
  bottom: 0;
}

.carousel__button {
  position: absolute;
  z-index: 10;
  width: 2.2em;
  border-radius: 50%;
  height: 2.2em;
  font-size: 1.5em;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    svg {
      color: var(--clr-brand-light);
    }
  }
}
.carousel__button--left {
  left: 0.2em;
}
.carousel__button--right {
  right: 0.2em;
}

.carousel__nav {
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  gap: 1em;
  align-items: center;
  z-index: 10;
}

.carousel__indicator {
  width: 1rem;
  height: 1rem;
  background-color: var(--clr-brand-darker);
  opacity: 0.4;
  border-radius: 50%;

  &:hover {
    opacity: 1;
  }
}

.carousel__indicator.current-slide {
  background-color: var(--clr-brand-dark);
  opacity: 1;
}

.carousel__content {
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 1.5rem;
  max-width: 1200px;
  margin-left: 10vw;
  z-index: 10;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.8;
    z-index: -1;
  }
  .slide__title {
    font-size: min(10vw, 4.5em);
    margin-bottom: 0.2em;
    color: var(--clr-font-dark);
  }
  p {
    max-width: 40ch;
    font-weight: 600;
    color: var(--clr-font-gray);
  }
  .button__action {
    align-self: end;
    margin: 1em 0 0 0;
  }
}
</style>