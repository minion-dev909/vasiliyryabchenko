<template>
  <div
    class="fixed h-16 bottom-0 left-0 bg-white border-t z-[80] w-full flex flex-row justify-between items-center"
  >
    <div class="flex flex-row h-full [&>button]:px-4 [&>button]:border-r">
      <ShopOrderTrackButton />
    </div>
    <div class="flex flex-row h-full [&>*]:px-4 [&>*]:border-l">
      <ShopQuickBarProductsList class="!border-l-0" />
      <ShopOrderCartOpenButton v-if="!cartItemsAmount" />
      <ShopOrderTotalPrice v-if="cartItemsAmount" class="!border-l-0 sm:!border-l" />
      <ShopCheckoutButton v-if="cartItemsAmount" />
    </div>
  </div>
  <Teleport to="body">
    <div v-if="order.state === 1 && order.id !== null && order.track === false">
      <ShopOrderSuccessScreen :orderId="order.id" />
    </div>
  </Teleport>
  <Teleport to="body">
    <div v-if="order.state === 0 && order.id !== null  && order.track === true">
      <ShopOrderTrackScreen :orderId="order.id"/>
    </div>
  </Teleport>
  <Teleport to="body">
    <div v-if="order.state === 0 && order.id === null  && order.track === true">
      <ShopOrderTrackModal/>
    </div>
  </Teleport>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

// Используем store и создаем реактивное свойство для элементов корзины
const cartStore = useCartStore();
const order = computed(() => cartStore.order);
const cartItemsAmount = computed(() => cartStore.items.length > 0);

onMounted (() => {
  document.body.classList.add('bottom-construction-shop')
})

onUnmounted (() => {
  document.body.classList.remove('bottom-construction-shop')
})
</script>
