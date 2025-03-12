<template>
    <div v-if="query && queryType">
      <div
        @click="openFilter(queryType)"
        class="text-md flex flex-row justify-between items-center cursor-pointer"
        :class="{ 'text-black': openedFilter !== queryType, 'text-gray-500': openedFilter === queryType }"
      >
        <div>{{ $t(queryType) }}</div>
        <div v-text="openedFilter === queryType ? '-' : '+'"></div>
      </div>
      <Swiper
        slides-per-view="5"
        :direction="'vertical'"
        :mousewheel="true"
        :free-mode="true"
        :pagination="{
          bulletClass: 'pagination-line',
          bulletActiveClass: 'pagination-line-active',
          clickable: true,
        }"
        :modules="[SwiperPagination, SwiperMousewheel, SwiperFreeMode]"
        v-show="openedFilter === queryType"
        class="pagination-full-h group text-lg mt-1 h-48 [&>div>div:not(.active)]:cursor-pointer [&>div>div.active]:text-gray-500 text-black hover:[&>div>div]:text-gray-500"
      >
        <SwiperSlide
          v-for="item in query"
          :key="item"
          :class="{ active: type === 'common' ? isFilterActive(item) : isFilterActive('Artcycle', item.id) }"
          @click="type === 'common' ? addFilterItem(queryType, item, '$containsi', item) : addFilterItem('Artcycle', item.id, null, item.attributes.Title)"
          v-text="type === 'common' ? item : item.attributes.Title"
        >
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      query: Array, // Assuming query is an array
      queryType: String,
      filters: Array,
      type: String
    },
    data() {
      return {
        openedFilter: null // or set an initial value
      };
    },
    methods: {
      isFilterActive(type, id) {
        return this.filters.some((filter) => {
          return filter.query.includes(`filters[${type}]=${id}`);
        });
      },
      async openFilter(type) {
        this.openedFilter = type;
        // Optionally, emit an event to notify the parent component
        this.$emit("opened-filter-changed", type);
      },
      addFilterItem(queryType, item, filterType, title) {
        // Implement your logic for adding filter items
      }
    }
  };
  console.log("foldingFilter");
  console.log(props.query);
  </script>
  