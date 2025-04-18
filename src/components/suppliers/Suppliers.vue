<script setup>
import { UserRoundPen } from 'lucide-vue-next';
import PageHeading from '../ui/PageHeading.vue';
import SearchModule from '../ui/SearchModule.vue';
import { useSupplerStore } from '@/store/SupplierStore';
import { onMounted, ref } from 'vue';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal.vue';

const imgURL = import.meta.env.VITE_IMG_BASE_URL
const supplierStore = useSupplerStore()
const userToDelete = ref(false)
const isConfirmDelete = ref(false)


console.log(supplierStore)
onMounted(async () => {
	await supplierStore.fetchSupplier('/suppliers')
	console.log("Image Path Test:", `${imgURL}/suppliers/${supplierStore.suppliers.data?.[0]?.photo}`)
})

const handleDelete=()=>{

}
</script>
<template>
	<SearchModule v-model="search" @input="supplierStore.fetchSupplier" />
	<PageHeading title="Supplier Lists" subTitle="Manage your suppliers" btnText="Suppliers" to="/suppliers/create" />
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
				<template v-if="supplierStore.loading">
					<!-- Loading Skeletons -->
					<tr v-for="n in 5" :key="n" class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
						<!-- Your loading skeleton code here -->
					</tr>
				</template>
				<template v-else>
					<tr v-for="supplier in supplierStore.suppliers.data" :key="supplier.id"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition text-center">
						<td class="px-6 py-4 border border-gray-200">{{ supplier.id }}</td>
						<td class="px-6 py-4 border border-gray-200">
							<img :src="`${imgURL}/suppliers/${supplier.photo}`" alt="Supplier Photo"
								class="w-10 h-10 rounded-full object-cover mx-auto">
						</td>
						<td class="px-6 py-4 border border-gray-200">{{ supplier.first_name }} {{ supplier.last_name }}
						</td>
						<td class="px-6 py-4 border border-gray-200">{{ supplier.email }}</td>
						<td class="px-6 py-4 border border-gray-200">{{ supplier.phone }}</td>
						<td class="px-6 py-4 border border-gray-200">{{ supplier.bank_account.name ?? 'N/A' }}</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center justify-center gap-3">
								<RouterLink :to="`/suppliers/edit/${supplier.id}`"
									class="p-2 rounded-md bg-gray-100 hover:bg-bg transition">
									<UserRoundPen class="text-gray-600 w-4 h-4" />
								</RouterLink>
								<button @click="handleDelete(supplier.id)"
									class="p-2 rounded-md bg-red-100 hover:bg-red-200 transition" title="Delete">
									<Trash2 class="text-red-600 w-4 h-4" />
								</button>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
			<ConfirmDeleteModal
			v-if="isConfirmDelete"
			:id="userToDelete"
			:close-modal="closeModel"
			@confirmDelete="handleConfirmDelete"/>
		</table>
	</div>
	<!-- pagination -->
	<Pagination :items="users" :fetchData="fetchUsers" />
</template>
<style lang="scss" scoped></style>
