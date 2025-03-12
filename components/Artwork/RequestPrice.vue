<template>
    <div @click="toggle()"
      class="w-fit flex flex-row justify-start items-center gap-2 group cursor-pointer pt-4 hover:scale-105 transition-all"
    >
      <Icon
        name="material-symbols:request-page-sharp"
        size="1.4em"
        class="opacity-80 group-hover:opacity-100 scale-90 group-hover:scale-95 transition-all"
      />
  
      <div class="text-base pt-0.5">{{ $t('Request Price')}}</div>
    </div>
    <Teleport to="body">
      <NuxtLayout name="modal" v-if="open" :toggle="toggle">
        <ArtworkRequestForm :data="data"/>
      </NuxtLayout>
    </Teleport>
  </template>
  <script setup>
  const {t} = useRuntimeData();
  const open = ref(false);
  const props = defineProps({
    data: Object,
  });
  const toggle = () => {
      open.value = ! open.value
  };
  </script>
  