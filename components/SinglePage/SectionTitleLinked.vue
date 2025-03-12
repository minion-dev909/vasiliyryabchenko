<template>
  <div class="font-medium text-xl">
    {{ $t(Label) }}
    <NuxtLink
      :to="Link"
      class="opacity-50 hover:opacity-100 transition-all"
      v-text="LinkTitle"
    ></NuxtLink>
    <span v-if="AdditionalLabel && locale === 'en'" class="ml-1">{{ $t(AdditionalLabel) }}</span>
  </div>
</template>

<script setup>
const locale = useI18n().locale;
const props = defineProps({
  Label: String,
  AdditionalLabel: String,
  LinkTitle: String,
  Link: String,
});
</script>
