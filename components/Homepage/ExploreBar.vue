<template>
  <IntersectionObserver class="text-lg sm:text-xl lg:text-base text-gray-500">
    {{ $t("Explore") }}
  </IntersectionObserver>
  <div
    v-if="data.data"
    class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-1 w-full"
  >
    <template v-for="item in data.data">
      <IntersectionObserver
        v-if="item.is_top"
        class="sm:group-hover:grayscale first:col-span-2 sm:first:col-span-1 sm:first:row-span-3 lg:first:row-span-1 [&>a]:first:h-32 sm:[&>a]:first:h-full [&>a]:h-full hover:!grayscale-0 transition-all group-hover:[&>a]:opacity-60 [&>a]:font-medium hover:[&>a]:!opacity-100 [&>a]:transition-all cursor-pointer lg:!bg-none bg-cover bg-center bg-no-repeat"
        :style="
          item.thumbnail ? `background-image: url('${item.thumbnail}');` : ''
        "
      >
        <a
          :href="item.translations[0]?.Link"
          target="_blank"
          class="border py-5 sm:py-7 px-1 text-center lg:block flex justify-center items-center lg:border-0 lg:p-0 lg:text-start text-2xl text-white lg:text-gray-900"
          >{{ item.translations[0]?.Text }}</a
        >
      </IntersectionObserver>
    </template>
  </div>
  <div
    v-if="data.data"
    class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:flex lg:flex-col lg:gap-1 justify-around [&>div]:font-normal [&>div]:transition-all cursor-pointer"
  >
    <template v-for="item in data.data">
      <IntersectionObserver
        v-if="!item.is_top"
        class="sm:group-hover:grayscale first:col-span-2 sm:first:col-span-1 sm:first:row-span-3 lg:first:row-span-1 [&>a]:first:h-32 sm:[&>a]:first:h-full [&>a]:h-full hover:!grayscale-0 transition-all group-hover:[&>a]:opacity-60 [&>a]:font-medium hover:[&>a]:!opacity-100 [&>a]:transition-all cursor-pointer lg:!bg-none bg-cover bg-center bg-no-repeat"
        :style="
          item.thumbnail ? `background-image: url('${item.thumbnail}');` : ''
        "
      >
        <a
          :href="item.translations[0]?.Link"
          target="_blank"
          class="border py-5 sm:py-7 px-1 text-center lg:block flex justify-center items-center lg:border-0 lg:p-0 lg:text-start text-2xl text-white lg:text-gray-900"
          >{{ item.translations[0]?.Text }}</a
        >
      </IntersectionObserver>
    </template>
  </div>
</template>

<script setup>
// Using useFetch to fetch data in the component
const { newApiBase } = useRuntimeData();
let { data, execute, error, pending } = useFetch(
  `${newApiBase}/items/Navigations?fields=*,translations.*&deep={"translations":{"_filter":{"_and":[{"languages_code":{"_eq":"en"}}]}}}`,
  {
    method: "GET",
    lazy: true, // Ensure that the request is triggered manually by calling execute()
  }
);

execute();

console.log(data);
</script>

