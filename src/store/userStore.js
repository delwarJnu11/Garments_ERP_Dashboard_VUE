import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
	state: () => ({
		loading: false,
		error: null,
		users: [],
	}),
});
