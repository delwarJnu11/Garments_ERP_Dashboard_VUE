// store/ProductStore.js
import { api } from '@/api';
import Category from '@/pages/Category.vue';
import { defineStore } from 'pinia';
// import api from '@/axios'; // assuming you're using axios instance

export const useProductStore = defineStore('product', {
	state: () => ({
		products: [],
		search: null,
		error: null,
		loading: false,
		product: null,
		productTypes:[],
		sizes:[],
		uoms:[],
	}),

	actions: {
		async fetchProducts(url = '/products') {
			this.loading = true;
			try {
				const response = await api.get(url, { params: { search: this.search } });
				this.products = response.data.products;
				// console.log("Response data:", response.data.products);
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async fetchProductType(url = '/productTypes') {
			this.loading = true;
			try {
				const response = await api.get(url);
				this.productTypes = response.data.productTypes;
				
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async fetchSize(){
			this.loading = true;
			try {
				const res= await api.get('/sizes')
				this.sizes=res.data.sizes
				// console.log("Response data:",res.data)
			} catch (error) {
				
			}finally{
				this.loading= false
			}
		},
		async fetchUom(){
			this.loading = true
			try {
			const res =	await api.get("/uoms")
				this.uoms = res.data.uoms
				// console.log("Response data:",res.data)
			} catch (error) {
				
			}finally{
				this.loading= false
			}
				
		},
	// for create handle submit
	
	},
		

	// // store/ProductStore.js
	// async createProduct(data) {
	// 	try {
	// 		const res = await api.post('/products', data);
	// 		this.product = res.data;
	// 	} catch (error) {
	// 		console.log('create error', error);
	// 		this.error = error;
	// 		throw error;
	// 	}
	// }

});

