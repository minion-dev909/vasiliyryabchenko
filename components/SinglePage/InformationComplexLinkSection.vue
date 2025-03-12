<template>
  <div class="flex-col flex">
    <template
      v-if="data.ArtworkRepresentative && data.ArtworkRepresentative.length > 0"
    >
    <div class="text-gray-500">{{ $t(label) }}</div>
      <div class="flex flex-col gap-5 pt-3">
        <NuxtLink
          v-for="item in data.ArtworkRepresentative"
          :to="item.Link"
          target="_blank"
          class="group flex flex-row justify-between items-center gap-5"
        >
          <div class="flex flex-col">
            <div v-text="item.Name"></div>
            <div v-text="item.Description" class="font-normal text-base"></div>
          </div>
          <Icon
            class="transition-all cursor-pointer group-hover:scale-105 group-hover:text-gray-900 text-gray-500"
            name="tabler:external-link"
            size="1.5em"
          />
        </NuxtLink>
      </div>
    </template>
    <template v-else>
      <ArtworkRequestRepresent :data="data" />
      <ArtworkRequestPrice :data="data" />
    </template>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  data: Object,
});
</script>
