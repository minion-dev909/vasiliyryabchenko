<template>
  <div class="flex flex-col gap-2" v-if="product">
    <div class="w-full border p-3 flex flex-row gap-5">
      <Image
        classes="w-32"
        v-if="product.Item.Media[0].thumbnail"
        :src="product.Item.Media[0].thumbnail"
      />
      <div class="flex flex-col gap-2 w-full">
        <div class="w-full flex flex-row items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ product.Item.Information.Type }} /
            {{ product.Item.Information.Category }}
          </div>
          <div class="flex flex-row gap-2">
            <ShopDiscount
              v-if="
                product.Item.Information.Price &&
                product.Item.Information.Price.Sale
              "
              :price="product.Item.Information.Price"
            />
            <ShopOrderCartRemoveProduct
              :productId="product.Item._id"
              v-if="editable"
            />
          </div>
        </div>
        <div class="font-bold text-lg">
          {{ product.Item.Title }}
        </div>
        <div class="flex flex-row justify-between">
          <div class="text-gray-500" v-if="!editable">
            <span>{{ $t("Quantity") }}:</span> {{ product.Quantity }}
          </div>
          <ShopPrice :price="product.Item.Information.Price" v-if="editable" />
          <ShopMultiPrice
            v-if="!editable"
            :price="product.Item.Information.Price"
            :quantity="product.Quantity"
          />
        </div>
      </div>
    </div>
    <div class="flex-row flex justify-between" v-if="editable">
      <div class="border p-3 flex flex-row items-center gap-2">
        <ShopQuantityInput
          :modelValue="product.Quantity"
          :max="product.Item.Information.Stock"
          :editable="true"
          :productId="product.Item._id"
          class="pt-1"
        />
      </div>
      <div class="p-3 flex flex-row items-center gap-2">
        <ShopMultiPrice
          :price="product.Item.Information.Price"
          :quantity="product.Quantity"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  editable: Boolean,
  product: Object,
});

// const { generateThumbnail } = useThumbnailGeneration();

// onMounted(async () => {
//   console.log(props.product);
//   // Проверяем, существует ли props.data и props.data.Cover перед тем, как пытаться использовать imageId
//   if (props.product && props.product.Item.Media[0]) {
//     const imageId = props.product.Item.Media[0]._id;
//     // Убедитесь, что generateThumbnail правильно обрабатывает асинхронный результат
//     // Если generateThumbnail - асинхронная функция, вам нужно будет использовать await
//     await generateThumbnail(
//       props.product.Item.Media[0],
//       imageId,
//       "thumbnail",
//       200
//     );
//   }
// });
</script>
