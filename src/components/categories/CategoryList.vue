<script setup>
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import Pagination from '../ui/Pagination.vue';
import { Trash2, UserRoundPen } from 'lucide-vue-next';
import PageHeading from '../ui/PageHeading.vue';

const categories = ref([]);

const fetchCategories = (url = '/categories') => {
  if (!url) return;

  api.get(url)
    .then((result) => {
      console.log(result.data.categories.links);
      categories.value = result.data.categories;
    })
    .catch((err) => {
      console.log(err);
    });
};

// console.log(categories.links)

onMounted(() => {
	fetchCategories();
});

</script>

<template>
	<PageHeading
		title="Category Lists"
		subTitle="Manage your users Role Lists"
		btnText="Category"
		to="/categories/create"
	/>
	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="min-w-full bg-white border border-gray-200 text-sm text-left">
			<thead class="bg-primary text-white uppercase">
				<tr class="text-center">
					<th class="px-6 py-4">SL.</th>
					<th class="px-6 py-4">Category Name</th>
					<th class="px-6 py-4">Is Raw Materials</th>
					<th class="px-6 py-4">Action</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="!categories.data || categories.data.length === 0">
					<tr
						v-for="n in 5"
						:key="n"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
					>
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
					</tr>
				</template>

				<template v-else>
					<tr
						v-for="category in categories.data"
						:key="category?.id"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition text-center"
					>
						<td class="px-6 py-4 border border-gray-200">{{ category?.id }}</td>
						<td class="px-6 py-4 border border-gray-200 fborder border-gray-200ont-medium">{{ category?.name }}</td>
						<td class="px-6 py-4 border border-gray-200 font-medium">{{ category?.is_raw_material }}</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center justify-center gap-3">
								<button
									@click="editRole(role)"
									class="p-2 rounded-md bg-gray-100 hover:bg-bg transition cursor-pointer text-center"
									title="Edit"
								>
									<UserRoundPen class="text-gray-600 w-4 h-4" />
								</button>
								<button
									@click="deleteItem(role?.id)"
									class="p-2 rounded-md bg-red-100 hover:bg-red-200 transition cursor-pointer text-center"
									title="Delete"
								>
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
		</table>
	</div>
	<!-- pagination -->
	<Pagination
		:items="categories"
		:fetchData="fetchCategories"
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