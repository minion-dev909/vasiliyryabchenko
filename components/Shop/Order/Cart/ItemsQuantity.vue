<template>
  <span v-if="cartItems >= 0">
    {{ cartItems }}
  </span>
</template>
<script setup>
const props = defineProps({
    showOnNull: {
        type: Boolean,
        default: true
    }
});

import { useCartStore } from "@/stores/cart";

// Используем store и создаем реактивное свойство для элементов корзины
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items.length);


</script>
