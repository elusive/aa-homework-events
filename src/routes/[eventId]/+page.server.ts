import { fetchEventById, updateEventById, deleteEventById } from "$lib/server/remote-events";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = await fetchEventById(eventId);
    return {
        event
    }
}

export const actions: Actions = {
    update: async ({ request, params }) => {
        const eventId = parseInt(params.eventId);
        const posted = await request.formData();
        const title = posted.get('title')?.toString();
        const description = posted.get('description')?.toString();
        const date = posted.get('date')?.toString();
        if (!title || !date) {
            error(400, 'Title and Date are required to update an event');
        }

        const updates = {
            title,
            description,
            date
        } as Partial<Omit<Event, 'id'>>;
        const updated = await updateEventById(eventId, updates);
        if (updated == null) {
            error(404, 'Event Id not found');
        }
        
        redirect(303, `/${eventId}`);
    },

    delete: async ({ params }) =>{
        const eventId = parseInt(params.eventId);
        const wasDeleted = await deleteEventById(eventId);
        if (!wasDeleted) {
            error(404, 'Event Id not found');
        }

        redirect(303, '/');
    }
}
