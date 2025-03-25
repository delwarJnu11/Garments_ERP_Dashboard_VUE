<script>
import { BarChart } from 'echarts/charts';
import {
	GridComponent,
	LegendComponent,
	TooltipComponent,
} from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { defineComponent, ref } from 'vue';
import VChart from 'vue-echarts';

use([
	BarChart,
	GridComponent,
	TooltipComponent,
	LegendComponent,
	CanvasRenderer,
]);

export default defineComponent({
	components: { VChart },
	setup() {
		const chartOption = ref({
			title: { text: 'Sales Data' },
			tooltip: {},
			legend: { data: ['Sales'] },
			xAxis: {
				data: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec',
				],
			},
			yAxis: {},
			series: [
				{
					name: 'Sales',
					type: 'bar',
					data: [30, 50, 80, 40, 65, 50, 85, 75, 80, 40, 65, 50],
				},
			],
		});

		return { chartOption };
	},
});
</script>

<template>
	<v-chart
		:option="chartOption"
		style="height: 400px"
	/>
</template>

<style scoped></style>
