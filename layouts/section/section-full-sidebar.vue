<template>
  <div class="h-full gap-5">
    <div class="grid h-full grid-cols-1 gap-10">
      <TemplatingGrid3Cols>
        <div class="relative order-last lg:order-first lg:col-span-1 pb-6 lg:pb-0">
          <div
            class="flex flex-col h-full items-center lg:items-start justify-between lg:gap-1 w-full group"
          >
            <slot name="sidecontent" />
          </div>
        </div>
        <div class="lg:col-span-2 xl:col-span-3 pb-6 lg:pb-0">
          <div class="h-full w-full">
            <slot name="content" />
          </div>
        </div>
      </TemplatingGrid3Cols>
    </div>
  </div>
</template>
