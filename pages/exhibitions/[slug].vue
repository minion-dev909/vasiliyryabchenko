<template>
  <div>
    <NuxtLayout v-if="route && model"
      name="page-single-page"
      :slug="route.params.slug"
      :model="model"
      :prefix="prefix"
    >
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = 'Exhibitions'
const prefix = 'exhibitions'
</script>
