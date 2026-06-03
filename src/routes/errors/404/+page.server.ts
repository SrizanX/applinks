import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	error(404, 'This product does not exist — intentional 404 for deep link testing');
};
