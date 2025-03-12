<template>
    <LoadingScreen />
    <NuxtLayout name="header">
    </NuxtLayout>
    <div id="content" class="pt-[5em] lg:pt-[6em] min-h-screen border-b">
        <slot/>
    </div>
    <NuxtLayout name="footer"></NuxtLayout>
</template>