<script setup>
import { api } from '@/api';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import Modal from '@/components/ui/Modal.vue';
import PageHeading from '@/components/ui/PageHeading.vue';
import Pagination from '@/components/ui/Pagination.vue';
import TableLoading from '@/components/ui/TableLoading.vue';
import { useRoleStore } from '@/store/RoleStore';
import { Trash2, UserRoundPen } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

// const roles = ref([]);
const search = ref('');
const isOpen = ref(false);
const isConfirmDelete = ref(false);
const roleToEdit = ref({
	id: null,
	name: '',
});
const roleToDelete = ref('');

// Edit Role
const editRole = (role) => {
	roleToEdit.value = { ...role };
	isOpen.value = true;
};

// Modal Close
const closeModal = () => {
	isOpen.value = false;
	isConfirmDelete.value = false;
};

//Updat Role
const updateRole = async (newRole) => {
	// console.log(newRole.id);
	const res = await api.put(`/roles/${newRole.id}`, {
		id: newRole.id,
		name: newRole.name,
	});

	if (res.status === 200) {
		toast.success(res.data.message);
		fetchRoles();
		closeModal();
	} else {
		toast.error(res.data.message);
	}
};

// Handle Delete
const handleDelete = (id) => {
	roleToDelete.value = id;
	isConfirmDelete.value = true;
};

// handle confirm delete
const handleConfirmDelete = async (id) => {
	const res = await api.delete(`/roles/${id}`);
	console.log(res);
	if (res.status === 200) {
		toast.success(res.data.message);
		closeModal();
		fetchRoles();
	} else {
		toast.error(res.data.message);
	}
};

const roleStore = useRoleStore();
const { error, loading, roles } = storeToRefs(roleStore);
const { fetchRoles } = roleStore;

onMounted(async () => {
	await fetchRoles();
});
</script>

<template>
	<PageHeading
		title="Role Lists"
		subTitle="Manage your users Role Lists"
		btnText="Role"
		to="/roles/create"
	/>
	<strong
		v-if="error"
		class="bg-red-400 text-dark"
		>{{ error }}</strong
	>
	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="min-w-full bg-white border border-gray-200 text-sm text-left">
			<thead class="bg-primary text-white uppercase">
				<tr class="text-center">
					<th class="px-6 py-4">SL.</th>
					<th class="px-6 py-4">Role Name</th>
					<th class="px-6 py-4">Action</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="loading">
					<TableLoading />
				</template>

				<template v-if="!loading && roles?.data?.length">
					<tr
						v-for="role in roles.data"
						:key="role?.id"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition text-center"
					>
						<td class="border border-gray-200 px-6 py-4">{{ role?.id }}</td>
						<td class="border border-gray-200 px-6 py-4 font-medium">
							{{ role?.name }}
						</td>
						<td class="border border-gray-200 px-6 py-4">
							<div class="flex items-center justify-center gap-3">
								<button
									@click="editRole(role)"
									class="p-2 rounded-md bg-gray-100 hover:bg-bg transition cursor-pointer text-center"
									title="Edit"
								>
									<UserRoundPen class="text-gray-600 w-4 h-4" />
								</button>
								<button
									@click="handleDelete(role?.id)"
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
			<Modal
				v-if="isOpen"
				:isOpen="isOpen"
				:role="roleToEdit"
				:closeModal="closeModal"
				:updateRole="updateRole"
			/>
			<ConfirmDeleteModal
				v-if="isConfirmDelete"
				:id="roleToDelete"
				:closeModal="closeModal"
				@confirmDelete="handleConfirmDelete"
			/>
		</table>
	</div>
	<!-- pagination -->
	<Pagination
		:items="roleStore.roles"
		:fetchData="fetchRoles"
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
