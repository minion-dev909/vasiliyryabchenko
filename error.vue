<template>
    <NuxtLayout name="404">
      <div class="flex flex-col gap-5">
        <div class="text-5xl text-center">404</div>
        <div class="text-4xl">You've arrived here on error</div>
        <button class="font-bold button hover:text-gray-500" @click="goHome">Home</button>
      </div>
    </NuxtLayout>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/')
      }
    }
  }
  </script>
