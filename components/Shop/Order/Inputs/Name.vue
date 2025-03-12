<template>
  <div class="name-input-container flex flex-row justify-between w-full">
    <div class="name-input w-full" :class="{ 'valid': isValidFirstName }">
      <input
        type="text"
        v-model="firstName"
        @keyup="validateFirstName()"
        class="name-field bg-white border border-r-0 p-2 text-lg text-gray-600 focus:ring-0 focus:outline-none"
        placeholder="First name"
      />
    </div>
    <div class="name-input w-full" :class="{ 'valid': isValidFirstName && isValidLastName }">
      <input
        type="text"
        v-model="lastName"
        @keyup="validateLastName()"
        class="name-field bg-white border border-l-0 p-2 text-lg text-gray-600 focus:ring-0 focus:outline-none"
        placeholder="Last name"
      />
      <svg viewBox="0 0 24 24" class="person-icon">
        <circle cx="12" cy="7" r="4"></circle>
        <path d="M14 11H10c-3.866 0-7 3.134-7 7v1h18v-1c0-3.866-3.134-7-7-7z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref("");
const lastName = ref("");
const isValidFirstName = ref(false);
const isValidLastName = ref(false);

function validateFirstName() {
  isValidFirstName.value = firstName.value.length > 1;
}

function validateLastName() {
  isValidLastName.value = lastName.value.length > 1;
}
</script>

<style scoped>
.name-input-container {
  display: flex;
}

.name-input {
  position: relative;
  width: 50%; /* Adjust width as needed */
  display: flex;
  justify-content: center;
}

.name-field {
  width: 100%;
}

.name-input svg.person-icon {
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

.name-input.valid svg.person-icon {
  stroke: #69dd95;
  opacity: 1;
}
</style>
