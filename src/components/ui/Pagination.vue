<script setup>
import { ref, watch } from 'vue';
import { fixedPrevNext } from './../../utils/fixedPrevNext';

const props = defineProps(['items', 'fetchData']);
const items = ref({ ...props.items });
watch(
	() => props.items,
	(newVal) => {
		items.value = { ...newVal };
	}
);
</script>

<template>
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
						items.current_page === 1
							? 1
							: items.per_page * (items?.current_page - 1) + 1
					}}</span>
					{{ ' ' }}
					to
					{{ ' ' }}
					<span class="font-medium">{{
						items.total <= items?.per_page * items?.current_page
							? items.total
							: items?.per_page * items?.current_page
					}}</span>
					{{ ' ' }}
					of
					{{ ' ' }}
					<span class="font-medium">{{ items?.total }}</span>
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
						v-for="link in items.links"
						:key="link.label"
						@click.prevent="fetchData(link.url)"
						:class="[
							'relative hidden items-center px-4 py-2 text-sm font-semibold focus:z-20 md:inline-flex cursor-pointer',
							link.active
								? 'z-10 bg-primary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
								: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
							items.last_page === items.current_page &&
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

<style scoped></style>
