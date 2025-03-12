<template>
  <button
    class="text-gray-400 hover:text-gray-600 transition-all"
    v-if="click"
    @click="click()"
  >
    <Icon name="ant-design:close-square-outlined" size="3em" />
  </button>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const click = () => {
  cartStore.closeTrack();
};
</script>
