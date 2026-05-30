import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// return a promise so no awaiting for data to resolve
	return { events: fetchAllEvents() };
};
