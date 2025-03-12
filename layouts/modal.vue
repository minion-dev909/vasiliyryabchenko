<template>
  <ClientOnly>
    <IntersectionObserver
      class="z-[85] w-full h-full fixed left-0 top-0 bg-slate-50/50 flex justify-center items-center"
    >
      <div
        class="absolute flex flex-col gap-10 justify-center items-center md:block z-50 w-full sm:w-[80%] md:w-[60vw] xl:w-[40vw] h-full sm:h-auto sm:min-h-[12em] bg-white sm:border p-10"
      >
        <slot />
        <button @click="toggle" class="text-gray-400 hover:scale-110 transition-all md:hidden block">
          <Icon name="material-symbols-light:cancel-presentation-outline-sharp" size="2.5em" />
        </button>
      </div>
      <div
        class="z-40 absolute w-full h-full left-0 top-0 cursor-pointer hover:bg-violet-50/50 transition-all"
        @click="toggle"
      ></div>
    </IntersectionObserver>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  toggle: Function,
});
onMounted(() => {
  document.body.classList.add("overflow-hidden");
  document.body.querySelector(".header").classList.remove("z-50");
});
onUnmounted(() => {
  document.body.querySelector(".header").classList.add("z-50");
  document.body.classList.remove("overflow-hidden");
});
</script>
