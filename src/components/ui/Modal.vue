<template>
	<!-- Backdrop -->
	<Transition name="slide-fade">
		<div
			class="fixed inset-0 bg-black/60 flex justify-center items-center"
			@click.self="closeModal"
		>
			<!-- Modal box -->
			<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
				<h2 class="text-lg font-bold mb-4">Edit Role</h2>

				<!-- Input field -->
				<input
					v-model="localRole.name"
					type="text"
					class="w-full border rounded px-3 py-2"
					placeholder="Role name"
				/>

				<!-- Buttons -->
				<div class="mt-4 flex justify-end gap-2">
					<button
						@click="closeModal"
						class="px-4 py-2 bg-red-500 rounded hover:bg-red-700 text-white cursor-pointer"
					>
						Close
					</button>
					<button
						@click="submit"
						class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
					>
						Update
					</button>
				</div>

				<!-- Top right close (×) -->
				<button
					@click="closeModal"
					class="absolute top-3 right-2 text-xl text-red-500 hover:text-red-700 cursor-pointer hover:bg-gray-300 p-2 rounded-full"
				>
					<X />
				</button>
			</div>
		</div>
	</Transition>
</template>

<script setup>
// Receive props
const props = defineProps(['role', 'closeModal', 'updateRole', 'isOpen']);

import { X } from 'lucide-vue-next';

// Local role data to edit
import { ref, watch } from 'vue';
const localRole = ref({ ...props.role });
const showModal = ref(props.isOpen);

// Watch for changes in prop and update localRole
watch(
	() => props.role,
	(newVal) => {
		localRole.value = { ...newVal };
	}
);

// Submit updated data to parent
const submit = () => {
	props.updateRole(localRole.value);
};
</script>

<style scoped>
.slide-fade-enter-active {
	transition: all 1s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(-20px);
	opacity: 0;
}
</style>
