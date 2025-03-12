<template>
  <button
    @click="click"
    type="button"
    class="text-white bg-gradient-to-r from-cyan-500 hover:scale-105 transition-all to-blue-500/50 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-lg flex justify-center items-center flex-row gap-2 px-5 py-2.5 text-center me-2 mb-2"
  >
    <Icon
      class="group-hover:scale-110 transition-all"
      name="material-symbols:track-changes"
      size="2em"
    />
    <span> {{ $t("Track") }} </span>
  </button>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const props = defineProps({
  orderId: String 
})
const click = () => {
  cartStore.track(props.orderId);
};
</script>
