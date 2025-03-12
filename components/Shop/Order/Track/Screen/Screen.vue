<template>
  <NuxtLayout name="screen">
    <div class="p-4 md:p-8 w-full h-full" v-if="data && data[0]">
      <ShopOrderTrackScreenHeader :data="data[0]"/>
      <div class="py-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ShopOrderCartProducts
            :Products="data[0].Products"
            :editable="editable"
          />
          <ShopOrderTrackScreenInformation
            :Order="data[0]"
            :editable="editable"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const { apiBase, apiToken, locale } = useRuntimeData();

const props = defineProps({
  orderId: String,
});

const editable = ref(false);
const filter = encodeURIComponent(JSON.stringify({ ID: props.orderId }));
const requestURI = `${apiBase}/content/items/Orders?locale=${locale.value}&filter=${filter}&populate=2`

const { data, error, execute } = await useFetch(requestURI, {
  method: "GET",
  headers: {
    "api-key": `${apiToken}`,
  },
  lazy: true,
});

const close = () => {
  cartStore.closeTrack();
};
onMounted(() => {
  execute();
  document.body.classList.add("overflow-hidden");
});

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});
</script>
