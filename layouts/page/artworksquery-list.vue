<template>
  <NuxtLayout name="page-sidebar-page-grid">
    <template #content>
      <PageHeader
        :filtersBar="filtersBar"
        :pageTitle="pageTitle"
        :searchRequest="searchRequest"
        :searchQuery="searchQuery"
      ></PageHeader>
      <div class="flex flex-row relative">
        <NuxtLayout
          name="page-filters-bar"
          :queryAmount="queryAmount"
          :filtersBar="filtersBar"
          :filters="filters"
          :removeFilterItem="removeFilterItem"
        >
          <FiltersArtworksQueries
            v-if="filterResults"
            :data="data"
            :filtersBar="filtersBar"
            :filtersQueries="filterResults"
            :isFilterActive="isFilterActive"
            :isFilterLabelActive="isFilterLabelActive"
            :addFilterItem="addFilterItem"
            :openFilter="openFilter"
          ></FiltersArtworksQueries>
        </NuxtLayout>
        <div
          class="transition-all duration-500"
          :class="filtersBar ? 'md:w-8/12 xl:w-9/12' : 'w-full'"
        >
          <div class="relative">
            <NuxtLayout
              name="page-list-header"
              :sort="sort"
              :query="query"
              :filters="filters"
              :removeFilterItem="removeFilterItem"
              :filtersBar="filtersBar"
              :queryAmount="queryAmount"
              :searchRequest="searchRequest"
              :searchQuery="searchQuery"
              @sort="handleSort"
            >
              <template #left>
                <div>
                  <FiltersFilterSwitch
                    :class="filterBarDefault ? 'lg:hidden' : ''"
                    :filtersBar="filtersBar"
                    :queryAmount="queryAmount"
                    :filters="filters"
                    :toggleFilterBar="toggleFilterBar"
                  />
                  <slot name="left" />
                </div>
              </template>
              <template #rightAddition>
                <slot name="right" />
              </template>
            </NuxtLayout>
            <PageIntro :limited="false" :filtersBar="filtersBar" :Text="Text" />
            <transition name="fadedelay">
              <component
                :query="data"
                :queryAmount="queryAmount"
                :filtersBar="filtersBar"
                :is="props.component"
                @statusChange="UpdateSwiperStatus"
              />
            </transition>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
const router = useRouter();
const { apiBase, apiToken, t, locale } = useRuntimeData();
const { refreshed, refreshParameters } = usePageRefresh();

const props = defineProps({
  filterBarDefault: Boolean,
  requestAPI: String,
  searchField: String,
  pageTitle: String,
  filtersQueries: Array,
  TextRequest: String,
  component: Object,
  data: Object,
});
console.log("artworksquery-list");
console.log(props.component);
console.log(props.data);
// const request = computed(
//   () => `${apiBase}/content/items${props.requestAPI}?locale=${locale.value}`
// );

const filtersBar = ref(props.filterBarDefault);
const query = ref(null);
const queryAmount = ref(0);
const searchRequest = ref(null);

//FILTERS
const filters = ref([]);
const filterResults = ref(null);

//Sort
const sort = ref(JSON.stringify({ "Year": -1 }));

const scrollTimeout = ref(null);

const Text = ref("");

watch(filtersBar, async (newStatus) => {
  if (newStatus !== null) {
    if (window.innerWidth <= 768) {
      newStatus
        ? document.body.classList.add("overflow-hidden")
        : document.body.classList.remove("overflow-hidden");
    }
    saveToLocalStorage();
  }
});

watch(query, async (newQuery) => {
  if (newQuery !== null) {
    queryAmount.value = newQuery.length;
    await generateFilterQueries();
    restoreScrollPosition();
    await updateRoute();
  }
});

watch(sort, async (newSort) => {
  if (newSort !== null) {
    getQuery();
  }
});

const handleSort = (query) => {
  sort.value = query; // Теперь sort изменяется здесь
};

