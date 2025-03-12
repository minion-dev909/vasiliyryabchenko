<template>
  <IntersectionObserver class="flex group flex-col gap-5 items-center">
    <div
      class="[&>a>div]:transition-all relative"
    >
      <NuxtLinkLocale :to="`/shop/products/${data.translations[0].Slug}`">
        <ShopDiscount
          class="absolute z-[5] top-3"
          v-if="data.translations[0].sale"
          :sale="data.translations[0].sale"
          :original="data.translations[0].original"
        />
        <div class="group-hover:opacity-0 opacity-100 w-full h-auto">
          <Image
            loading="lazy"
            :src="`${storageBase}${data.translations[0].media0path}`"
            :alt="data.translations[0].Title"
            initClass="min-h-[20em]"
          />
        </div>
        <div class="absolute top-0 left-0 group-hover:opacity-100 opacity-0">
          <Image
            loading="lazy"
            :src="`${storageBase}${data.translations[0].media1path}`"
            :alt="data.translations[0].Title"
          />
        </div>
      </NuxtLinkLocale>
    </div>
    <div class="flex flex-col items-center gap-2 w-full">
      <NuxtLinkLocale :to="`/shop/${data.translations[0].Slug}`">
        <div class="text-gray-500 text-center text-base sm:text-base">
          {{ $t(data.translations[0].category) }}
        </div> 
        <div
          class="before:transition-all before:text-sm before:text-gray-500 text-lg sm:text-lg md:text-xl"
        >
          {{ data.translations[0].Title }}
        </div>
      </NuxtLinkLocale>
      <!-- <div
        class="relative text-center w-full mt-3"
      >
        <ShopPrice
          :class="CartShow ? 'opacity-0' : 'opacity-100'"
          class="opacity-100 group-hover:opacity-0 transition-all"
          :price="data.Information.Price"
        />
        <ShopOrderCartAddButton
          :CartShow="CartShow"
          :product="data"
          @update:CartShow="CartShow = $event"
          :class="CartShow ? 'opacity-100' : 'opacity-0'"
          class="absolute top-0 font-bold left-0 opacity-0 group-hover:opacity-100 w-full text-center"
        />
      </div> -->
    </div>
  </IntersectionObserver>
</template>

<script setup>
const { storageBase } = useRuntimeData();
const { t } = useI18n();
const props = defineProps({
  data: Object,
});
console.log("lists/item/product");
console.log(props.data);
</script>
