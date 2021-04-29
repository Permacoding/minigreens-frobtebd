export const observer = {
    data() {
    return {
      observer: null,
          
    };
  },
  beforeMount() {
    this.observer = new IntersectionObserver(
      this.onElementObserved, 
      {
        threshold: 0,
        rootMargin:"0px 0px -150px 0px"
      }
    );
  },
  beforeDestroy() {
    console.log('destroy observer')
    this.observer.disconnect();
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting}) => {
        if (!isIntersecting) {
            return;
          }
          
          this.observer.unobserve(target);
          target.classList.add("appear");
      
      });
    }
  },
}