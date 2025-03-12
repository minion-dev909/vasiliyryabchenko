<template>
  <div class="w-full px-4 md:px-8 pt-8 flex flex-row justify-between">
    <div class="text-xl font-medium">
      <slot name="left" />
    </div>
    <div class="[&>a]:opacity-50 hover:[&>a]:opacity-100 [&>a]:transition-all">
      <slot name="right" />
    </div>
  </div>
</template>
