

<script setup>
import { useProductStore } from '@/store/ProductStore';
import { onMounted, reactive } from 'vue';
// import { useProductStore } from '@/store/ProductStore';
import { useRouter } from 'vue-router';
// import { api } from '@/api';
import { toast } from 'vue3-toastify';


const productJoinStore = useProductStore()
// const productStore = useProductStore();
const router = useRouter()
const productData = reactive({
    name: "",
    product_type_id: "",
    category_type_id: "",
    sku: "",
    qty: "",
    uom_id: "",
    size_id: "",
    unit_price: ""
});

onMounted(async()=>{
  await productJoinStore.fetchProducts('/products');
})
// const categories = ref([]);
// const productTypes = ref([]);
// const sizes = ref([]);
// const uoms = ref([]);

// const productsJoinData = useProductStore()
// console.log(productsJoinData )
// onMounted(async()=>{
//     await productsJoinData.fetchProducts('/products')
   
// })


const handleSubmit = async()=>{
    try {
        const res = await api.post("/products",productData)
        console.log(res.data)
        if(res.data.status===200){
            toast.success(res.data.message)
            Object.keys(productData).forEach(key=>{
                productData[key]= "";
            })
            router.push("/products")
        }
    } catch (error) {
        console.log("create product failed:", error);
        alert("Failed to create product: " + (error.response?.data?.message || error.message));
    }
}

// const handleSubmit = async () => {
//     try {
//         await productStore.createProduct(productData);
//         alert("Product created successfully!");
//         // Optionally reset the form
//         Object.keys(productData).forEach(key => productData[key] = "");
//         router.push("/products")
//     } catch (error) {
//         alert("Failed to create product. Check console.");
//     }
// }
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
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <div class="relative">
                        <input type="text" v-model="productData.sku"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                    <select v-model="productData.product_type_id"
                  
                   
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select product type</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Product Size</label>
                    <select v-model="productData.size_id"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select Size</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category Type</label>
                    <select v-model="productData.category_type_id"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select Category Type</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Unit of Measure</label>
                    <select v-model="productData.uom_id"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select User UOM</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <div class="relative">
                        <input type="text" v-model="productData.qty"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Unit price</label>
                    <div class="relative">
                        <input type="text" v-model="productData.unit_price"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <i class="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

                <!-- Submit -->
                <div class="md:col-span-2 mt-6">
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






