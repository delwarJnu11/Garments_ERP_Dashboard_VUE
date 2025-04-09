<script setup>
import { api } from '@/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '../ui/Pagination.vue';
import { Trash2, UserRoundPen } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

const categories = ref([]);

const fetchCategories = () => {
	//   api.get('/categories')
	axios.get('http://localhost/LARAVEL/garment-manufacturing-erp/public/vue/categories')
		.then((result) => {
			// console.log(result.data.categories);
			categories.value = result.data.categories;
		})
		.catch((err) => {
			console.log(err);
		});
};



onMounted(() => {
	fetchCategories();
});

</script>

<template>
	<div class="flex justify-between items-center mb-8">
		<div>
			<h2>Role Lists</h2>
			<p>Manage your users Role Lists</p>
		</div>
		<RouterLink to="/categories/create"
			class="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
			Create Role
		</RouterLink>
	</div>
	<div>
		<table class="container relative mx-auto ">
			<!-- <thead class="bg-lemon-500">
				<th class="border  border-gray-300 px-6  py-4">Sl</th>
				<th class="border border-gray-300 px-6 py-4">Name</th>
				<th class="border border-gray-300 px-6 py-4">is Raw Material</th>
				<th class="border border-gray-300 px-6 py-4">Action</th>
			</thead> -->
			<tbody class="text-sm text-gray-700 divide-y divide-gray-100">
				<!-- <template v-if="!categories.data || categories.data.length === 0" >
					<tr v-for="n in 5" :key="n" class="odd:bg-white  even:bg-gray-50 hover:bg-gray-100 transition">
						<td class="px-6 py-4">
							<div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4">
							<div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
					</tr>
				</template> -->

				<!-- <template v-else> -->
				<div>
					<!-- Debug: show all data -->
					<!-- <pre>{{ categories }}</pre> -->

					<!-- Your table for categories -->
					<table class="min-w-full">
						<thead class="bg-lemon-500">
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="category in categories.data" :key="category.id"
								class="odd:bg-white border even:bg-gray-50 hover:bg-gray-100 transition">
								<td class="border border-gray-300 px-6 py-4">{{ category.id }}</td>
								<td class="border border-gray-300 px-6 py-4 font-medium">
									{{ category.name }}
								</td>
								<td class="border border-gray-300 px-6 py-4">
							<div class="flex items-center gap-3">
								<button 
									class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
									title="Edit">
									<UserRoundPen class="text-gray-600 w-4 h-4" />
								</button>
								<button 
									class="p-2 rounded-md bg-red-100 hover:bg-red-200 transition cursor-pointer"
									title="Delete">
									<Trash2 class="text-red-600 w-4 h-4" />
								</button>
							</div>
						</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- </template> -->

			</tbody>
			<Modal />
		</table>
	</div>
	<!-- pagination -->
	<Pagination
	:items="categories" :fetchData="fetchCategories"
	 />
</template>



<style scoped>
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>