<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-xl">Events</h1>
{#await data.events then events}
	{#each events as event}
		<div>
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
		</div>
	{/each}
{/await}
<a class="btn" href="/newevent" role="button">Add Event</a>
