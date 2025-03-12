<template>
  <div v-if="data.Content">
    <template v-for="(item, index) in data.Content">
      <div v-if="item.component === 'richtext'" v-html="item.data.html" class="text-justify text-lg"></div>
      <GeneralMediaObject class="py-8"
        v-if="item.component === 'MediaObject'"
        :MediaObject="item.data"
      />
    </template>
  </div>
</template>

<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  data: Object,
});
</script>
