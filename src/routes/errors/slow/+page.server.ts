import type { PageServerLoad } from './$types';

// Simulates a slow server response (e.g. heavy DB query, third-party API).
// Tests whether your Android app shows a loading state and handles long waits.
export const load: PageServerLoad = async () => {
	const start = Date.now();
	await new Promise((resolve) => setTimeout(resolve, 4000));
	return { elapsed: Date.now() - start };
};
