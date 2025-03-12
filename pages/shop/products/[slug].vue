<template>
  <div>
    <NuxtLayout @valueChanged="handleInformation"
      v-if="route && model"
      name="page-single-page-manual"
      :slug="route.params.slug"
      :model="model"
      :prefix="prefix"
    >
      <template #information>
        <div class="text-sm">SKU: {{data.Information.SKU}}</div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = "Products";
const prefix = "shop";

const data = ref('');

function handleInformation(newValue) {
  data.value = newValue;
  console.log(data.value)
}
</script>
