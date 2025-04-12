// import { defineStore } from 'pinia'
// import { api } from '@/api'

// export const useProductStore = defineStore('products', {
// 	state: () => ({
// 		loading: false,
// 		error: null,
// 		search: '',
// 		products: []
// 	}),
// 	actions: {
// 		async fetchProducts(url = '/products') {
// 			this.loading = true;
// 			this.error = null;
// 			if (typeof url !== 'string') {
// 				url = '/products';
// 			}
// 			try {
// 				const res = await api.get(url, {
// 					params: {
// 						search: this.search
// 					}
// 				});
// 				if (res.data.success) {
// 					this.products = res.data.products;
// 				}
// 			} catch (error) {
// 				this.error = error.message || 'Something went wrong';
// 			} finally {
// 				this.loading = false;
// 			}
// 		}
// 	}
// })


// store/ProductStore.js
import { defineStore } from 'pinia';
import api from '@/axios'; // assuming you're using axios instance

export const useProductStore = defineStore('product', {
	state: () => ({
		products: { data: [] },
		error: null,
		loading: false,
	}),

	actions: {
		async fetchProducts() {
			this.loading = true;
			try {
				const response = await api.get('/products');
				this.products = response.data.products; // Make sure your backend returns `products`
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		}
	}
});

