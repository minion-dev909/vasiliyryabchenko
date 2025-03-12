<template>
  <div v-if="Products">
    <div class="flex w-full flex-row justify-between items-center">
      <div class="text-xl text-gray-500">{{ $t("Products") }}</div>
      <div class="font-bold text-gray-400">
        {{ Products.length + " " + $t("Items") }}
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-2 py-4">
        <ShopOrderCartProductsItem
          v-for="product in Products"
          :editable="editable"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  Products: Object,
  editable: Boolean,
});
</script>
