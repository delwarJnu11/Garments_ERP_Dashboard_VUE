<script setup>
const props = defineProps(['title', 'subTitle', 'btnText', 'to']);
</script>

<template>
	<div class="flex justify-between items-center mb-8 p-4">
		<div>
			<h2 class="text-2xl leading-7 tracking-wide font-bold mb-2">
				{{ props?.title }}
			</h2>
			<p class="text-sm leading-6 tracking-tight font-medium">
				{{ props?.subTitle }}
			</p>
		</div>
		<RouterLink
			:to="props?.to"
			class="inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-secondary"
		>
			Create {{ props?.btnText }}
		</RouterLink>
	</div>
</template>

<style scoped></style>
