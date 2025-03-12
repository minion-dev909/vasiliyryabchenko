<template>
  <div>
    <div class="flex flex-row items-center gap-1 border-2 px-2 rounded-xl border-violet-400 text-violet-500 font-bold">
      <div class="font-bold">{{ GetPrice(sale, original) }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  sale: Object,
  original:Object,
});
console.log("discount");
const GetPrice = (sale,original) => {
  if (sale) {
    const discount = 100 - Math.floor((sale / original) * 100);
    return discount + "%";
  }
};
</script>
