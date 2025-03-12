<template>
  <div
    v-if="cartItemsAmount > limitedCartItems"
    class="h-full transition-all hover:scale-90 cursor-pointer relative w-16 p-2"
  >
    <div
      class="h-full w-full bg-slate-200 rounded-xl flex justify-center items-center font-bold text-gray-500"
    >
      +{{ otherItems }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  limitedCartItems: Number,
  cartItemsAmount: Number
});
const otherItems = computed(() => props.cartItemsAmount - props.limitedCartItems);
</script>
