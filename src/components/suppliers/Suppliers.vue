

<script setup>
import { UserRoundPen } from 'lucide-vue-next';
import PageHeading from '../ui/PageHeading.vue';
import SearchModule from '../ui/SearchModule.vue';
import { useSupplerStore } from '@/store/SupplierStore';
import { onMounted } from 'vue';

    const supplierStore = useSupplerStore()
    onMounted(async()=>{
        await supplierStore.fetchSupplier('/suppliers')
    })
</script>


<template>
	<SearchModule v-model="search" @input="supplierStore.fetchSupplier" />
	<PageHeading title="User Lists" subTitle="Manage your users User Lists" btnText="Category" to="/users/create" />

	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="min-w-full bg-white border border-gray-200 text-sm text-left">
			<thead class="bg-primary text-white uppercase">
				<tr class="text-center">
					<th class="px-6 py-4">SL.</th>
					<th class="px-6 py-4">Image</th>
					<th class="px-6 py-4">Suppliers Name</th>
					<th class="px-6 py-4">Email</th>
					<th class="px-6 py-4">Contact</th>
					<th class="px-6 py-4">Bank Acount No.</th>
					<th class="px-6 py-4">Action</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="!supplierStore.fetchSupplier.data || supplierStore.fetchSupplier.data.length === 0">
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
					<tr v-for="supplier in supplierStore.fetchSupplier.data" :key="supplier?.id"

						class="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition text-center" v-if="supplierStore.loading===true"
                        >
						<td class="px-6 py-4 border border-gray-200">{{ supplier.id }}</td>
						<td class="px-6 py-4 border border-gray-200">{{ supplier.first_name }}{{ supplier.last_name  }}</td>
						<!-- <td class="px-6 py-4 border border-gray-200 text-center"><img :src="`${imgUrl}/users/${user.image}`" alt="User"
							class="w-10 h-10 rounded-full object-cover mx-auto" /> </td> -->
						<td class="px-6 py-4 border border-gray-200 fborder border-gray-200ont-medium">
							
						</td>
						<!-- <td class="px-6 py-4 border border-gray-200 font-medium ">{{ category?.is_raw_material }}</td> -->
						<td class="px-6 py-4 border border-gray-200">
							
						</td>
						<td class="px-6 py-4 border border-gray-200">
						
						</td>

						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center justify-center gap-3">

								<button
									class="p-2 rounded-md bg-gray-100 hover:bg-bg transition cursor-pointer text-center">
									<RouterLink :to="`/users/edit/${category.id}`">
										<UserRoundPen class="text-gray-600 w-4 h-4" />
									</RouterLink>
								</button>
								<button @click="handleDeleta(category?.id)"
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
	<Pagination :items="users" :fetchData="fetchUsers" />
</template>
<style lang="scss" scoped>

</style>