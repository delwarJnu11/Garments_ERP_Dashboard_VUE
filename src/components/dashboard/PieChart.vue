<template>
	<v-chart
		:option="chartOption"
		style="height: 400px"
	/>
</template>

<script>
import { PieChart } from 'echarts/charts';
import { LegendComponent, TooltipComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { defineComponent, ref } from 'vue';
import VChart from 'vue-echarts';

use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

export default defineComponent({
	components: { VChart },
	setup() {
		const chartOption = ref({
			title: { text: 'Tracking EveryThings' },
			tooltip: { trigger: 'item' },
			legend: { bottom: '5%', left: 'center' },
			series: [
				{
					name: 'Track',
					type: 'pie',
					radius: '50%',
					data: [
						{ value: 30, name: 'Expenses', itemStyle: { color: '#3572EF' } },
						{ value: 45, name: 'Profit', itemStyle: { color: '#AD46FF' } },
						{ value: 25, name: 'Sales', itemStyle: { color: '#F0B100' } },
					],
				},
			],
		});

		return { chartOption };
	},
});
</script>
