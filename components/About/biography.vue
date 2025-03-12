<template>
  <div>
    <IntersectionObserver>
      <PageTitle :Label="PageName" />
    </IntersectionObserver>
    <Quote :data="data.data[0].translations[0]"/>
    <IntersectionObserver>
      <div
        class="xl:text-lg text-justify xl:columns-2 gap-6"
        v-html="data.data[0].translations[0].Biography"
      ></div>
    </IntersectionObserver>
  </div>
</template>

<script setup>
 const PageName = ref('Biography')
const props = defineProps({
  data: Object
});
console.log("biography");
console.log(props.data);
</script>
