<script setup>
import { ChevronRight, HandCoins } from 'lucide-vue-next';

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
			@click="props.toggleMenu('accounts')"
			class="flex items-center justify-between w-full p-3 hover:text-gray-700 hover:bg-gray-100 text-base transition-all duration-300"
		>
			<div class="flex items-center gap-2">
				<HandCoins
					class="w-5 h-5"
					:color="'currentColor'"
				/>
				<span>Accounts</span>
			</div>
			<ChevronRight
				:color="'currentColor'"
				:class="{
					'rotate-90 transition-transform': props.activeMenu === 'accounts',
					'transition-transform': props.activeMenu !== 'accounts',
				}"
				class="w-4 h-4"
			/>
		</button>

		<transition name="slide">
			<ul v-if="props.activeMenu === 'accounts'" class="bg-white p-2 shadow-md">
				
				<li><RouterLink to="/accounts/transactions" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Transactions</RouterLink></li>
				<hr class="text-yellow-600"/>
				<li><RouterLink to="/accounts/accounts" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Accounts</RouterLink></li>
				<li><RouterLink to="/accounts/accountGroups" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Account Group</RouterLink></li>
				
				<hr class="text-yellow-600"/>
				<li><RouterLink to="/accounts/ledger" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Ledger</RouterLink></li>
				<li><RouterLink to="/accounts/journals" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Journals</RouterLink></li>
				<li><RouterLink to="/accounts/balanceSheet" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Balance Sheet</RouterLink></li>
				<li><RouterLink to="/accounts/incomeStatement" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Income Statement</RouterLink></li>
				<li><RouterLink to="/accounts/COA" class="block p-2 rounded-md text-black hover:bg-yellow-400 transition-all duration-300">Chart of Accounts</RouterLink></li>
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
