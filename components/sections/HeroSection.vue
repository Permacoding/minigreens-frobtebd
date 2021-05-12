<template>
  <section class="hero-image">
    <div class="container-section">
      <transition-group name="fade">
        <div
          class="hero-content"
          v-for="slide in currentSlide"
          :key="slide.title"
        >
          <h1>{{ slide.title }}</h1>
          <p>
            {{ slide.text }}
          </p>
          <div class="hero-nav">
            <div class="next-prev">
              <fa-icon
                icon="chevron-left"
                class="chevron"
                @click="previousSlide()"
              />
              <fa-icon
                icon="chevron-right"
                class="chevron"
                @click="nextSlide()"
              />
            </div>
            <nuxt-link class="button--action mb-4" :to="slide.button.link"
              >{{ slide.button.text }}
            </nuxt-link>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
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
      previousSlide() {
        this.currentIndex--;
      },
      nextSlide() {
        this.currentIndex++;
      },
    },
    computed: {
      currentIndexModulo() {
        if (this.currentIndex == 0) return 0;
        return Math.abs(this.currentIndex % this.slides.length);
      },
      currentSlide() {
        return this.slides.filter((e, index) => {
          return index == this.currentIndexModulo;
        });
      },
    },
  };
</script>

<style >
/* The hero image */
.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("@/assets/hero_section2.jpg");
  height: 70vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  max-width: 75ch;
  font-weight: 500;
  font-size: 1.4em;
  top: 50%;
  transform: translate(0%, -50%);
  color: white;
  padding: 1.8em;
  background-color: var(--clr-brand-darker);
  box-shadow: 1em 1em 2em 2em rgba(159, 213, 144, 0.15),
    -1em -1em 2em 2em rgba(159, 213, 144, 0.15);
}
.hero-content > h1 {
  font-size: max(3vw, 2em);
  position: relative;
  margin-bottom: 0.8em;
  line-height: 0.8em;
}
.hero-content > h1::before {
  content: "";
  position: absolute;
  top: -0.8rem;
  z-index: 1;
  left: -4.5rem;
  width: calc(100% + 4.5rem);
  height: calc(100% + 2rem);
  transform: translateY(-5%);
  background-color: var(--clr-brand-yellow);
  z-index: -1;
}
.hero-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hero-nav > * {
  margin-top: 1em;
}
.chevron {
  font-size: 1.6em;
  margin: 0 0.3em;
  cursor: pointer;
}
.chevron:hover {
  color: var(--clr-brand-light);
}

@media (max-width: 520px) {
  .hero-nav {
    flex-wrap: wrap-reverse;
  }
  .hero-content {
    font-size: 1.2em;
  }
}
</style>