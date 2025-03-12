<template>
    <div class="flex flex-col gap-5">
        <div class="grid grid-cols-1 gap-6">
            <slot/>
        </div>
    </div>
</template>

<style>
body.scrolled .navigation {
    top: 5em;
}
</style>