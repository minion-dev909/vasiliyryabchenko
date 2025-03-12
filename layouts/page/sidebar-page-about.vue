<template>
    <div class="pt-10 flex flex-col gap-5">
        <div class="grid grid-cols-1">
            <TemplatingGrid3Cols class="pb-6">
                <div class="order-last lg:order-first relative lg:col-span-1 px-4 md:px-8 lg:px-0 lg:pr-10 lg:ml-8">
                    <div class="navigation hidden transition-all top-[5em] sticky mb-6 lg:block overflow-y">
                        <div class="lg:flex flex-col lg:gap-1 w-full group">
                            <slot name="sidecontent" />
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-2 xl:col-span-3">
                    <div class="px-4 md:px-8 lg:px-0 lg:pr-8 w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-10">
                        <slot name="content" />
                    </div>
                </div>
            </TemplatingGrid3Cols>
        </div>
    </div>
</template>