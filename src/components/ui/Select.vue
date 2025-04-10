<script setup>
const props = defineProps({
	id: String,
	name: String,
	label: String,
	modelValue: [String, Number],
	options: {
		type: Array,
		required: true,
	},
	placeholder: {
		type: String,
		default: 'Select an option',
	},
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
	<div>
		<label
			:for="id"
			class="block text-sm font-medium text-gray-700 mb-1"
		>
			{{ label }}
		</label>
		<select
			:id="id"
			:name="name"
			:value="modelValue"
			@change="emit('update:modelValue', $event.target.value)"
			class="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary p-2.5"
		>
			<option
				class="text-base font-normal tracking-wide leading-5 cursor-pointer"
				value=""
			>
				{{ placeholder }}
			</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				class="text-base font-normal tracking-wide leading-5 cursor-pointer"
			>
				{{ option.label }}
			</option>
		</select>
	</div>
</template>
