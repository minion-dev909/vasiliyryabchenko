<template>
  <div class="flex flex-col">
    <div class="text-sm font-bold text-gray-600">{{ Label }}</div>
    <div class="flex flex-row gap-1">
      <Icon v-if="icon" :name="icon" size="1.5em" />
      <div class="text-xl font-bold" :class="color()">{{ Value }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  Label: String,
  Value: String,
});

const icon = ref(null)

const color = () => {
  if (props.Value === "Created" || props.Value === "Paid") {
    return "text-green-600";
  }
};
</script>
