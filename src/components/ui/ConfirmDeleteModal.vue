<script setup></script>

<template>
	<transition name="slide-fade">
		<div
			class="fixed inset-0 bg-black/60 flex justify-center items-center"
			@click.self="closeModal"
		>
			<!-- Modal box -->
			<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
				<h2 class="text-lg font-bold mb-4">Are you sure want to delete?</h2>

				<!-- Buttons -->
				<div class="mt-4 flex justify-end gap-2">
					<button
						@click="closeModal"
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
					@click="closeModal"
					class="absolute top-3 right-2 text-xl text-red-500 hover:text-red-700 cursor-pointer hover:bg-gray-300 p-2 rounded-full"
				>
					<X />
				</button>
			</div>
		</div>
	</transition>
</template>

<style scoped></style>
