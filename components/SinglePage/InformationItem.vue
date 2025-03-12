<template>
    <component
      v-if="Item && Index"
      :label="`${$t(Index)}`"
      :value="Item"
      :linkTitle="Item.Label"
      :link="Item.URL"
      :is="Component()"
    />
</template>
<script setup>
const { t, locale } = useI18n();
const props = defineProps({
  index: String,
  item: [String, Number, Object, Array],
});

const Index = ref("");
const Item = ref(null);
import Text from "@/components/SinglePage/InformationTextSection.vue";
import Link from "@/components/SinglePage/InformationExternalLinkSection.vue";
import Dimensions from "@/components/SinglePage/InformationDimensions.vue";
import Dates from "@/components/SinglePage/InformationDates.vue";
import InternalLink from "@/components/SinglePage/InformationInternalLinkSection.vue";

function Component() {
  if (props.index === "Link") {
    return Link;
  } else if (props.index === "Dimensions") {
    return Dimensions;
  } else if (props.index === "Dates") {
    return Dates;
  } else if (props.index === "Series") {
    return InternalLink;
  } else {
    return Text;
  }
}

onMounted(() => {
  Index.value = props.index;
  Item.value = props.item;
  if (props.index === "Series") {
    Index.value = props.index;
    const loc = locale.value !== "en" ? `${locale.value}/` : "";
    const locI = locale.value !== "en" ? `_${locale.value}` : "";
    Item.value.URL = `/${loc}artwork?filters=[{"query":"{%5C"Series._id%5C":%5C"${props.item._id}%5C"},","label":"${props.item.Title}"}]`;
    Item.value.Label = props.item.Title;
  }
  console.log(Item.value);
});
</script>
