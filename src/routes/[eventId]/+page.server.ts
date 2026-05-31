import { fetchEventById, updateEventById, deleteEventById } from "$lib/server/remote-events";
import { error, fail, redirect } from "@sveltejs/kit";
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

        // check required vals
        if (!title || !date) {
            return fail(400, {
                message: 'Title and Date are required to update an event.',
                title,
                description,
                date
            });
        }

        // check date is not in past
        if (new Date(date) < new Date()) {
            return fail(400, {
                message: 'Event date cannot be in the past.',
                title,
                description,
                date
            });
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