const saveToLocalStorage = () => {
  if (!props.filterBarDefault) {
    localStorage.setItem(`${props.pageTitle}FilterBarState`, filtersBar.value);
  }
};

const restoreFromLocalStorage = () => {
  const savedFiltersBar =
    localStorage.getItem(`${props.pageTitle}FilterBarState`) ||
    props.filterBarDefault;

  if (savedFiltersBar) {
    if (window.innerWidth >= 768) {
      setTimeout(() => {
        filtersBar.value = JSON.parse(savedFiltersBar);
      }, 300);
    } else {
      filtersBar.value = false;
    }
  }
};

const ResetScrollParameter = async () => {
  window.scrollTo({ top: 0 });
};

const updateRoute = async () => {
  const currentQuery = { ...router.currentRoute.value.query };
  const hasFilters = filters.value.length > 0;
  const hasSearchRequest =
    searchRequest.value && searchRequest.value.trim() !== "";

  const queryParameters = { ...currentQuery };

  if (!hasFilters && currentQuery.filters) {
    delete queryParameters.filters;
  } else if (hasFilters) {
    queryParameters.filters = JSON.stringify(filters.value);
  }

  if (!hasSearchRequest && currentQuery.searchRequest) {
    delete queryParameters.searchRequest;
  } else if (hasSearchRequest) {
    queryParameters.searchRequest = searchRequest.value;
  }

  await router.replace({ query: queryParameters });
};

const handleScroll = () => {
  const SCROLL_TIMEOUT = 300;
  clearTimeout(scrollTimeout.value);

  scrollTimeout.value = setTimeout(() => {
    const currentQuery = { ...router.currentRoute.value.query };
    const scrollPosition = window.scrollY || window.pageYOffset;
    const queryParameters = { ...currentQuery, scrl: scrollPosition };
    router.replace({ query: queryParameters });
  }, SCROLL_TIMEOUT);
};

const handleResize = () => {
  if (window.innerWidth <= 768) {
    filtersBar.value = false;
  } else {
    const savedFiltersBar =
      localStorage.getItem(`${props.pageTitle}FilterBarState`) ||
      props.filterBarDefault;
    filtersBar.value = JSON.parse(savedFiltersBar);
  }
};

const generateFilterQueries = async () => {
  filterResults.value = {}; // Сброс текущих результатов фильтрации

  for (const filterQuery of props.filtersQueries) {
    try {
      const { Name, Label, QueryType, ViewType, Slider } = filterQuery;
      filterResults.value[Name] = {
        data: [],
        Name,
        Label,
        QueryType,
        ViewType,
        Slider,
      };

      switch (QueryType) {
        case "Relative":
          filterResults.value[Name].data = await getContentRelationTypeQuery(
            Name
          );
          break;
        case "Simple":
          filterResults.value[Name].data = await getContentTypeQuery(Name);
          break;
        default:
          console.warn(`Unknown QueryType: ${QueryType} for filter ${Name}`);
      }
    } catch (error) {
      console.error(
        `Error processing filter query for ${filterQuery.Name}:`,
        error
      );
      // Здесь можно определить логику для обработки ошибки
    }
  }
};
const toggleFilterBar = async () => {
  filtersBar.value = !filtersBar.value;
};

const UpdateSwiperStatus = async (newStatus) => {
  filtersBar.value = newStatus;
};

const searchQuery = async (event) => {
  searchRequest.value = event.target.value.trim();
  await getQuery();
  await ResetScrollParameter();
};

const getContentTypeQuery = async (type) => {
  const array = [];
  query.value.forEach((item) => {
    const value = item.Information[type];
    if (value && value.toString().trim() !== "" && !array.includes(value)) {
      array.push(value);
    }
  });
  return array;
};

const getContentRelationTypeQuery = async (type) => {
  const array = [];
  const arrayIds = [];
  query.value.forEach((item) => {
    if (
      item.Information[type] &&
      !arrayIds.includes(item.Information[type]._id)
    ) {
      arrayIds.push(item.Information[type]._id);
      array.push(item.Information[type]);
    }
  });
  return array;
};

