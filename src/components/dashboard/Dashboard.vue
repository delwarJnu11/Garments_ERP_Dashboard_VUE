<template>
	<div>
		<div class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
			<div class="text-center bg-indigo-500 rounded-md shadow-md p-3">
				<h2>
					<strong class="text-3xl tracking-wide leading-12 text-white"
						>50</strong
					>
				</h2>
				<h4 class="text-xl tracking-wide leading-10 text-white">Buyers</h4>
			</div>
			<div class="text-center bg-yellow-500 rounded-md shadow-md p-3">
				<h2>
					<strong class="text-3xl tracking-wide leading-12 text-white"
						>50</strong
					>
				</h2>
				<h4 class="text-xl tracking-wide leading-10 text-white">Customers</h4>
			</div>
			<div class="text-center bg-blue-500 rounded-md shadow-md p-3">
				<h2>
					<strong class="text-3xl tracking-wide leading-12 text-white">20,00,000 ৳</strong
					>
				</h2>
				<h4 class="text-xl tracking-wide leading-10 text-white">
					Profit In {{ currentMonth }}
				</h4>
			</div>
			<div class="text-center bg-purple-500 rounded-md shadow-md p-3">
				<h2>
					<strong class="text-3xl tracking-wide leading-12 text-white">5,00,000 ৳</strong
					>
				</h2>
				<h4 class="text-xl tracking-wide leading-10 text-white">
					Profit In {{ currentMonth }}
				</h4>
			</div>
		</div>
		<div class="grid md:grid-cols-2 gap-4 mt-10">
			<BarChart />
			<PieChart />
			<LineChart />
		</div>
	</div>
</template>

<script setup>
import BarChart from './BarChart.vue';
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';

const month = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const d = new Date();
let currentMonth = month[d.getMonth()];
</script>

<style scoped></style>
