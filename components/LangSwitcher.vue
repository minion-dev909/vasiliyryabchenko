<script setup>
const { locales, locale, setLocale } = useI18n()

const language = computed({
    get: () => locale.value,
    set: (value) => {
        setLocale(value);
    },
})
</script>

<template>
    <select aria-label="Language" v-model="language" class="bg-transparent ring-0 outline-0 w-fit">
        <option v-for="item in locales" 
                :key="typeof item === 'object' ? item.code : item" :value="typeof item === 'object' ? item.code : item">
                {{ typeof item === 'object'? item.name : item }} 
        </option>
        </select>
</template>