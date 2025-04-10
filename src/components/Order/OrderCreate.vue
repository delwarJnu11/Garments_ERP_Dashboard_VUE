<script setup>
import { ref } from 'vue';

const buyers = ref([]);
const supervisors = ref([]);
const statuses = ref([]);
const fabricsTypes = ref([]);
</script>

<template>
	<div class="container mx-auto bg-white p-8 rounded-xl shadow-md">
		<!-- Form Title -->
		<h2 class="text-2xl font-bold text-gray-800 mb-6">Create New Order</h2>

		<form class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Buyer -->
			<div>
				<label
					for="buyer_id"
					class="block text-sm font-medium text-gray-700 mb-1 leading-6 tracking-wide"
					>Buyer</label
				>
				<select
					id="buyer_id"
					name="buyer_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option
						class="text-base font-normal tracking-wide leading-5"
						value=""
					>
						Select Buyer
					</option>
					<option
						class="text-base font-normal tracking-wide leading-5 cursor-pointer"
						value="1"
					>
						Buyer A
					</option>
					<option value="2">Buyer B</option>
				</select>
			</div>

			<!-- Supervisor -->
			<div>
				<label
					for="supervisor_id"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Supervisor</label
				>
				<select
					id="supervisor_id"
					name="supervisor_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option value="">Select Supervisor</option>
					<option value="1">Supervisor A</option>
					<option value="2">Supervisor B</option>
				</select>
			</div>

			<!-- Status -->
			<div>
				<label
					for="status_id"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Status</label
				>
				<select
					id="status_id"
					name="status_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option value="">Select Status</option>
					<option value="1">Pending</option>
					<option value="2">Approved</option>
				</select>
			</div>

			<!-- Fabric Type -->
			<div>
				<label
					for="fabric_type_id"
					class="block text-sm font-medium text-gray-700 mb-1"
					>Fabric Type</label
				>
				<select
					id="fabric_type_id"
					name="fabric_type_id"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				>
					<option value="">Select Fabric Type</option>
					<option value="1">Cotton</option>
					<option value="2">Polyester</option>
				</select>
			</div>

			<!-- GSM -->
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
					placeholder="Enter GSM"
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				/>
			</div>

			<!-- Delivery Date -->
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
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				/>
			</div>

			<!-- Description (Full width) -->
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
					placeholder="Add order details..."
					class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
				></textarea>
			</div>

			<!-- Submit Button (Full width on mobile, right aligned on desktop) -->
			<div class="md:col-span-2 flex justify-end">
				<button
					type="submit"
					class="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md"
				>
					Submit Order
				</button>
			</div>
		</form>
	</div>
</template>

<style></style>
