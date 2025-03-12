<template>
    <div class="flex flex-col gap-5">
        <div class="grid grid-cols-1 md:gap-8">
            <slot name="content" />
        </div>
    </div>
</template>

<style>
body.scrolled .navigation {
    top: 5em;
}
</style>