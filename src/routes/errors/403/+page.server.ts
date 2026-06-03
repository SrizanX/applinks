import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	error(403, 'You must be logged in to view this order — intentional 403 for deep link testing');
};
