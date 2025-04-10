<template>
    <div class="relative w-72">
      <input
        type="text"
        placeholder="Search with name or Id"
        class="w-full border border-primary px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:shadow-md"
        :value="modelValue"
        @input="$emit('update:modelValue',$event.target.value)" @keyup="$emit('input')"
      />
    </div>
  </template>
  
  <script setup>
   defineProps(['modelValue']);
   defineEmits(['update:modelValue','input']);
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  



  <!-- <template>
    <div class="relative w-72">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" 
        @keyup="$emit('input')"
        placeholder="Search with name or Id"
        class="w-full border border-primary px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:shadow-md"
      />
    </div>
  </template>
  
  <script setup>
  defineProps(['modelValue']);
  defineEmits(['update:modelValue', 'input']);
  </script> -->
  



