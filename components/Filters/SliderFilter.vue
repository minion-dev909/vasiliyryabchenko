<template>
  <Swiper
    slides-per-view="5"
    :direction="'vertical'"
    :mousewheel="true"
    :free-mode="true"
    :watchOverflow="true"
    :pagination="{
      bulletClass: 'pagination-line',
      bulletActiveClass: 'pagination-line-active',
      clickable: true,
    }"
    :modules="[SwiperPagination, SwiperMousewheel, SwiperFreeMode]"
    class="pagination-full-h group text-base lg:text-lg mt-1 h-32 [&>div>div:not(.active)]:cursor-pointer [&>div>div.active]:text-gray-500 text-black hover:[&>div>div]:text-gray-500"
  >
    <template v-if="filterQuery.QueryType === 'Relative'">
      <SwiperSlide
        v-for="(item, index) in filterQuery.data"
        :key="index"
        class="overflow-hidden"
        :class="{ active: isFilterActive(item._id) }"
        @click="addFilterItem(filterQuery.Name+'._id', item._id, null, item.Title)"
      >
      {{ $t(item.Title) }}
      </SwiperSlide>
    </template>
    <template v-else>
      <SwiperSlide
        v-for="(item, index) in filterQuery.data"
        :key="index"
        class="overflow-hidden"
        :class="{ active: isFilterActive(item) }"
        @click="addFilterItem(filterQuery.Name, item, '$containsi', item)"
      >
      {{ $t(item) }}
      </SwiperSlide>
    </template>
  </Swiper>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  filtersBar: Boolean,
  filterQuery: Object,
  isFilterActive: Function,
  addFilterItem: Function,
});
</script>
