import { api } from '@/api';
import { defineStore } from 'pinia';

export const useRoleStore = defineStore('roles', {
	state: () => ({
		loading: false,
		error: null,
		search: '',
		roles: [],
	}),
	getters: {},
	actions: {
		async fetchRoles(url = '/roles') {
			this.loading = true;
			this.error = null;
			if (typeof url != 'string') {
				url = '/roles';
			}
			try {
				if (url !== null) {
					const res = await api.get(url, { params: { search: this.search } });
					if (res.data.success) {
						this.roles = res.data.roles;
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
