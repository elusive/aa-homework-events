<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-1 max-w-md m-8">
	{#if data.event}
		<h2 class="text-lg font-bold">{data.event.id}: {data.event.title}</h2>
		<p>{data.event.description}</p>
		<p>{data.event.date}</p>
	{/if}
</div>
<a class="btn m-4 mt-1" href="/" role="button">All Events</a>
