<template>
  <NuxtLinkLocale
    class="before:content-['←'] before:transition-all hover:before:mr-4 before:mr-2 block"
    :to="getLink()"
    >{{ label }}</NuxtLinkLocale
  >
</template>

<script setup>
const props = defineProps({
  prefix: String,
  label: String,
});
const router = useRouter();
const getLink = function () {
  const previousPath = this.router.options.history.state.back;
  let path = "";

  // Check if previousPath starts with the specified prefix and has parameters
  if (
    previousPath &&
    previousPath.startsWith(`/${props.prefix}`) &&
    previousPath.includes("?")
  ) {
    path = previousPath;
  } else {
    path = `/${props.prefix}`;
  }

  return path;
};
</script>
