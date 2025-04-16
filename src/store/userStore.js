import { api } from '@/api';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
	state: () => ({
		loading: false,
		error: null,
		users: [],
		supervisors: [],
	}),
	getters: {},
	actions: {
		async getSupervisors() {
			this.loading = true;
			try {
				const res = await api.get('/supervisors');
				this.supervisors = res.data.superviosors;
			} catch (error) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
	},
});
