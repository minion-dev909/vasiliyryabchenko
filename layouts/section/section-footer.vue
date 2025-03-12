<template>
  <div class="h-full gap-5">
    <div class="grid h-full grid-cols-1 gap-10">
      <TemplatingGrid3Cols>
        <div
          class="relative order-last md:min-h-[10em] lg:order-first lg:col-span-1 lg:pr-10"
        >
          <div
            class="bg-cover bg-center bg-no-repeat flex flex-col h-full items-center lg:items-start justify-center lg:justify-end lg:gap-1 w-full group"
            :style="`background-image: url(${footData.data[1].thumbnail})`"
          >
            <slot name="sidecontent" />
          </div>
        </div>
        <div class="lg:col-span-2 xl:col-span-3">
          <div
            class="h-full px-4 md:px-8 lg:px-0 lg:pr-8 w-full flex flex-col md:gap-10 md:mb-5"
          >
            <slot name="content" />
          </div>
        </div>
      </TemplatingGrid3Cols>
    </div>
  </div>
</template>

<script setup>
const storageBase = useRuntimeConfig();
const { data: footData, error1 } = await useFetch("/api/catalogues");
console.log("section-footer");
console.log(footData);
</script>
