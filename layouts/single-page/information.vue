<template>
    <IntersectionObserver
      class="flex-col text-lg grid grid-cols-2 sm:grid-cols-3 lg:flex gap-5 font-medium first:[&>div>div]:text-base first:[&>div>div]:font-normal"
    >
      <slot/>
    </IntersectionObserver>
</template>
