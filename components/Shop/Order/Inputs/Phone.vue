<template>
  <div class="pn-select" :class="isOpen ? 'pn-select--open' : ''">
    <button class="pn-selected-prefix" @click="toggleDropdown">
      <img
        :src="`https://flagpedia.net/data/flags/icon/36x27/${selectedCountry.flag}.png`"
        alt="Flag"
        class="pn-selected-prefix__flag"
      />
      <svg class="pn-selected-prefix__icon" fill="none" stroke="#081626">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="pn-input">
      <div class="pn-input__container">
        <input
          class="pn-input__prefix focus:outline-none focus:ring-0 w-[3em] bg-white"
          :value="`+${selectedCountry.prefix}`"
          readonly
        />
        <input
          class="pn-input__phonenumber bg-white"
          v-model="formattedPhoneNumber"
          @input="formatPhoneNumber"
          type="tel"
          name="phonenumber"
          pattern="\d*"
          placeholder=" "
          autocomplete="nope"
          required
          maxlength="15"
        />
        <small class="pn-input__error">This is not a valid phone number</small>
      </div>
      <Icon
        name="material-symbols:phone-iphone"
        size="1.5em"
        class="text-gray-200"
      />
    </div>
    <div class="pn-dropdown" v-show="isOpen">
      <div class="pn-search">
        <input
          v-model="searchQuery"
          class="pn-search__input"
          placeholder="Search for countries"
          type="search"
        />
      </div>
      <ul class="pn-list" v-if="filteredCountries">
        <li
          v-for="country in filteredCountries"
          :key="country.flag"
          @click="selectCountry(country)"
          class="pn-list-item"
        >
          <img
            :src="`https://flagpedia.net/data/flags/icon/36x27/${country.flag}.png`"
            class="pn-list-item__flag"
          />
          {{ country.name }} (+{{ country.prefix }})
        </li>
        <li
          v-if="filteredCountries.length === 0"
          class="pn-list-item pn-list-item--no-results"
        >
          No results found
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const isValidFirstName = ref(false)
const isOpen = ref(false);
const countries = ref([
  { name: "United States", prefix: "1", flag: "us" },
  { name: "Canada", prefix: "1", flag: "ca" },
  { name: "Germany", prefix: "49", flag: "de" },
  { name: "France", prefix: "33", flag: "fr" },
  { name: "Spain", prefix: "34", flag: "es" },
  { name: "Italy", prefix: "39", flag: "it" },
  { name: "Russia", prefix: "7", flag: "ru" },
  { name: "Brazil", prefix: "55", flag: "br" },
  { name: "Australia", prefix: "61", flag: "au" },
  { name: "India", prefix: "91", flag: "in" },
  { name: "China", prefix: "86", flag: "cn" },
  { name: "Japan", prefix: "81", flag: "jp" },
  { name: "South Korea", prefix: "82", flag: "kr" },
  { name: "United Kingdom", prefix: "44", flag: "gb" },
]);
const selectedCountry = ref({ name: "Netherlands", prefix: "31", flag: "nl" });
const searchQuery = ref("");

const phoneNumber = ref("");
const formattedPhoneNumber = ref("");

