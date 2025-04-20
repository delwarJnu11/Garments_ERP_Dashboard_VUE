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
		allProducts: null,
		productTypes:[],
		sizes:[],
		uoms:[],
		invoiceId:'',
		warehouses:[],
	}),
	getters:{
		rawMaterials: (state) => {
			const flatProducts = state.allProducts || [];
			const filtered = flatProducts.filter(product =>
				product.product_type?.name === 'Raw Material'
			);
			console.log("Raw Materials Filtered:", filtered);
			return filtered;
		},
	},

	actions: {
		async fetchProducts(url = '/products') {
			this.loading = true;
			try {
				const response = await api.get(url, { params: { search: this.search } });
				this.products = response.data.products;
				// console.log("Response data:", this.products);
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async fetchForInvoiceProducts(){
			this.loading = true;
			try {
				const res=await api.get('/allProducts')
				this.allProducts =res.data.products
				// console.log("All Products:", this.allProducts);
				// console.log("products:", this.rawMproductsaterials);
			} catch (error) {
				console.log(error)
			}finally{
				this.loading=false
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
				console.log(error)
			}finally{
				this.loading= false
			}
				
		},
		async fetchWarehouse(){
			this.loading = true
			try {
				const res = await api.get('/warehouses')
				this.warehouses = res.data.warehouses
				console.log("Response warehouse:",res.data.warehouses)
			} catch (error) {
				console.log(error)
			}finally{
				this.loading= false
			}
		},

		async fetchInoviceId() {
			console.log("Fetching invoice ID..."); 
			try {
			  const res = await api.get('/invoice-id');
			  console.log('Invoice API response:', res);
			  this.invoiceId = res.data.new_invoice_id; 
			} catch (error) {
			  console.error('Failed to fetch invoice ID:', error);
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

