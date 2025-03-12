<template>
  <div>
    <NuxtLayout
      name="page-sidebar-page"
      class="lg:min-h-[calc(100vh-7em)] xl:min-h-[calc(100vh-6.6em)]"
    >
      <template #content v-if="termsData">
        <h1 class="text-3xl lg:text-4xl font-medium">
          <span>{{ $t("Terms and Conditions") }}</span>
        </h1>
        <div
          v-if="termsData.data[0].translations[0].Text"
          v-html="termsData.data[0].translations[0].Text"
          class="[&>p>a]:underline hover:[&>p>a]:opacity-100 [&>p>a]:opacity-50"
        ></div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { data: termsData, error1 } = await useFetch("/api/terms-and-conditions");
console.log("term-and-conditions");
console.log(termsData);
</script>
