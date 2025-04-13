


<script setup>
import { useProductStore } from '@/store/ProductStore';
import { Trash2, UserRoundPen } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const productStore = useProductStore();
// const { error, loading, products } = storeToRefs(productStore);

// const {fetchProducts} =  productStore
console.log(productStore)

onMounted(async () => {
	await productStore.fetchProducts();
});
    // const fetchProducts =()=>{
    //     api.get('/products',{
	// 		params:{
	// 			search:search.value
	// 		}
	// 	})
    //     .then(res=>{
    //         console.log(res.data.products)
    //         products.value=res.data.products
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
</script>


<template>
	<SearchModule v-model="search" @input="fetchProducts" />
	<PageHeading title="User Lists" subTitle="Manage your products User Lists" btnText="Category" to="/products/create" />

	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="min-w-full bg-white border border-gray-200 text-sm text-left">
			<thead class="bg-primary text-white uppercase">
				<tr class="text-center">
					<th class="px-6 py-4">SL.</th>
					<!-- <th class="px-6 py-4">Image</th> -->
					<th class="px-6 py-4"> Name</th>
					<th class="px-6 py-4">Product Type</th>
					<th class="px-6 py-4">Category </th>
					<th class="px-6 py-4">Size </th>
					<th class="px-6 py-4">SKU </th>
					<th class="px-6 py-4">Quantity </th>
					<th class="px-6 py-4">Unit Price </th>
					<th class="px-6 py-4">Action</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="!productStore.products || productStore.products.length === 0">
					<tr v-for="n in 5" :key="n" class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
						<td class="px-6 py-4 border border-gray-200">
							<div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
					</tr>
				</template>

				<template v-else>
					<tr v-for="product in productStore.products" :key="product?.id"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition text-center" v-if= "!productStore.loading">
						
						<td class="px-6 py-4 border border-gray-200">{{ product?.id }} </td>
						<!-- <td class="px-6 py-4 border border-gray-200 text-center"><img :src="`${imgUrl}/products/${product.image}`" alt="product"
							class="w-10 h-10 rounded-full object-cover mx-auto" /> </td> -->
						<td class="px-6 py-4 border border-gray-200  border-gray-200ont-medium">
							
							{{ product?.name }}
						</td>
						<!-- <td class="px-6 py-4 border border-gray-200 font-medium ">{{ category?.is_raw_material }}</td> -->
						<td class="px-6 py-4 border border-gray-200">
							{{ product?.product_type.name }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ product?.category_type.name }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ product?.size?.name || "N/A" }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ product?.sku }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ product?.unit_price }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ product?.uom.name }}
						</td>

						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center justify-center gap-3">

								<button
									class="p-2 rounded-md bg-gray-100 hover:bg-bg transition cursor-pointer text-center">
									<RouterLink :to="`/products/edit/${product.id}`">
										<UserRoundPen class="text-gray-600 w-4 h-4" />
									</RouterLink>
								</button>
								<button @click="handleDeleta(product?.id)"
									class="p-2 rounded-md bg-red-100 hover:bg-red-200 transition cursor-pointer text-center"
									title="Delete">
									<Trash2 class="text-red-600 w-4 h-4" />
								</button>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
			<!-- <Modal
				v-if="isOpen"
				:isOpen="isOpen"
				:role="roleToEdit"
				:closeModal="closeModal"
				:updateRole="updateRole"
			/> -->
			<!-- <ConfirmDeleteModal
			v-if="isConfirmDelete"
			:id="userToDelete"
			:close-modal="closeModel"
			@confirmDelete="handleConfirmDelete"

			/> -->
		</table>
	</div>
	<!-- pagination -->
	<!-- <Pagination :items="products" :fetchData="fetchproducts" /> -->
</template>

<style  scoped>

</style>