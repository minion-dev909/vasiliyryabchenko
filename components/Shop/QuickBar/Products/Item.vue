<template>
  <div
    class="h-full transition-all hover:scale-90 cursor-pointer relative group min-w-16"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <Image
      class="h-full"
      classes="h-full"
      v-if="product.Item.Media[0].thumbnail"
      :src="product.Item.Media[0].thumbnail"
    />
    <div
      v-show="showTooltip"
      class="absolute bottom-full flex flex-col items-center gap-2 px-3 py-2 bg-white text-black border text-base transition-all opacity-0 group-hover:opacity-100 overflow-hidden w-max"
      style="left: 50%; transform: translateX(-50%)"
    >
      <div>
        {{ product.Item.Title }}
      </div>
      <ShopMultiPrice
        :price="product.Item.Information.Price"
        :quantity="product.Quantity"
      />
      <ShopQuantityInput
        :modelValue="product.Quantity"
        :max="product.Item.Information.Stock"
        :editable="true"
        :productId="product.Item._id"
        class="pt-1"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const showTooltip = ref(false);

// const { generateThumbnail } = useThumbnailGeneration();

// onMounted(async () => {
//   if (props.product && props.product.Item.Media[0]) {
//     const imageId = props.product.Item.Media[0]._id;
//     await generateThumbnail(props.product.Item.Media[0], imageId, "thumbnail", 200);
//   }
// });
</script>
