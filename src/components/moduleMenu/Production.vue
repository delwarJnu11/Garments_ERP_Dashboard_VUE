<script setup>
import { ChevronRight, Settings } from 'lucide-vue-next';
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
			@click="props.toggleMenu('production')"
			class="flex items-center justify-between w-full p-3 hover:text-gray-700 hover:bg-gray-100 text-base transition-all duration-300"
		>
			<div class="flex items-center gap-2">
				<Settings
					class="w-5 h-5"
					:color="'currentColor'"
				/>
				<span>Production Management</span>
			</div>
			<ChevronRight
				:color="'currentColor'"
				:class="{
					'rotate-90 transition-transform': props.activeMenu === 'production',
					'transition-transform': props.activeMenu !== 'production',
				}"
				class="w-4 h-4"
			/>
		</button>

		<transition name="slide">
			<ul
				v-if="props.activeMenu === 'production'"
				class="bg-white p-2 shadow-md"
			>
				<li>
					<RouterLink
						to="/production/orders"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Orders
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/production/inventory"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Inventory
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/production/staff"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Staff Management
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/production/costing"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Costing
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/production/reports"
						class="block p-2 rounded-md text-black hover:bg-gray-200 transition-all duration-300"
					>
						Reports
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
