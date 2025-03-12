<template>
        <div class="grid grid-cols-1 gap-10">
            <slot name="content" />
        </div>
</template>

<style>
body.scrolled .navigation {
    top: 5em;
}
</style>