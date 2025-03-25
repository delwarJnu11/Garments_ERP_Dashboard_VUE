<template>
	<v-chart
		:option="chartOption"
		style="height: 400px"
	/>
</template>

<script>
import { LineChart } from 'echarts/charts';
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
	LineChart,
	GridComponent,
	TooltipComponent,
	LegendComponent,
	CanvasRenderer,
]);

export default defineComponent({
	components: { VChart },
	setup() {
		const chartOption = ref({
			title: { text: 'Sales Over Time' },
			tooltip: { trigger: 'axis' },
			legend: { data: ['Sales'] },
			xAxis: {
				type: 'category',
				data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: 'Sales',
					type: 'line',
					data: [120, 200, 150, 80, 250],
					smooth: true, // Makes the line smooth
					itemStyle: {
						color: '#FF5733', // Change line color
					},
					lineStyle: {
						width: 3, // Line thickness
					},
				},
			],
		});

		return { chartOption };
	},
});
</script>
