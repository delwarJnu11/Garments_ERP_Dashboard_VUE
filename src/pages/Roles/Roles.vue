<script setup>
import { api } from '@/api';
import { Trash2, UserRoundPen } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const roles = ref([]);
const search = ref('');

// Fetch Roles
const fetchRoles = async (url) => {
	if (typeof url != 'string') {
		url = '/roles';
	}
	try {
		if (url !== null) {
			const res = await api.get(url, { params: { search: search.value } });
			console.log(res.data.roles);
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
		<table class="container mx-auto bg-white rounded-xl shadow-sm">
			<thead>
				<tr
					class="text-left bg-gray-50 text-sm text-gray-600 uppercase tracking-wider"
				>
					<th class="px-6 py-3">SL.</th>
					<th class="px-6 py-3">Name</th>
					<th class="px-6 py-3">Actions</th>
				</tr>
			</thead>

			<!-- Check if data is loaded or not -->
			<tbody class="text-sm text-gray-700 divide-y divide-gray-100">
				<template v-if="!roles.data || roles.data.length === 0">
					<!-- Skeleton loader rows -->
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

				<!-- Table rows after data is loaded -->
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
		</table>
	</div>
	<!-- pagination -->
	<div
		class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
	>
		<div class="flex flex-1 justify-between sm:hidden">
			<a
				href="#"
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>Previous</a
			>
			<a
				href="#"
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>Next</a
			>
		</div>
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-gray-700">
					Showing
					{{ ' ' }}
					<span class="font-medium">{{
						roles.current_page === 1
							? 1
							: roles.per_page * (roles?.current_page - 1) + 1
					}}</span>
					{{ ' ' }}
					to
					{{ ' ' }}
					<span class="font-medium">{{
						roles.total <= roles?.per_page * roles?.current_page
							? roles.total
							: roles?.per_page * roles?.current_page
					}}</span>
					{{ ' ' }}
					of
					{{ ' ' }}
					<span class="font-medium">{{ roles?.total }}</span>
					{{ ' ' }}
					results
				</p>
			</div>
			<div>
				<nav
					class="isolate inline-flex -space-x-px rounded-md shadow-xs"
					aria-label="Pagination"
				>
					<a
						v-for="link in roles.links"
						:key="link.label"
						@click.prevent="fetchRoles(link.url)"
						:class="[
							'relative hidden items-center px-4 py-2 text-sm font-semibold focus:z-20 md:inline-flex cursor-pointer',
							link.active
								? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
							roles.last_page === roles.current_page &&
							fixedPrevNext(link.label) === 'Next'
								? 'opacity-50'
								: '',
						]"
					>
						{{ fixedPrevNext(link.label) }}
					</a>
				</nav>
			</div>
		</div>
	</div>
</template>

<style scoped>
table {
	width: 100%;
}
</style>
