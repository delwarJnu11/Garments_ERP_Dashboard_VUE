<script setup>
import { ChevronRight, ListOrdered } from 'lucide-vue-next';

const props = defineProps({
	activeMenu: {
		type: String,
		required: true,
	},
	toggleMenu: {
		type: Function,
		required: true,
	},
});
</script>

<template>
	<li>
		<button
			@click="props.toggleMenu('orders')"
			class="flex items-center justify-between w-full p-3 hover:text-gray-700 hover:bg-gray-100 text-base transition-all duration-300"
		>
			<div class="flex items-center gap-2">
				<ListOrdered
					class="w-5 h-5"
					:color="'currentColor'"
				/>
				<span>Orders & Buyers</span>
			</div>
			<ChevronRight
				:color="'currentColor'"
				:class="{
					'rotate-90 transition-transform': props.activeMenu === 'orders',
					'transition-transform': props.activeMenu !== 'orders',
				}"
				class="w-4 h-4"
			/>
		</button>

		<transition name="slide">
			<ul
				v-if="props.activeMenu === 'orders'"
				class="bg-white p-2 shadow-md"
			>
				<li>
					<RouterLink
						to="/order/create"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Create Order
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/orders/pending"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Pending Orders
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/orders/completed"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Completed Orders
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/orders/buyers"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Buyer List
					</RouterLink>
				</li>
			</ul>
		</transition>
	</li>
</template>

<style scoped>
/* Smooth Slide Animation */
.slide-enter-active,
.slide-leave-active {
	transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
	max-height: 500px;
	opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
	max-height: 0;
	opacity: 0;
	overflow: hidden;
}
</style>