const filteredCountries = computed(() => {
  if (!searchQuery.value) {
    return countries.value; // Обращаемся к .value, так как countries - это ref
  }
  return countries.value.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectCountry(country) {
  selectedCountry.value = country;
  isOpen.value = false;
}

function closeDropdown() {
  isOpen.value = false;
}

function formatPhoneNumber(event) {
  const input = event.target.value.replace(/\D/g, ""); // Удаляем все, кроме цифр
  let formattedInput = "";

  // Добавляем дефисы в нужных местах
  for (let i = 0; i < input.length; i++) {
    if (i === 3 || i === 6) {
      formattedInput += "-";
    }
    formattedInput += input[i];
  }

  // Обновляем модели для отображения и отправки формы
  phoneNumber.value = input; // сохраняем неформатированный номер для отправки на сервер
  formattedPhoneNumber.value = formattedInput; // обновляем отображаемое значение
}

const selectContainer = ref(null);
</script>
<style scoped>
input[type="search"],
input[type="tel"],
input[type="text"] {
  font-size: 1rem;
  border: 0;
  font-family: inherit;
  outline: none;
  color: inherit;
  margin: 0;
  padding: 0;
  width: auto;
  max-width: 100%;
}

input[type="search"]::-webkit-input-placeholder,
input[type="tel"]::-webkit-input-placeholder,
input[type="text"]::-webkit-input-placeholder,
input[type="search"]::-moz-placeholder,
input[type="tel"]::-moz-placeholder,
input[type="text"]::-moz-placeholder,
input[type="search"]:-ms-input-placeholder,
input[type="tel"]:-ms-input-placeholder,
input[type="text"]:-ms-input-placeholder,
input[type="search"]:-moz-placeholder,
input[type="tel"]:-moz-placeholder,
input[type="text"]:-moz-placeholder {
  font-weight: 300;
  color: #6b7280;
}

.pn-select {
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: #eaeaec;
  display: grid;
  grid-template-columns: 4.5em 1fr;
  transition: all 0.2s ease-out;
  width: 100%;
  z-index: 1;
}

.pn-select:focus,
.pn-select:focus-within {
  box-shadow: 0;
}

svg.person-icon {
  transition: all 0.5s ease;
  position: absolute;
  z-index: 1;
  right: 14px;
  top: 50%;
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #d1d7e3;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  margin: -12px 0 0 0; /* Center the icon vertically */
  opacity: 0.5;
}

.pn-dropdown {
  background: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #eaeaec;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.135);
  opacity: 0;
  padding: 0 0.5em 0.5em;
  pointer-events: none;
  position: absolute;
  top: 140%;
  transform-origin: left top;
  transition: all 0.15s ease-out;
  width: 100%;
  visibility: hidden;
}

.pn-select--open .pn-dropdown {
  pointer-events: all;
  transform: none;
  opacity: 1;
  top: 120%;
  visibility: visible;
}

.pn-search {
  position: relative;
  display: flex;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #eaeaec;
  margin-bottom: 0.5em;
}

.pn-search svg {
  display: block;
  height: 1.25rem;
  left: 0.5em;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
}

.pn-search input[type="search"] {
  padding-left: 2.5rem;
  height: 3rem;
  width: 100%;
}

.pn-list {
  margin-right: -0.5em;
  max-height: 10.5em;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ffffff #ffffff;
  position: relative;
}

.pn-list::-webkit-scrollbar {
  width: 10px;
}

.pn-list:hover {
  scrollbar-color: #c0c4ca #ffffff;
}

.pn-list::-webkit-scrollbar-track {
  background: #ffffff;
}

.pn-list::-webkit-scrollbar-thumb {
  background-color: #c0c4ca;
  border: 3px solid #ffffff;
}

.pn-list--no-scroll {
  margin-right: 0;
}

.pn-selected-prefix {
  align-items: center;
  appearance: none;
  background: #f3f5f9;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0;
  outline: none;
  padding: 0;
  transition: background 0.2s ease-out;
}

.pn-selected-prefix:hover,
.pn-selected-prefix:focus {
  background: #e6eaf1;
}

.pn-selected-prefix__flag {
  height: auto;
  width: 1.25rem;
}

.pn-selected-prefix__icon {
  display: block;
  height: 1.25rem;
  margin-left: 0.5em;
  margin-right: -0.25em;
  transition: all 0.15s ease-out;
  width: 1.25rem;
}

.pn-select--open .pn-selected-prefix__icon {
  transform: rotate(180deg);
}

.pn-input {
  background: #ffffff;
  line-height: 1;
  overflow: hidden;
  padding: 0.5rem;
  display: flex;
}

.pn-input__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pn-input__label {
  color: #85898f;
  font-size: 0.7rem;
  position: relative;
  top: -0.25em;
}

.pn-input__error {
  bottom: 0;
  color: #ff0000;
  font-size: 0.785rem;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: all 0.2s ease-out;
  z-index: -1;
}

.pn-input input[type="text"] {
  background: transparent;
  position: absolute;
  color: #656b73;
  max-width: 3rem;
  pointer-events: none;
}

.pn-input input[type="tel"] {
  color: #081627;
  font-weight: 500;
}

.pn-list-item {
  align-items: center;
  display: flex;
  font-weight: 400;
  padding: 0.6em 0.75em;
  transition: background-color 0.2s ease-out;
  cursor: pointer;
  outline: none;
}

.pn-list-item__flag {
  width: 1.25em;
  height: auto;
  margin-right: 1em;
  display: block;
}

.pn-list-item__country {
  margin-right: 0.25em;
}

.pn-list-item:hover,
.pn-list-item:focus {
  background-color: #f3f5f9;
}

.pn-list-item--selected {
  pointer-events: none;
  font-weight: 500;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23103155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-position: right 0.75em top 50%;
  background-repeat: no-repeat;
  background-size: 1.25rem;
}

.pn-list-item--no-results {
  pointer-events: none;
}
</style>
