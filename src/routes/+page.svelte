<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-xl m-4">Events</h1>
{#await data.events}
	<p class="text-gray-500 animate-pulse m-8">Loading events…</p>
{:then events}
	{#each events as event}
		<div class="flex flex-col gap-1 max-w-md m-8">
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
		</div>
	{/each}
{:catch error}
	<p class="text-red-500">Failed to load events: {error.message}</p>
{/await}
<a class="btn m-4" href="/newevent" role="button">Add Event</a>
