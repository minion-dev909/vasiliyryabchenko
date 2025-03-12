<template>
  <NuxtLayout name="modal" :toggle="toggle">
    <div class="flex flex-col justify-center items-center gap-5">
      <div class="uppercase font-bold opacity-80">{{ $t('Enter Track Number') }}</div>
      <ShopOrderTrackInput/>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
    toggle: Function
})
</script>
