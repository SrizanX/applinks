import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	error(500, 'Database connection failed — intentional 500 for deep link testing');
};
