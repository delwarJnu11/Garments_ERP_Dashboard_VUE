<script setup>
import { ref } from 'vue';
import Modal from '../ui/Modal.vue';
const users = ref([])

</script>

<template>
  <table class="container relative mx-auto ">
			<thead class="bg-lemon-500">
						<th class="border  border-gray-300 px-6  py-4">Sl</th>
						<th class="border border-gray-300 px-6 py-4">Name</th>
						<th class="border border-gray-300 px-6 py-4">Action</th>
					</thead>
			<tbody class="text-sm text-gray-700 divide-y divide-gray-100">
				<template v-if="!users.data || users.data.length === 0">
					<tr v-for="n in 5" :key="n" class="odd:bg-white  even:bg-gray-50 hover:bg-gray-100 transition">
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

				<template v-else>
					
					
					<tr  
						class="odd:bg-white border even:bg-gray-50 hover:bg-gray-100 transition">
						<td class="border border-gray-300 px-6 py-4"></td>
						<td class="border border-gray-300 px-6 py-4 font-medium"></td>
						<td class="border border-gray-300 px-6 py-4">
							<div class="flex items-center gap-3">
                                <button class="p-2 rounded bg-gray-100 hover:bg-gray-200" title="View">
                                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                            <button class="p-2 rounded bg-blue-100 hover:bg-blue-200" title="Edit">
                                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                                </svg>
                            </button>
                            <button class="p-2 rounded bg-red-100 hover:bg-red-200" title="Delete">
                                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path d="M19 7L5 7" />
                                    <path d="M6 7L6 19a2 2 0 002 2h8a2 2 0 002-2V7" />
                                    <path d="M10 11v6M14 11v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                                </svg>
                            </button>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
			<Modal/>
		</table>
</template>

<style  scoped>

</style>
