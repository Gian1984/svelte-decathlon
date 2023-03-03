<script>
    import {location} from 'svelte-spa-router'
    import {cache, timeout} from "../store.js"
    import { createEventDispatcher, setContext } from 'svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Modal from '../components/Modal.svelte'
    const dispatch = createEventDispatcher();


    let searchQuery= '';
    const PAGE_SIZE = 10;
    let currentPage = 1;
    let totalPages = 1;
    let games = [];
    let selectedItem = null;
    let resultItem = null

    async function fetchItems()  {
        if($cache.length<1 || $timeout == true) {
            const res = await axios.get(`https://api.rawg.io/api/games?key=855e8fead27a4466b0d05ad24f6a36af`);
            games = res.data.results;
            $cache = res.data.results;
            console.log(games)
                totalPages = Math.ceil(games.length / PAGE_SIZE);
            setContext('pagination', {
                currentPage,
                totalPages,
                goToPage,
                next,
                prev
            });
            setContext('games', games);
        }

        games = $cache
        console.log(games)
        totalPages = Math.ceil(games.length / PAGE_SIZE);
        setContext('pagination', {
            currentPage,
            totalPages,
            goToPage,
            next,
            prev
        });
        setContext('games', games);
    }

    $: filterGames = games.filter(item => {
        const regex = new RegExp(searchQuery, 'i');
        return regex.test(item.name);
    });


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

    function showModal(item) {
        console.log(item)
        selectedItem = item;
    }

    function handleClose() {
        selectedItem = null;
    }


    onMount(fetchItems)


</script>

<div class="bg-white">
    <div class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
            <h2 class="text-6xl font-bold tracking-tight text-gray-900">New & Trending </h2>
            <p>Based on player counts and release date</p>
        </div>

        <div>
            <label for="name" class="mt-5 block text-sm font-medium text-gray-700">
                Find your game here!
            </label>
            <input type="search" on:input={e => searchQuery = e.target.value} name="name" id="name"  class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="Enter a search here!" />
        </div>

        {#if !searchQuery}
        <p class="mb-2 text-right" ></p>

        {:else if searchQuery && searchQuery.length >= 1 }

        <div>

            <div  class="border-2 border-orange-300 rounded-2xl mt-2">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 py-2 px-2">


                    {#each filterGames as result}
                    <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                        <div class="flex-shrink-0">
                            <span class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"></span>
                        </div>
                        <div class="flex-1 min-w-0">

                                <span class="absolute inset-0" aria-hidden="true" />
                                <button on:click={() => showModal(result)} class="text-sm font-medium text-gray-900">
                                    { result.name }
                                </button>
                        </div>
                    </div>
                    {/each}
                    {#if selectedItem}
                        <Modal result={resultItem} onclose={() => handleClose()} />
                    {/if}
                </div>
            </div>
        </div>
        {/if}



        <div class="relative mt-16">
            <div class="relative -mb-6 pb-6 flex justify-center">
                <ul role="list" class="grid xs:grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {#each games.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE) as game}

                    <li class="inline-flex w-64 flex-col text-center lg:w-auto">
                        <div class="group relative">
                            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                                <img  src="{game.background_image}" alt="Black machined steel pen with hexagonal grip and small white logo at top." class="h-full w-full object-center group-hover:opacity-75 background_image">
                            </div>
                            <div class="mt-6 h-36 info-card-section">
                                <h3 class="mt-1 font-semibold text-gray-900">
                                    <button on:click={() => showModal(game)}>
                                        <span class="absolute inset-0"></span>
                                        {game.name}
                                    </button>
                                </h3>
                                <p class="text-sm text-gray-500">Available platforms:</p>
                                <div class="items-center space-x-2">
                                    {#each game.parent_platforms as platforms}
                                        <span class="inline-block flex-shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">{platforms.platform.name}</span>
                                    {/each}
                                </div>
                                <p class="mt-1 text-gray-900">Metacritic: {game.metacritic} </p>
                                <div class="items-center space-x-3">
                                    {#each game.tags.slice(0, 2) as tag}
                                    <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">#{tag.name}</span>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </li>
                    {/each}
                    {#if selectedItem}
                        <Modal game={selectedItem} onclose={() => handleClose()} />
                    {/if}
                </ul>
            </div>
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


