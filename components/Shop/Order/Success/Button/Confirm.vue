<template>
  <button
    @click="click"
    type="button"
    class="text-lime-700 bg-gradient-to-r hover:scale-105 transition-all from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-lg flex justify-center items-center flex-row gap-2 px-5 py-2.5 text-center me-2 mb-2"
  >
    <Icon
      class="group-hover:scale-110 transition-all"
      name="ph:confetti"
      size="2em"
    />
    <span> {{ $t("Confirm") }} </span>
  </button>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const click = () => {
  cartStore.clearState();
};
</script>
