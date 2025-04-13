

// store/ProductStore.js
import { api } from '@/api';
import { defineStore } from 'pinia';
// import api from '@/axios'; // assuming you're using axios instance

export const useProductStore = defineStore('product', {
	state: () => ({
		products: [],
		error: null,
		loading: false,
	}),

	actions: {
		async fetchProducts() {
			this.loading = true;
			try {
				const response = await api.get('/products');
				this.products = response.data.products.data; 
				console.log("Response data:", response.data);
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		}
	}
});

