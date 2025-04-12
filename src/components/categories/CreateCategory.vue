<template>
   <div class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
  <!-- Header Section -->
  <h1 class="text-xl font-semibold text-white bg-purple-700 py-3 px-4 rounded-t-md">
    Add Category
  </h1>
  <!-- Form Section -->

  <form @submit.prevent="submitData" class="p-4">
    <!-- Category Name -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2" for="categoryName">
        Category Name
      </label>
      <input
      v-model="categoryData.name"
        type="text"
        id="categoryName"
        name="categoryName"
        placeholder="Enter category name"
        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    </div>

    <!-- Is Raw Material -->
    <div class="mb-4 flex items-center">
      <input
        type="checkbox"
        id="isRawMaterial"
        name="isRawMaterial"
        v-model="categoryData.isRawMaterial"
        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
      />
      <label class="ml-2 text-gray-700" for="isRawMaterial">
        Check if this is a raw material.
      </label>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
    >
      Submit
    </button>
  </form>
</div>

</template>

<script setup>
import api from '@/Api';
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter()
    const categoryData = reactive({
        name:"",
        isRawMaterial:""
    })

    const submitData = () => {
    api.post("/categories", categoryData)
      .then((result) => {
        console.log(result.data);
        router.push({ path: "/categories" });
      })
      .catch((err) => {
        console.log(err);
      });
}

</script>

<style lang="scss" scoped>

</style>