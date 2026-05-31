import { error, fail, redirect } from "@sveltejs/kit";
import { createEvent } from "$lib/server/remote-events";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({request}) => {
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();

        // check for empty values
        if (!title || !date) {
            return fail(400, {
                message: 'Title and Date are required',
                title,
                description,
                date
            });
        }

        // check for date in the past
        if (new Date(date) < new Date()) {
            return fail(400, {
                message: 'Event date cannot be in the past.',
                title,
                description,
                date });
        }
        const newEvent = await createEvent({title, description, date});
        redirect(303, `/${newEvent.id}`);
    }
}
