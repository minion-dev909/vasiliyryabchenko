<template>
  <button @click="removeProduct"
    class="hover:animate-[wiggle_1s_ease-in-out_infinite] text-gray-300 hover:text-gray-500 transition-all"
  >
    <Icon name="ic:outline-remove-circle-outline" size="1.5em" />
  </button>
</template>
<script setup>
const cart = useCartStore();

const removeProduct = () => {
  cart.removeFromCart(props.productId);
};
</script>
