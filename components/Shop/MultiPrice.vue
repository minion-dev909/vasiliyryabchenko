<template>
    <ShopPrice :price="Price" />
</template>

<script setup>

const { t } = useI18n();
const props = defineProps({
  price: Object,
  quantity: Number,
});

const Price = ref("");

const GetPrice = (price, quantity) => {
  // Обновляем Price на основе наличия Sale
  let Array = [];
  if (price.Sale) {
    Array["Sale"] = price.Sale * quantity;
  }
  Array["Original"] = price.Original * quantity;
  Price.value = Array;
};

watch(
  () => [props.price, props.quantity],
  ([newPrice, newQuantity]) => {
    GetPrice(newPrice, newQuantity);
  },
  { immediate: true }
); // { immediate: true } для того, чтобы функция выполнялась сразу при инициализации компонента.
</script>
