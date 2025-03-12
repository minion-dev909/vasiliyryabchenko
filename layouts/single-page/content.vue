<template>
  <TemplatingGrid3Cols class="border-b">
    <div class="relative lg:col-span-1 px-4 md:px-8 ">
      
    </div>
    <div class="lg:col-span-2 xl:col-span-3 h-full">
      <div class="min-h-max px-4 md:px-8 lg:px-0 lg:pr-8 w-full flex flex-col gap-10">
        <slot name="content" />
      </div>
    </div>
  </TemplatingGrid3Cols>
</template>
