<script setup>
import { reactive } from 'vue';
import { useProductStore } from '@/store/ProductStore';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter()
const productData = reactive({
	name: "",
	product_type_id: "",
	category_id: "",
	squ: "",
	qty: "",
	uom_id: "",
	size_id: "",
	unit_price: ""
});

const handleSubmit = async () => {
	try {
		await productStore.createProduct(productData);
		alert("Product created successfully!");
		// Optionally reset the form
		Object.keys(productData).forEach(key => productData[key] = "");
        router.push("products")
	} catch (error) {
		alert("Failed to create product. Check console.");
	}

   
}
</script>


<template>
    <div class="max-w-4xl  mx-auto bg-white p-8 shadow-md rounded-md mt-10">
        <h2 class="text-2xl text-center font-bold mb-5">Add Product</h2>
       
        <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <div class="relative">
                        <input v-model="productData.name" type="text"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Enter your name" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                    <div class="relative">
                        <input  v-model="productData.product_type_id" type="text"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Enter your email" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Product Size</label>
                    <select  v-model="productData.size_id"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select User Role</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

              

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">SQU</label>
                    <div class="relative">
                        <input type="text"  v-model="productData.squ"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Confirm password" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

            
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                    <select  v-model="productData.category_id"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select Category</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Unit of Measure</label>
                    <select  v-model="productData.uom_id"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select User UOM</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Unit price</label>
                    <div class="relative">
                        <input type="text"  v-model="productData.unit_price"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Enter password" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>
              
                <!-- Submit -->
                <div class="mt-6">
                    <button type="submit"
                        class="w-full bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-900 transition duration-200">
                        Add product
                    </button>
                </div>
                </div>
        </form>
    </div>
 
</template>

<style lang="scss" scoped></style>