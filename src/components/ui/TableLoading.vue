<script setup></script>

<template>
	<tr
		v-for="n in 5"
		:key="n"
		class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
	>
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

<style lang="scss" scoped></style>
