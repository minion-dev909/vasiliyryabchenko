<template>
  <div
    v-if="limitedCartItems && limitedCartItems.length"
    class="flex flex-row gap-3 justify-end items-center px-4"
  >
    <ShopQuickBarProductsOtherItems :cartItemsAmount="cartItemsAmount" :limitedCartItems="limitedCartItems.length"/>
    <ShopQuickBarProductsItem
      v-for="product in limitedCartItems"
      :product="product"
    ></ShopQuickBarProductsItem>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const cartItemsAmount = computed(() => cartStore.items.length);

// Создаём референс для хранения ширины окна
const windowWidth = ref(0);

// Обновляем windowWidth только на стороне клиента
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWidth(); // Инициализируем при монтировании
  window.addEventListener('resize', updateWidth); // Добавляем слушатель события
});

// onUnmounted(() => {
//   window.removeEventListener('resize', updateWidth); // Удаляем слушатель при размонтировании
// });

// Используем вычисляемое свойство для определения количества отображаемых элементов
const limitedCartItems = computed(() => {
  let maxItems = 5; // По умолчанию для больших экранов
  if (windowWidth.value < 768) maxItems = 0; // Для мобильных устройств
  else if (windowWidth.value < 1024) maxItems = 2; // Для планшетов

  return cartItems.value.slice(0, maxItems);
});
</script>