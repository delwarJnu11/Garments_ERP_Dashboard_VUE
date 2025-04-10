<script setup>
import { X } from 'lucide-vue-next';

const props = defineProps(['closeModal', 'id']);
const emit = defineEmits(['confirmDelete']);

const submit = () => {
	emit('confirmDelete', props.id);
};
</script>

<template>
	<transition name="slide-fade">
		<div
			class="fixed z-50 inset-0 bg-black/60 flex justify-center items-center"
			@click.self="props?.closeModal"
		>
			<!-- Modal box -->
			<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
				<h2 class="text-2xl font-bold mb-4">Confirm Delete</h2>
				<p class="text-sm font-medium mb-4 text-gray-500">
					Do you really want to delete this record? You can not revert this
					back!
				</p>
				<!-- Buttons -->
				<div class="mt-4 flex justify-end gap-2">
					<button
						@click="props?.closeModal"
						class="px-4 py-2 bg-red-500 rounded hover:bg-red-700 text-white cursor-pointer"
					>
						Cancel
					</button>
					<button
						@click="submit"
						class="px-4 py-2 bg-primary text-white rounded hover:bg-secondary cursor-pointer"
					>
						Confirm Delete
					</button>
				</div>

				<!-- Top right close (×) -->
				<button
					@click="props?.closeModal"
					class="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700 cursor-pointer hover:bg-gray-300 p-2 rounded-full"
				>
					<X />
				</button>
			</div>
		</div>
	</transition>
</template>

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
