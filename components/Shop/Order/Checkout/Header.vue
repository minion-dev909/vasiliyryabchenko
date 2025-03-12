<template>
  <div
    class="w-full flex flex-row gap-3 items-center justify-between"
  >
    <div class="flex flex-col">
      <div class="text-2xl lg:text-3xl">{{$t('Order')}}</div>
    </div>
    <div class="flex flex-row justify-end gap-8">
      <button
        class="text-gray-400 hover:text-gray-600 transition-all"
        v-if="close"
        @click="close()"
      >
        <Icon name="ant-design:close-square-outlined" size="3em" />
      </button>
    </div>
  </div>
</template>
<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  close: Function,
});
</script>
