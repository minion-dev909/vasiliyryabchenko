<template>
  <TemplatingGrid3Cols class="border-b">
    <div class="relative lg:col-span-1 px-4 md:px-8">
      <div
        class="navigation transition-all top-[7em] mb-6 sticky lg:block overflow-y"
      >
        <div class="lg:flex flex-col lg:gap-1 w-full group">
          <slot name="sidecontent" />
        </div>
      </div>
    </div>
    <div class="lg:col-span-2 xl:col-span-3 h-full">
      <div class="min-h-max !px-4 md:!px-8 lg:!px-0 lg:!pr-8 w-full flex flex-col">
        <slot name="content" />
      </div>
    </div>
  </TemplatingGrid3Cols>
</template>
