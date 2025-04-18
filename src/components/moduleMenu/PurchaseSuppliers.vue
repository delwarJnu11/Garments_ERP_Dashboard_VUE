

<script  setup>
import { ChevronRight, ListOrdered } from 'lucide-vue-next';
const props = defineProps({
    activeMenu:{
        type:String,
        required:true,
    },

    toggleMenu:{
        type:Function,
        required:true
    },
})

</script>

<template>
	<li>
		<button
			@click="props.toggleMenu('purchase')"
			class="flex items-center justify-between w-full p-3 hover:text-gray-700 hover:bg-gray-200 text-base transition-all duration-300"
		>
			<div class="flex items-center gap-2">
				<ListOrdered
					class="w-5 h-5"
					:color="'currentColor'"
				/>
				<span>Purchase & Suppliers</span>
			</div>
			<ChevronRight
				:color="'currentColor'"
				:class="{
					'rotate-90 transition-transform': props.activeMenu === 'purchase',
					'transition-transform': props.activeMenu !== 'purchase',
				}"
				class="w-4 h-4"
			/>
		</button>

		<transition name="slide">
			<ul
				v-if="props.activeMenu === 'purchase'"
				class="bg-white p-2 shadow-md"
			>
				<li>
					<RouterLink
						to="/suppliers"
						class="block p-2 rounded-md text-black hover:bg-purple-300 transition-all duration-300"
					>
						Suppliers
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/purchaseInvoice" class="block p-2 text-black hover:bg-purple-300 transition-all duration-300 ">
					Purchase Invoice
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/createInvoice" class="block p-2 text-black hover:bg-purple-300 transition-all duration-300 ">
					Create Purchase Invoice
					</RouterLink>
				</li>
				<!-- <li>
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
				</li> -->
			</ul>
		</transition>
	</li>
</template>


<style scoped>
    .slide-enter-active,
    .slide-enter-active{
        transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
        max-height: 500px;
        opacity: 1;
    }

    .slide-enter-form,
    .slide-leave-to{
        max-height: 0;
        opacity: 0;
        overflow: hidden;
    }

</style>