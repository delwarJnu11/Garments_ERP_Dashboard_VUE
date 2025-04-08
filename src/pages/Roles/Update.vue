<script setup>
import { api } from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const name = ref('');

const findRole = async (id) => {
	const role = await api.get(`/roles?id=${id}`);
};

const handleSubmit = async () => {
	try {
		const res = await api.put('/roles', {
			name: name.value,
		});

		if (res.data.status === 201) {
			toast.success(res.data.message);
			router.push('/roles');
		}
	} catch (error) {
		console.error(error);
		toast.error(error.response?.data?.message);
	}
};
</script>

<template>
	<div
		class="container mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
	>
		<h2 class="text-2xl font-semibold mb-4 text-gray-700">Enter Your Name</h2>
		<form @submit.prevent="handleSubmit">
			<div class="mb-4">
				<label
					for="name"
					class="block text-sm font-medium text-gray-700"
					>Role Name</label
				>
				<input
					id="name"
					type="text"
					v-model="name"
					required
					class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Role name"
				/>
			</div>
			<button
				type="submit"
				class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Submit
			</button>
		</form>
	</div>
</template>

<style scoped></style>
