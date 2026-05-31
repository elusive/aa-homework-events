<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { nowAsDatetimeLocal } from '$lib/utils/date';
	
	let { form }: { form: ActionData } = $props();
	let isSubmitting = $state(false);
</script>

<h1 class="text-xl font-bold m-4">Add New Event</h1>

<form
	method="POST"
	use:enhance={() => {
		isSubmitting = true;
		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}}
	class="flex flex-col gap-4 max-w-md m-8"
>

	{#if form?.message}
		<p class="text-red-600 text-sm font-medium">
			{form.message}
		</p>
	{/if}
	
	<label class="flex flex-col gap-1">
		<span class="font-medium">Title</span>
		<input
			name="title"
			type="text"
			value={form?.title ?? ''}
			required
			class="border rounded px-3 py-2"
			disabled={isSubmitting}
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="font-medium">Description</span>
		<textarea
			name="description"
			value={form?.description ?? ''}
			required
			class="border rounded px-3 py-2"
			rows="3"
			disabled={isSubmitting}
		></textarea>
	</label>
	<label class="flex flex-col gap-1">
		<span class="font-medium">Date</span>
		<input
			name="date"
			type="datetime-local"
			value={form?.date ?? ''}
			min={nowAsDatetimeLocal()}
			required
			class="border rounded px-3 py-2"
			disabled={isSubmitting}
		/>
	</label>
	<div class="flex flex-row gap-2">
		<button
			type="submit"
			disabled={isSubmitting}
			class="btn btn-success flex items-center justify-center gap-2 disabled:opacity-60"
		>
			{#if isSubmitting}
				<span class="loading loading-spinner loading-xs"></span>
				Submitting…
			{:else}
				Submit Event
			{/if}
		</button>
		<button
			type="button"
			disabled={isSubmitting}
			onclick={() => goto('/')}
			class="btn btn-error flex items-center justify-center gap-2 disabled:opacity-60"
		>
			Cancel
		</button>
	</div>
</form>
