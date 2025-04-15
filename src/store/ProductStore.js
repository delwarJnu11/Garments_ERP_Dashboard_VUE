

// store/ProductStore.js
import { api } from '@/api';
import { Search } from 'lucide-vue-next';
import { defineStore } from 'pinia';
// import api from '@/axios'; // assuming you're using axios instance

export const useProductStore = defineStore('product', {
	state: () => ({
		products: [],
		search: null,
		error: null,
		loading: false,
		product: null
	}),

	actions: {
		async fetchProducts(url = '/products') {
			this.loading = true;
			try {
				const response = await api.get(url, { params: { search: this.search } });
				this.products = response.data.products.data;
				console.log("Response data:", response.data);
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		}
	},

	// store/ProductStore.js
	async createProduct(data) {
		try {
			const res = await api.post('/products', data);
			this.product = res.data;
		} catch (error) {
			console.log('create error', error);
			this.error = error;
			throw error;
		}
	}

});

