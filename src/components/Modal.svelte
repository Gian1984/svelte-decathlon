<script>
    import Carousel from 'svelte-carousel'
    export let game = null;
    export let onclose = () => {};

    function handleClose() {
        console.log('click')
        onclose();
    }

</script>
{#if game !== null}
<div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
    <div class="modal-overlay fixed w-full h-full bg-neutral-600 bg-opacity-75 transition-opacity"></div>
    <div class="bg-white w-full lg:h-5/6 lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
        <div class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold">
            {game.name}
            <button class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4" on:click={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>
        </div>
        <div class="content p-8">
            <div class="sm:flex pb-5">
                <div class="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                    <img src="{game.background_image}" class="h-32 w-full border border-gray-300 bg-white text-gray-300 sm:w-32 modal-main-img" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200" aria-hidden="true"/>
                </div>
                <div>
                    <h4 class="text-lg font-bold">Released: {game.released}</h4>
                    <div class="mt-3">
                        <p class="text-sm text-gray-500">Available platforms:</p>
                        <div class="items-center space-x-2 py-1">
                            {#each game.parent_platforms as platforms}
                                <span class="inline-block flex-shrink-0 border border-gray-900 rounded-full  px-2 py-0.5 text-xs font-medium text-gray-900">{platforms.platform.name}</span>
                            {/each}
                        </div>
                        <p class="text-sm text-gray-500">Tag:</p>
                        <div class="items-center space-x-3">
                            {#each game.tags.slice(0, 2) as tag}
                                <span class="inline-block flex-shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white">#{tag.name}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <div class="my-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
                <Carousel
                        autoplay
                        autoplayDuration={2000}
                        arrows={false}
                >
                    {#each game.ratings as rate}
                        <div class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div class="lg:col-span-12 xl:items-start xl:gap-x-8">
                                <div class="flex items-center xl:col-span-1">
                                    <div class="flex items-center">
                                        <!-- Active: "text-yellow-400", Inactive: "text-gray-200" -->
                                        <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                        </svg>

                                        <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                        </svg>

                                        <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                        </svg>

                                        <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                        </svg>

                                        <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-sm text-gray-700">{rate.percent} %<span class="sr-only"> out of 5 stars</span></p>
                                </div>

                                <div class="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                    <h3 class="text-sm font-medium text-gray-900">{rate.title}</h3>

                                    <div class="my-3 space-y-6 text-sm text-gray-500">
                                        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    {/each}
                </Carousel>

            </div>

            <Carousel
                    let:loaded
            >
                {#each game.short_screenshots as src, imageIndex (src)}
                    <div class="img-container">
                        {#if loaded.includes(imageIndex)}
                            <img src="{src.image}" alt="nature" />
                        {/if}
                    </div>
                {/each}
            </Carousel>
        </div>
    </div>
</div>


{/if}