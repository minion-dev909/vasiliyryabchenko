<template>
  <div>
    <NuxtLayout
      name="page-query-list"
      :requestAPI="request"
      :filtersQueries="filtersQueries"
      Text=""
      :component="component"
      :filterBarDefault="true"
      pageTitle="Artworks"
      v-if="request && component"
    >
      <template #right>
        <ArtworkViewSwitcher
          :view="view"
          :setView="UpdateView"
        ></ArtworkViewSwitcher>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import ArtworkSliderView from "@/components/Artwork/ArtworkSliderView.vue";
import ArtworkGridView from "@/components/Artwork/ArtworkGridView.vue";
const component = shallowRef(ArtworkSliderView);
const view = ref(null);

watch(view, async (newView) => {
  if (newView !== null) {
    saveToLocalStorage();
  }
});
const handleResize = () => {
  if (window.innerWidth <= 768) {
    view.value = "Grid";
    component.value = ArtworkGridView;
  }
};
const request =
  "/Artwork";

const filtersQueries = [
  {
    Name: "Type",
    Label: "Type",
    QueryType: "Simple",
    ViewType: "Default",
  },
  {
    Name: "Series",
    Label: "Series",
    QueryType: "Relative",
    ViewType: "Slider"
  },
];

const UpdateView = async (newValue) => {
  view.value = newValue;
  window.scrollTo({ top: 0 });
  if (newValue === "Grid") {
    component.value = ArtworkGridView;
  } else {
    component.value = ArtworkSliderView;
  }
};

const restoreFromLocalStorage = () => {
  if (localStorage.getItem("view")) {
    view.value = localStorage.getItem("view");
    if (localStorage.getItem("view") === "Slide") {
      component.value = ArtworkSliderView;
    } else {
      component.value = ArtworkGridView;
    }
  } else {
    view.value = "Grid";
    component.value = ArtworkGridView;
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("view", view.value);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  restoreFromLocalStorage();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
