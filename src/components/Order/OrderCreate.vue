<script setup>
import { useBuyerStore } from '@/store/buyerStore';
import { useFabricsTypeStore } from '@/store/fabricsTypesStore';
import { useOrderStatusStore } from '@/store/orderStatusStore';
import { useUserStore } from '@/store/userStore';
import { onMounted, reactive } from 'vue';

const INIT = {
	buyer_id: '',
	supervisor_id: '',
	status_id: '',
	fabric_type_id: '',
	gsm: '',
	delivery_date: '',
	description: '',
};

const order = reactive({ ...INIT });

// Store
const buyers = useBuyerStore();
const users = useUserStore();
const status = useOrderStatusStore();
const fabrics = useFabricsTypeStore();

onMounted(async () => {
	await buyers.fetchBuyers();
	await users.getSupervisors();
	await status.fetchAllStatus();
	await fabrics.fetchFabrics();
});

// Handle Order
const handleOrder = () => {
	console.log(order);
};
</script>

<template>
	<div class="container mx-auto bg-white p-8 rounded-xl shadow-md">
		<h2 class="text-2xl font-bold text-gray-800 mb-6">Create New Order</h2>
		<form
			@submit.prevent="handleOrder"
			class="grid grid-cols-1 md:grid-cols-2 gap-6"
		>
			<div>
				<label
					for="buyer_id"
					class="block text-sm font-medium text-gray-700 mb-1 leading-6 tracking-wide"
					>Buyer</label
				>
				<select
					id="buyer_id"
					name="buyer_id"
					v-model="order.buyer_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option
						class="text-base font-normal tracking-wide leading-5"
						value=""
					>
						Select Buyer
					</option>
					<option
						v-if="!buyers.loading"
						v-for="buyer in buyers.buyers.data"
						class="text-base font-normal tracking-wide leading-5 cursor-pointer"
						:value="buyer?.id"
					>
						{{ buyer?.first_name }} {{ buyer?.last_name }}
					</option>
				</select>
			</div>
			<div>
				<label
					for="supervisor_id"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Supervisor</label
				>
				<select
					id="supervisor_id"
					name="supervisor_id"
					v-model="order.supervisor_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option value="">Select Supervisor</option>
					<option
						class="text-base font-normal tracking-wide leading-5 cursor-pointer"
						v-if="!users.loading"
						v-for="supervisor in users.supervisors"
						:value="supervisor?.id"
					>
						{{ supervisor?.name }}
					</option>
				</select>
			</div>
			<div>
				<label
					for="status_id"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Status</label
				>
				<select
					id="status_id"
					name="status_id"
					v-model="order?.status_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option value="">Select Status</option>
					<option
						class="text-base font-normal tracking-wide leading-5 cursor-pointer"
						v-if="!status.loading"
						v-for="stat in status.allStatus"
						:value="stat?.id"
					>
						{{ stat.name }}
					</option>
				</select>
			</div>
			<div>
				<label
					for="fabric_type_id"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Fabric Type</label
				>
				<select
					id="fabric_type_id"
					name="fabric_type_id"
					v-model="order.fabric_type_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option value="">Select Fabric Type</option>
					<option
						class="text-base font-normal tracking-wide leading-5 cursor-pointer"
						v-if="!fabrics.loading"
						v-for="fabric in fabrics.fabricsTypes"
						:value="fabric?.id"
					>
						{{ fabric?.name }}
					</option>
				</select>
			</div>
			<div>
				<label
					for="gsm"
					class="block text-sm font-medium text-gray-700 mb-1"
					>GSM</label
				>
				<input
					type="number"
					id="gsm"
					name="gsm"
					v-model="order.gsm"
					placeholder="Enter GSM"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				/>
			</div>
			<div>
				<label
					for="delivery_date"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Delivery Date</label
				>
				<input
					type="date"
					id="delivery_date"
					name="delivery_date"
					v-model="order.delivery_date"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				/>
			</div>
			<div class="md:col-span-2">
				<label
					for="description"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Description</label
				>
				<textarea
					id="description"
					name="description"
					rows="4"
					v-model="order.description"
					placeholder="Add order details..."
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				></textarea>
			</div>
			<div class="md:col-span-2 flex justify-end">
				<button
					type="submit"
					class="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
				>
					Submit Order
				</button>
			</div>
		</form>
	</div>
</template>

<style></style>
