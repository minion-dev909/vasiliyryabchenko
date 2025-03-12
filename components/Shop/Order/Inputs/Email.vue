<template>
  <div class="email" :class="{ 'success': isValidEmail }">
    <input
      type="text"
      v-model="email"
      @keyup="validateEmail()"
      class="bg-white w-full border p-2 text-lg text-gray-600 focus:ring-0 focus:outline-none"
      placeholder="test@test.com"
    />
    <svg viewBox="0 0 16 16">
      <path
        d="M10.8000002,10.8000002 C9.85000038,11.6500006 9.18349609,12 8,12 C5.80000019,12 4,10.1999998 4,8 C4,5.80000019 5.80000019,4 8,4 C10.1999998,4 12,6 12,8 C12,9.35332031 12.75,9.5 13.5,9.5 C14.25,9.5 15,8.60000038 15,8 C15,4 12,1 8,1 C4,1 1,4 1,8 C1,12 4,15 8,15 C12,15 15,12 15,8"
      ></path>
      <polyline
        points="5 8.375 7.59090909 11 14.5 4"
        transform="translate(0 -0.5)"
      ></polyline>
    </svg>
  </div>
</template>
<script setup>
const email = ref("");
const isValidEmail = ref(false);

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"+]*)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail() {
    console.log('sdf')
  isValidEmail.value = regex.test(email.value);
}
</script>
<style scoped>
.email {
  position: relative;
  width: 100%;
}

.email svg {
  position: absolute;
  z-index: 1;
  right: 14px;
  top: 50%;
  width: 20px;
  height: 20px;
  fill: none;
  margin: -10px 0 0 0;
}

.email svg polyline,
.email svg path {
  stroke: #d1d7e3;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.3s ease 0s;
}

.email svg path {
  stroke-dasharray: 64;
  stroke-dashoffset: 127;
  transition: stroke-dasharray 0.8s ease 0.8s, stroke-dashoffset 0.8s ease 0.5s;
}

.email svg polyline {
  stroke-dasharray: 18;
  stroke-dashoffset: 18;
  transition: stroke-dashoffset 0.5s ease 0s;
}

.email.success svg polyline,
.email.success svg path {
  stroke: #69dd95;
}

.email.success svg path {
  stroke-dasharray: 46;
  stroke-dashoffset: 150;
  transition: stroke-dasharray 0.6s ease 0s, stroke-dashoffset 0.8s ease 0.3s,
    stroke 0.3s ease 0.6s;
}

.email.success svg polyline {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.5s ease 0.6s, stroke 0.3s ease 0.6s;
}
</style>
