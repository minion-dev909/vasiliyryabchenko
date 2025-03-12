<template>
  <TemplatingGrid3Cols
    class="pt-0"
  >
    <div
      class="relative lg:col-span-3 xl:col-span-4 px-4 md:px-8"
    >
      <div class="navigation transition-all mb-6 lg:block overflow-y sticky">
        <div class="lg:flex flex-col lg:gap-1 w-full group">
          <slot name="header" />
        </div>
      </div>
    </div>
    <div class="lg:col-span-3 xl:col-span-4">
      <div class="min-h-max h-full w-full flex flex-col gap-10">
        <slot name="content" />
      </div>
    </div>
  </TemplatingGrid3Cols>
</template>
