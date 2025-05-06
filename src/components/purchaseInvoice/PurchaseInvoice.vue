<script setup>
import { onMounted, ref } from 'vue';
import PageHeading from '../ui/PageHeading.vue';
import { Eye, Trash2, UserRoundPen } from 'lucide-vue-next';
import Pagination from '../ui/Pagination.vue';
import SearchModule from '../ui/SearchModule.vue';
import { api } from '@/api';

const purchaseInvoices = ref([]);
const search = ref("");

onMounted(() => {
	fetchInvoices()
	handleDeleta()
});

const fetchInvoices = async (url) => {
	if (typeof url != 'string') {
		url = "/showInvoice"
	}
	try {
		if (url != null) {
			const res = await api.get(url, {
				params: {
					search: search.value
				}
			});
			purchaseInvoices.value = res.data.purchaseOrders
			console.log(res.data)
		}
	} catch (error) {
		console.log("fetchin error", error);
	}

}
const handleDeleta = () => {

}

</script>
<template>
	<SearchModule v-model="search" @input="fetchInvoices" />
	<PageHeading title="Purchase Invoices" subTitle="Manage your products  Lists" btnText="Purchase Order"
		to="/createInvoice" />
	<div class="overflow-x-auto rounded-lg shadow-md">
		<table class="min-w-full bg-white border border-gray-200 text-sm text-left">
			<thead class="bg-primary text-white uppercase">
				<tr class="text-center">
					<th class="px-6 py-4">SL.</th>
					<!-- <th class="px-6 py-4">Image</th> -->
					<th class="px-6 py-4">Invoice No</th>
					<th class="px-6 py-4">Supplier Name</th>
					<th class="px-6 py-4">Purchase Date</th>
					<th class="px-6 py-4">Delivery Date</th>
					<th class="px-6 py-4">Total Purchase </th>
					<!-- <th class="px-6 py-4">Warehouse Name </th> -->
					<th class="px-6 py-4">Action</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="purchaseInvoices.length === 0">
					<tr v-for="n in 5" :key="n" class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
						<td class="px-6 py-4 border border-gray-200">
							<div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
						</td>


						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center gap-3">
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
								<div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
							</div>
						</td>
					</tr>
				</template>

				<template v-else>
					<tr v-for="(invoice, index) in purchaseInvoices.data" :key="invoice.id"
						class="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition text-center">

						<td class="px-6 py-4 border border-gray-200">{{ index + 1 }} </td>

						<td class="px-6 py-4 border border-gray-200  border-gray-200ont-medium">
							INV-000{{ invoice.id }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ invoice.inv_supplier.first_name }} {{ invoice.inv_supplier.last_name }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ invoice.purchase_date }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ invoice.delivery_date }}
						</td>
						<td class="px-6 py-4 border border-gray-200">
							{{ invoice.total_amount }}
						</td>
						<!-- <td class="px-6 py-4 border border-gray-200">
						
						</td> -->


						<td class="px-6 py-4 border border-gray-200">
							<div class="flex items-center justify-center gap-3">

								
								<button
									class="p-2 rounded-md bg-gray-100 hover:bg-bg transition cursor-pointer text-center">
									<RouterLink :to="`purchaseInvoice/show/${invoice.id}`">
										<Eye class="text-gray-600 w-4 h-4" />
									</RouterLink>
								</button>
								<button @click="handleDeleta()"
									class="p-2 rounded-md bg-red-100 hover:bg-red-200 transition cursor-pointer text-center"
									title="Delete">
									<!-- <Trash2 class="text-red-600 w-4 h-4" /> -->
								</button>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>

	<!-- pagination -->
	<Pagination :items="purchaseInvoices" :fetchData="fetchInvoices" />


</template>
<style lang="scss" scoped></style>