<template>
  <div class="flex-col flex gap-4">
    <div class="text-2xl">
      Are you interested in this artwork? - Ask us about it.
    </div>
    <div class="text-lg"></div>
    <InputsName v-model="fullName" />
    <InputsEmail v-model="email" />
    <textarea
      v-model="message"
      placeholder="leave a message..."
      class="text-lg border p-4 min-h-[6em] max-h-[6em] w-full focus:ring-0 focus:outline-none"
    />
    <button @click="send()" class="border py-2 px-4">
      {{ $t("Send Request") }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
console.log("requestForm");
console.log(props.data);
const router = useRouter();
const { siteBase, apiBase, apiToken } = useRuntimeData();

const token = "2ef68dfbc57f3e48c0eff3a95d09dc10caa9301c";
const fullName = ref("");
const email = ref("");
const message = ref("");
const emailError = ref("");
const fullNameError = ref("");

const send = () => {
  // Очистить предыдущие ошибки
  emailError.value = "";
  fullNameError.value = "";

  let isValid = true;

  if (!fullName.value) {
    fullNameError.value = "Name is required.";
    isValid = false;
  }

  if (!email.value) {
    emailError.value = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.value = "Please enter a valid email.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const form = {
    data: {
      Name: fullName.value,
      Email: email.value,
      Artwork: {
        Title: props.data.Title,
        Year: props.data.Year,
        Medium: props.data.Medium,
        Url: siteBase + router.currentRoute.value.path,
      },
      Message: message.value,
    },
  };

  fetch(`${apiBase}/inbox/submit/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiToken,
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error("Error:", error));
};

function validateEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
</script>
