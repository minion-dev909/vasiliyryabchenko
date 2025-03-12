<!-- components/IntersectionObserver.vue -->

<template>
  <div ref="intersectionElement" class="intersection-element">
    <slot />
  </div>
</template>

<script setup>
const intersectionElement = ref(null);
let intersectionObserver = null;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  intersectionObserver = new IntersectionObserver(handleIntersection, options);

  if (intersectionElement.value) {
    intersectionObserver.observe(intersectionElement.value);
  }
});

onBeforeUnmount(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
});

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (intersectionElement.value && entry.isIntersecting) {
      intersectionElement.value.classList.add("visible");
    } else if (intersectionElement.value) {
      intersectionElement.value.classList.remove("visible");
    }
  });
};
</script>

<style scoped>
/* Пример CSS для анимации */
.intersection-element {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.visible {
  opacity: 1;
}
</style>
