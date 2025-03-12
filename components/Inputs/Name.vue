<template>
  <div class="name-input-container">
    <div class="name-input w-full" :class="isValidName ? 'valid' : ''">
      <input
        type="text"
        v-model="internalName"
        @input="updateValue"
        @keyup="validateName()"
        class="name-field w-full bg-white border p-4 text-lg text-gray-600 focus:ring-0 focus:outline-none"
        placeholder="Last name"
      />
      <svg viewBox="0 0 24 24" class="person-icon">
        <circle cx="12" cy="7" r="4"></circle>
        <path
          d="M14 11H10c-3.866 0-7 3.134-7 7v1h18v-1c0-3.866-3.134-7-7-7z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup>

// Определение props
const props = defineProps({
  modelValue: String,
});

// Определение emits
const emit = defineEmits(['update:modelValue']);

const internalName = ref(props.modelValue);
const isValidName = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    internalName.value = newValue;
  }
);

function updateValue() {
  emit("update:modelValue", internalName.value); // Используйте emit для обновления modelValue
}

function validateName() {
  isValidName.value = internalName.value.length > 1;
}
</script>

<style scoped>
.name-input {
  position: relative;
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
