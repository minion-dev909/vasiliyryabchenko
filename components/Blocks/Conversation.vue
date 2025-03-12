<template>
  <div v-if="data" class="flex flex-col gap-6">
    <div
      class="flex flex-col gap-6 text-lg relative text-justify [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>span]:font-bold [&>div>span]:text-sm transition-all"
      v-for="(item, index) in data.Conversation"
    >
      <div>
        <span class="text-gray-500">{{ $t("Question") }} {{ index + 1 }}</span>
        <div
          v-html="item.Question"
          :class="Question"
          class="text-gray-500 italic"
        ></div>
      </div>
      <div>
        <span>{{ $t("Answer") }}</span>
        <div v-html="item.Answer" :class="Answer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  data: Object,
});
</script>
