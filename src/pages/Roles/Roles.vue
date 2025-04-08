<script setup>
import { api } from '@/api';
import Modal from '@/components/ui/Modal.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { Trash2, UserRoundPen } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const roles = ref([]);
const search = ref('');
const isOpen = ref(false);
const roleToEdit = ref({
	id: null,
	name: '',
});

// Edit Role
const editRole = (role) => {
	roleToEdit.value = { ...role };
	isOpen.value = true;
};

// Modal Close
const closeModal = () => {
	isOpen.value = false;
};

//Updat Role
const updateRole = () => {
	console.log('Updating role:', roleToEdit.value);
	closeModal();
};

// Fetch Roles
const fetchRoles = async (url) => {
	if (typeof url != 'string') {
		url = '/roles';
	}
	try {
		if (url !== null) {
			const res = await api.get(url, { params: { search: search.value } });
			// console.log(res.data.roles);
			roles.value = res.data.roles;
		}
	} catch (error) {
		console.error('Error fetching roles:', error);
	}
};

// Fixed Prev and Next Button
const fixedPrevNext = (label) => {
	if (label === '&laquo; Previous') return 'Prev';
	if (label === 'Next &raquo;') return 'Next';

	return label;
};

onMounted(() => {
	fetchRoles();
});
</script>

<template>
	<div class="flex justify-between items-center mb-8">
		<div>
			<h2>Role Lists</h2>
			<p>Manage your users Role Lists</p>
		</div>
		<RouterLink
			to="/roles/create"
			class="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
		>
			Create Role
		</RouterLink>
	</div>
	<div>
		<table class="container mx-auto">
			<tbody class="text-sm text-gray-700 divide-y divide-gray-100">
				<template v-if="!roles.data || roles.data.length === 0">
					<tr
						v-for="n in 5"
						:key="n"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
					>
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
					</tr>
				</template>

				<template v-else>
					<tr
						v-for="role in roles.data"
						:key="role?.id"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
					>
						<td class="px-6 py-4">{{ role?.id }}</td>
						<td class="px-6 py-4 font-medium">{{ role?.name }}</td>
						<td class="px-6 py-4">
							<div class="flex items-center gap-3">
								<button
									@click="editRole(role)"
									class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
									title="Edit"
								>
									<UserRoundPen class="text-gray-600 w-4 h-4" />
								</button>
								<button
									@click="deleteItem(role?.id)"
									class="p-2 rounded-md bg-red-100 hover:bg-red-200 transition cursor-pointer"
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
		</table>
	</div>
	<!-- pagination -->
	<Pagination
		:items="roles"
		:fixedPrevNext="fixedPrevNext"
		:fetchData="fetchRoles"
	/>
</template>
