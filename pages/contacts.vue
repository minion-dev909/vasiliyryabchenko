<template>
  <div>
    <NuxtLayout v-if="contactsData" name="page-sidebar-page">
      <template #content>
        <IntersectionObserver>
          <PageTitle Label="Contacts"></PageTitle>
          <div
            v-if="contactsData.data[0].translations[0].Text"
            v-html="contactsData.data[0].translations[0].Text"
            class="pt-10 text-lg font-light [&>p>a]:underline hover:[&>p>a]:opacity-100 [&>p>a]:opacity-50"
          ></div>
        </IntersectionObserver>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const PageName = ref("Contacts");

const { data: contactsData, error1 } = await useFetch("/api/contacts");
console.log(contactsData);
console.log("contacts");
</script>
