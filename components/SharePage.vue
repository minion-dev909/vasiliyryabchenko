<template>
  <div class="[&>button]:opacity-70 hover:[&>button]:opacity-100">
    <button @click="shareToFacebook">
      <Icon name="mdi:facebook-box" size="1.5em"/>
      <span class="sr-only">Facebook</span>
    </button>
    <button @click="shareToTwitter">
      <Icon name="mdi:twitter-box" size="1.5em"/>
      <span class="sr-only">Twitter</span>
    </button>
    <button @click="shareToLinkedIn">
      <Icon name="ri:linkedin-box-fill" size="1.5em"/>
      <span class="sr-only">LinkedIn</span>
    </button>
  </div>
</template>

<script setup>
const shareUrl = "URL_ДЛЯ_ПОДЕЛИТЬСЯ"; // Замените эту строку на URL, который вы хотите поделиться
const shareText = "Текст для поделиться"; // Текст, который будет использоваться при публикации

function shareToFacebook() {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;
  window.open(facebookUrl, "_blank");
}

function shareToTwitter() {
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;
  window.open(twitterUrl, "_blank");
}

function shareToLinkedIn() {
  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    shareUrl
  )}&title=${encodeURIComponent(shareText)}`;
  window.open(linkedInUrl, "_blank");
}

// Добавьте функции для других социальных сетей аналогично
</script>
