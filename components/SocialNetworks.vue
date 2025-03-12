<template>
  <NuxtLink v-for="item in SocialNetworksData.data" :key="item" :to="item.Link" target="_blank" :aria-label="item.Label">
      <Icon :name="item.Icon" size="1.5em"></Icon>
  </NuxtLink>                 
</template>

<script setup>
const { data: SocialNetworksData, error1 } = await useFetch("/api/SocialNetworks");
console.log("social net");
console.log(SocialNetworksData);
</script>

