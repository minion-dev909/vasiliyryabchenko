<template>
  <div
    class="flex flex-col md:flex-row w-full pt-20 pb-10 px-4 md:px-8 justify-center md:justify-between items-center md:items-between gap-5"
  >
    <div class="flex flex-row gap-2 [&>svg]:text-gray-600">
      <Icon name="fa6-brands:cc-visa" size="1.5em" />
      <Icon name="fa6-brands:cc-mastercard" size="1.5em" />
      <Icon name="fa6-brands:cc-paypal" size="1.5em" />
      <Icon name="fa6-brands:cc-amex" size="1.5em" />
      <Icon name="fa6-brands:cc-apple-pay" size="1.5em" />
      <Icon name="fa6-brands:cc-discover" size="1.5em" />
      <Icon name="fa6-brands:cc-stripe" size="1.5em" />
    </div>
    <div
      class="flex-row flex gap-4 items-center text-sm text-gray-500 hover:[&>a]:text-black [&>a]:transition-all"
    >
      <NuxtLinkLocale to="/terms-and-conditions">{{
        $t("Terms and Conditions")
      }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/terms-and-conditions">{{
        $t("Terms of Sale")
      }}</NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
</script>
