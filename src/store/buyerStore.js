import { api } from '@/api';
import { defineStore } from 'pinia';

export const useBuyerStore = defineStore('buyers', {
	state: () => ({
		loading: false,
		error: null,
		search: '',
		buyers: [],
	}),
	getters: {},
	actions: {
		async fetchAllBuyers() {
			this.loading = true;
			this.error = null;
			try {
				const res = await api.get('/buyers');
				if (res.status === 200) {
					this.buyers = res?.data?.buyers;
				}
			} catch (error) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
		async fetchBuyers(url = '/buyers') {
			this.loading = true;
			this.error = null;
			if (typeof url != 'string') {
				url = '/buyers';
			}
			try {
				if (url !== null) {
					const res = await api.get(url, { params: { search: this.search } });
					if (res.status === 200) {
						this.buyers = res.data.buyers;
					}
				}
			} catch (error) {
				this.error = error.message || 'Something went wrong! ';
			} finally {
				this.loading = false;
			}
		},
	},
});
