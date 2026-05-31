<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { nowAsDatetimeLocal } from '$lib/utils/date';

	let { data, form }: { data: PageData, form: ActionData } = $props();

	let isSubmitting = $state(false);
	let isEditing = $state(false);
	let showDeleteConfirmation = $state(false);
</script>

<div class="flex flex-col gap-1 max-w-md m-8">
	{#if data.event}
		{#if isEditing}
			<h2 class="text-lg font-bold">Edit Event</h2>
			{#if form?.message}
				<p class="text-red-600 text-sm font-medium">
					{form.message}
				</p>
			{/if}
			<form
				method="POST"
				action="?/update"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result, update }) => {
						await update();
						isSubmitting = false;
						isEditing = (result.type === 'failure');
						console.log(isEditing, result);
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
						value={form?.title ?? data.event.title}
						required
						class="border rounded px-3 py-2"
						disabled={isSubmitting}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span class="font-medium">Description</span>
					<textarea
						name="description"
						value={form?.description ?? data.event.description}
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
						value={form?.date ?? data.event.date}
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
					class="btn btn-sm btn-success flex items-center justify-center gap-2 disabled:opacity-60"
				>
					{#if isSubmitting}
						<span class="loading loading-spinner loading-xs"></span>
						Saving…
					{:else}
						Save Changes
					{/if}
				</button>
				<button
					type="button"
					disabled={isSubmitting}
					onclick={() => isEditing = false}
					class="btn btn-error btn-sm flex items-center justify-center gap-2 disabled:opacity-60"
				>
					Cancel
				</button>
			</form>
		{:else}
			<h2 class="text-lg font-bold">{data.event.id}: {data.event.title}</h2>
			<p>{data.event.description}</p>
			<p>{data.event.date}</p>
			<div class="flex gap-2 mt-2">
	            <button onclick={() => isEditing = true} class="btn btn-sm">Edit</button>       	            
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						isSubmitting = true;
					 	return async ({update}) => {
							await update();
							isSubmitting = false;
					 	};
					 }}>
					<div class="relative">
						<button
							type="button"
							class="absolute btn btn-sm btn-error"
							class:w-[14rem]={showDeleteConfirmation}
							disabled={isSubmitting || showDeleteConfirmation}
							onclick={() => (showDeleteConfirmation = true)}>
							Delete
						</button>
						{#if showDeleteConfirmation}
							<div class="absolute flex items-center gap-2 p-1 z-10">
								<p class="text-white text-sm mr-2">Sure?</p>
								<button type="submit" class="btn btn-xs btn-error">
									{#if isSubmitting}
										<span class="loading loading-spinner loading-xs"></span>
										Deleting…
									{:else}
										Yes, Delete
									{/if}
								</button>
								<button type="button" class="btn btn-xs btn-ghost" onclick={() => showDeleteConfirmation=false}>
									Cancel
								</button>
							</div>
						{/if}
	
					</div>
				</form>
	        </div>
		{/if}
	{/if}
</div>
<a class="btn btn-primary m-4 mt-1" href="/" role="button">All Events</a>
