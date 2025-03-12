<template>
  <div v-if="data">
    <PageTitle Label="Photos" />
    <div>
      <div v-for="decade in Object.keys(groupedPhotos)" :key="decade">
        <h2 class="text-xl font-semibold pb-5 text-gray-500">
          {{ decade }}
        </h2>
        <div class="grid-cols-1 md:grid-cols-2 grid gap-4 md:gap-8 pb-12">
          <!-- <GeneralMediaObject
            v-for="photo in groupedPhotos[decade]"
            :MediaObject="photo.data[0].translations[0]"
          ></GeneralMediaObject> -->
        </div>
      </div>
      <GeneralMediaObject
        :MediaObject="data.data[0].translations[0]"
      ></GeneralMediaObject>
    </div>
  </div>
</template>

<script setup>
const PageName = ref("Photos");
const props = defineProps({
  data: Object
});
console.log("photos");
console.log(props.data);
const groupedPhotos = ref({});
const sortedPhotosAll = ref([]);
const groupPhotosByDecade = (photos) => {
  const sortedPhotos = photos.sort((a, b) => {
    const yearA = parseInt(a.data.data[0].translations[0].PhotosYear[0].replace("s", ""));//
    const yearB = parseInt(b.data.data[0].translations[0].PhotosYear[0].replace("s", ""));//
    return yearA - yearB;
  });

  sortedPhotosAll.value = sortedPhotos;
  return sortedPhotos.reduce((result, photo) => {
    const decade = extractDecade(photo.data.data[0].translations[0].PhotosYear[0]);//
    if (!result[decade]) {
      result[decade] = [];
    }
    result[decade].push(photo);
    return result;
  }, {});
};

const extractDecade = (year) => {
  return String(year).includes("s")
    ? String(year)
    : Math.floor(year / 10) * 10 + "s";
};

const getSortedIndex = (photo) => {
  return sortedPhotosAll.value.findIndex(
    (sortedPhoto) => sortedPhoto.id[0] === photo.PhotosId[0]//
  );
};

// onMounted(() => {
//   execute();
//   document.body.classList.remove("overflow-hidden");
// });

// onUnmounted(() => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// });
</script>
