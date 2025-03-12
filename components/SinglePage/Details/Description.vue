<template>
  <div class="grid-cols-1 grid gap-10 pb-6">
    <div v-if="data" class="text-justify flex flex-col gap-3">
      <div class="text-gray-500">{{$t('Description')}}</div>
      <div v-html="data"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>
