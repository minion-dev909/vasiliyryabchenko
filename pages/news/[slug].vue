<template>
  <div>
    <NuxtLayout v-if="route && model"
      name="page-single-page-w"
      :slug="route.params.slug"
      :model="model"
      :prefix="prefix"
    >
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const model = 'News'
const prefix = 'news'
</script>
