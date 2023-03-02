<script>
    import {location} from 'svelte-spa-router'
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Modal from '../components/Modal.svelte'
    // let showModal = false

    let open = false
    let games = [];
    let error = null;
    onMount(async () => {
            try {
            const res = await axios.get(`https://api.rawg.io/api/games?key=855e8fead27a4466b0d05ad24f6a36af`);
            games = res.data.results;
            console.log(res.data.results)
        } catch (e) {
            error = e;
        }
    });

    let selectedItem = null;

    function showModal(item) {
        selectedItem = item;
    }

    function handleClose() {
        selectedItem = null;
    }

    // let selectedItem;

    // function showMoreInfo(game) {
    //     showModal = !showModal
    //     selectedItem = game; // set the selected item to show in the modal
    // }

</script>

<div class="bg-white">
    <div class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
        </div>

        <div class="relative mt-8">
            <div class="relative -mb-6 w-full overflow-x-auto pb-6">
                <ul role="list" class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">

                    {#each games as game}

                    <li class="inline-flex w-64 flex-col text-center lg:w-auto">
                        <div class="group relative">
                            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                                <img  src="{game.background_image}" alt="Black machined steel pen with hexagonal grip and small white logo at top." class="h-full w-full object-center group-hover:opacity-75 background_image">
                            </div>
                            <div class="mt-6">
                                <h3 class="mt-1 font-semibold text-gray-900">
                                    <button on:click={() => showModal(game)}>
                                        <span class="absolute inset-0"></span>
                                        {game.name}
                                    </button>
                                </h3>
                                <p class="text-sm text-gray-500">available platforms:</p>
                                {#each game.parent_platforms as platforms}
                                <p class="text-sm text-gray-500">{platforms.platform.name}</p>
                                {/each}
                                <p class="mt-1 text-gray-900">metacritic: {game.metacritic} </p>
                                {#each game.tags.slice(0, 2) as tag}
                                <p class="mt-1 text-gray-900">tags: {tag.name} </p>
                                {/each}
                            </div>
                        </div>
                    </li>

                        {#if selectedItem}
                            <Modal game={selectedItem} onclose={() => handleClose()} />
                        {/if}

                    {/each}
                    <!-- More products... -->
                </ul>
            </div>
        </div>

        <div class="mt-12 flex px-4 sm:hidden">
            <a href="#" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                See everything
                <span aria-hidden="true"> &rarr;</span>
            </a>
        </div>
    </div>

</div>