const getText = () => {
  if (props.TextRequest) {
    const requestURL = `${apiBase}/content/item${props.TextRequest}?locale=${locale.value}`;
    const { execute } = useFetch(requestURL, {
      method: "GET",
      headers: {
        "api-key": `${apiToken}`,
      },
      lazy: true,
      onResponse({ response }) {
        Text.value = response._data.Text;
      },
    });
    execute();
  }
};

const getQuery = () => {
  let filtersQuery = "";
  filters.value.forEach((filter) => {
    filtersQuery += filter.query;
    console.log(filter)
  });
  const filtersRequest = filtersQuery
    ? "&filter=" + encodeURIComponent(`{$and:[${filtersQuery}]}`)
    : "";
  const searchArea =
    locale.value !== "en"
      ? (props.searchField || "Title") + "_" + locale.value
      : props.searchField || "Title";
  let searchQuery = searchRequest.value
    ? `&filter=${encodeURIComponent(
        JSON.stringify({
          [searchArea]: { $regex: searchRequest.value, $options: "i" },
        })
      )}`
    : "";
  let sortQuery = sort.value ? `&sort=${encodeURIComponent(sort.value)}` : "";
  // const requestURL = `${request.value}${filtersRequest}${searchQuery}${sortQuery}&populate=1`;
  // // Использование useFetch с ленивой загрузкой
  // const { execute } = useFetch(requestURL, {
  //   method: "GET",
  //   headers: {
  //     "api-key": `${apiToken}`,
  //   },
  //   lazy: true, // Указывает useFetch ждать вызова fetch (execute) для запуска запроса
  //   onResponse({ response }) {
  //     query.value = response._data;
  //   },
  // });
  // execute();
};

// const openFilter = async (type) => {
//   openedFilter.value = type;
// };

// const removeFilterItem = async (filterKey) => {
//   filters.value.splice(filterKey, 1);
//   await getQuery();
//   await ResetScrollParameter();
// };

const addFilterItem = async (type, value, operator, label) => {
  const localeSufix =
    locale.value !== "en" ? encodeURIComponent("_" + locale.value) : "";
  const query = `{"Information${localeSufix}.${type}":"${value}"},`;
  const filterExists = filters.value.some(
    (filter) => filter.query.trim() === query.trim()
  );

  if (!filterExists) {
    filters.value.push({
      query: query,
      label: label || type,
    });
    await getQuery();
    await ResetScrollParameter();
  }
};

const isFilterActive = (type, id) => {
  return filters.value.some((filter) => {
    return filter.query.includes(`filters[${type}]=${id}`);
  });
};

const isFilterLabelActive = (label) => {
  return filters.value.some((filter) => {
    return filter.label.includes(label);
  });
};
const restoreScrollPosition = () => {
  const currentQuery = router.currentRoute.value.query;
  if (currentQuery.scrl > 0 && refreshed.value) {
    // Убедитесь, что у вас есть реактивное свойство refreshed
    window.scrollTo({ top: 0 });
  } else {
    window.scrollTo({ top: currentQuery.scrl || 0 });
  }
};

const loadQueryParameters = () => {
  const currentQuery = router.currentRoute.value.query;
  filters.value = currentQuery.filters ? JSON.parse(currentQuery.filters) : [];
  searchRequest.value = currentQuery.searchRequest || null;
};
onMounted(() => {
  refreshParameters();
  document.body.classList.remove("overflow-hidden");
  loadQueryParameters();
  getText();
  getQuery();
  restoreFromLocalStorage();
  document.body.classList.add("bottom-construction");
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

// onUnmounted(() => {
//   document.body.classList.remove("bottom-construction");
//   window.removeEventListener("scroll", handleScroll);
//   window.removeEventListener("resize", handleResize);
// });
</script>
