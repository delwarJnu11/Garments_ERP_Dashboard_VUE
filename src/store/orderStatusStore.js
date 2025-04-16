import { api } from '@/api';
import { defineStore } from 'pinia';

export const useOrderStatusStore = defineStore('oderStatus', {
	state: () => ({
		loading: false,
		error: null,
		orders: [],
		allStatus: [],
	}),
	getters: {},
	actions: {
		async fetchAllStatus() {
			this.loading = true;
			try {
				const res = await api.get('/orders/status');
				if (res.status === 200) {
					this.allStatus = res.data.statuses;
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
