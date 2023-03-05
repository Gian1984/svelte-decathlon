<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    import Modal from '../components/Modal.svelte'

    import {cache, timeout} from "../store.js"
    import axios from 'axios';

    //  data collection
    const dispatch = createEventDispatcher();
    $: searchQuery= '';
    let filter = 1;
    let placeholderText = 'Search by name';
    const PAGE_SIZE = 10;
    let currentPage = 1;
    let totalPages = 1;
    let games = [];
    let selectedItem = null;
    let resultItem = null;


   // get data function
    async function fetchItems()  {

        // check cache & timout in the store before fetch
        if($cache.length<1 || $timeout == true) {
            const res = await axios.get(`https://api.rawg.io/api/games?key=855e8fead27a4466b0d05ad24f6a36af`);
            games = res.data.results;
            $cache = res.data.results;
            totalPages = Math.ceil(games.length / PAGE_SIZE);
        }

        games = $cache
        totalPages = Math.ceil(games.length / PAGE_SIZE);
    }

    // filter selector
    function updateFilter(value) {
        filter = value;
    }

    // filter
    $: filterGames = games.filter(item => {
        let name = item.name
        let released = item.released
        let rating = item.rating
        if(filter == 1  ){
            placeholderText = 'Search by name';
            const regex = new RegExp(searchQuery, 'i');
            return regex.test(name);
        } else if ( filter == 2){
            placeholderText = 'Search by release ( Ex: 2015-02-20 )';
            const regex = new RegExp(searchQuery, 'i');
            return regex.test(released);
        } else {
            placeholderText = 'Search by rating ( Ex: 4.42 )';
            const regex = new RegExp(searchQuery, 'i');
            return regex.test(rating);
        }
    });

    // pagination block function start
    function updatePagination(page) {
        currentPage = page;
        dispatch('change', currentPage);
    }

    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            updatePagination(page);
        }
    }

    function next() {
        if (currentPage < totalPages) {
            updatePagination(currentPage + 1);
        }
    }

    function prev() {
        if (currentPage > 1) {
            updatePagination(currentPage - 1);
        }
    }
    // pagination block function end

    // open modal
    function showModal(item) {
        selectedItem = item;
    }

    // close modal
    function handleClose() {
        selectedItem = null;
    }

    onMount(fetchItems)

</script>

<div class="bg-neutral-900">
    <div class="pt-16 sm:pt-24 lg:mx-auto xl:container lg:px-8">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
            <h2 class="text-6xl font-bold tracking-tight text-white">New & Trending </h2>
        </div>


        <!-- filter input -->
        <div class="px-4">
            <p  class="mt-5 block text-sm font-medium text-gray-300">
                Find your game here!
            </p>
            <div class="inline-flex rounded-md shadow-sm my-3" role="group">
                <button type="button" on:click={() => updateFilter(1)} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    By name
                </button>
                <button type="button" on:click={() => updateFilter(2)} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Release date
                </button>
                <button type="button" on:click={() => updateFilter(3)} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Rating
                </button>
            </div>
            <input type="search" on:input={e => searchQuery = e.target.value} name="name" id="name"  class="font-light mt-1 bg-neutral-900 text-gray-300 appearance-none block w-full px-3 py-2 border border-white rounded-md shadow-sm placeholder-gray-500 placeholder-opacity-75 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm " placeholder={placeholderText} />
        </div>

        <!-- filter result -->
        {#if searchQuery}
            <div class="px-4">
                <div class="border-2 border-neutral-900 rounded ">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 py-2 px-2">

                        {#each filterGames as result}
                            <div class="relative rounded border border-gray-300 bg-neutral-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-white">
                                <button on:click={() => console.log('click'), showModal(result)} class="flex items-center justify-center">
                                    <span class="h-2 w-2 rounded-full items-center justify-center ring-4 ring-white"></span>
                                    <p class="text-white ml-2">{ result.name }</p>
                                </button>
                            </div>
                        {/each}

                        <!-- modal -->
                        {#if selectedItem}
                            <Modal result={resultItem} onclose={() => handleClose()} />
                        {/if}

                    </div>
                </div>
            </div>
        {/if}

        <!-- main card block content & navigation -->
        <div class="relative mt-16">

            <!-- card block content -->
            <div class="relative -mb-6 pb-6 flex justify-center">
                <ul role="list" class="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">

                    {#each games.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE) as game}
                        <li class="inline-flex xs:w-32 sm:w-64 flex-col text-center lg:w-auto">
                            <div class="group relative">
                                <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                                    <img  src="{game.background_image}" alt="single-game-{game.name}" class="h-full w-full object-center group-hover:opacity-75 background_image">
                                </div>
                                <div class="mt-6 info-card-section">

                                    <!-- name -->
                                    <h3 class="mt-1 font-semibold text-white">
                                        <button on:click={() => showModal(game)}>
                                            <span class="absolute inset-0 game-name"></span>
                                            <p class="game-name">{game.name}</p>
                                        </button>
                                    </h3>

                                    <!-- platforms -->
                                    <p class="text-sm text-gray-300">Available platforms:</p>
                                    <div class="items-center space-x-2 py-1">
                                        {#each game.parent_platforms as platforms}
                                            <span class="inline-block flex-shrink-0 border border-yellow-300 rounded-full  px-2 py-0.5 text-xs font-medium text-yellow-300">{platforms.platform.name}</span>
                                        {/each}
                                    </div>

                                    <!-- metacritic -->
                                    <p class="mt-1 text-sm text-gray-300">Metacritic: {game.metacritic} </p>

                                    <!-- tags -->
                                    <div class="items-center space-x-3">
                                        {#each game.tags.slice(0, 2) as tag}
                                        <span class="inline-block flex-shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white">#{tag.name}</span>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </li>
                    {/each}

                    <!-- modal -->
                    {#if selectedItem}
                        <Modal game={selectedItem} onclose={() => handleClose()} />
                    {/if}

                </ul>
            </div>

            <!-- page navigation -->
            <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <div class="-mt-px flex w-0 flex-1">
                    <button on:click={prev} class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        <svg class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd" />
                        </svg>
                        Previous
                    </button>
                </div>
                <div class="hidden md:-mt-px md:flex">
                    <p class="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500">Page {currentPage} of {totalPages}</p>
                </div>
                <div class="-mt-px flex w-0 flex-1 justify-end">
                    <button on:click={next} class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Next
                        <svg class="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </nav>

        </div>
    </div>
</div>


