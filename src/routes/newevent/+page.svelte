<script lang="ts">
	import { enhance } from '$app/forms';

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
	<!-- form for creating new event -->
	<label class="flex flex-col gap-1">
		<span class="font-medium">Title</span>
		<input
			name="title"
			type="text"
			required
			class="border rounded px-3 py-2"
			disabled={isSubmitting}
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="font-medium">Description</span>
		<textarea
			name="description"
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
			required
			class="border rounded px-3 py-2"
			disabled={isSubmitting}
		/>
	</label>
	<button
		type="submit"
		disabled={isSubmitting}
		class="btn flex items-center justify-center gap-2 disabled:opacity-60"
	>
		{#if isSubmitting}
			<svg
				class="animate-spin h-4 w-4"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
			</svg>
			Submitting…
		{:else}
			Submit Event
		{/if}
	</button>
</form>
