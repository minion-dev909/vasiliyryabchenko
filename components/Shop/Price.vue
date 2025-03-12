<template>
  <div>
   <span v-if="price.Sale" class="mr-1 text-green-600 font-bold">{{ $t('CurrencySign') + price.Sale}}</span>
   <span class="font-bold" :class="price.Sale ? '!text-gray-500 text-sm' : ''">{{ $t('CurrencySign') + price.Original }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  price: Object,
});
</script>
