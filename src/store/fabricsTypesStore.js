import { api } from '@/api';
import { defineStore } from 'pinia';

export const useFabricsTypeStore = defineStore('fabricsTypes', {
	state: () => ({
		loading: false,
		error: null,
		fabricsTypes: [],
	}),
	getters: {},
	actions: {
		async fetchFabrics() {
			this.loading = true;
			try {
				const res = await api.get('/fabrics/types');
				if (res.status === 200) {
					this.fabricsTypes = res.data.fabrics;
				} else {
					this.error = res.data.message;
				}
			} catch (error) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
	},
});
