

<script setup>
import api from '@/Api';
import { Password } from 'primevue';
import { onMounted, reactive, ref } from 'vue';

const roles = ref([])
  const userDate = reactive({
    name:"",
    email:"",
    password:"",
    role_id:"",
    image:""
  });

  const imgFileUpload =(e)=>{
    userDate.image = e.target.files[0]
  }


  const fetchRoles = () => {
  api.get('/roles')  // Use GET request for fetching data
    .then((result) => {
      console.log(result.data);
      roles.value = result.data.roles.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

  onMounted(()=>{
    fetchRoles()
  })


  const submitDate=()=>{
    const formData = new FormData()
    formData.append("name",userDate.name);
    formData.append("email",userDate.email);
    formData.append("password",userDate.password);
    formData.append("role_id",userDate.role_id);
    formData.append("image",userDate.image);
    api.post('/users',userDate)
    .then((result) => {
      console.log(result.data)
    }).catch((err) => {
      console.log(err)
    });

  }

</script>
<template>
    <div class="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md mt-10">
   <h2 class="text-2xl font-bold mb-2">Register</h2>
   <p class="text-sm text-gray-600 mb-6">Create New User</p>
   <form @submit.prevent="submitDate">
     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
       <!-- Name -->
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
         <div class="relative">
           <input v-model="userDate.name" type="text" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Enter your name" />
           <span class="absolute right-3 top-2.5 text-gray-400">
             <i class="fas fa-user"></i>
           </span>
         </div>
       </div>
 
       <!-- Email -->
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
         <div class="relative">
           <input v-model="userDate.name" type="email" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Enter your email" />
           <span class="absolute right-3 top-2.5 text-gray-400">
             <i class="fas fa-envelope"></i>
           </span>
         </div>
       </div>
 
       <!-- Password -->
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
         <div class="relative">
           <input v-model="userDate.password" type="password" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Enter password" />
           <span class="absolute right-3 top-2.5 text-gray-400">
             <i class="fas fa-eye-slash"></i>
           </span>
         </div>
       </div>
 
       <!-- Confirm Password -->
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
         <div class="relative">
           <input v-model="userDate.password" type="password" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Confirm password" />
           <span class="absolute right-3 top-2.5 text-gray-400">
             <i class="fas fa-eye-slash"></i>
           </span>
         </div>
       </div>
 
       <!-- User Role -->
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">User Role</label>
         <select v-model="userDate.role_id" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
           <option value="">Select User Role</option>
           <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
         </select>
       </div>
       <!-- Upload Image -->
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
         <input @change="imgFileUpload" type="file" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
       </div>
     </div>
 
     <!-- Terms -->
     <div class="mt-6 flex items-center">
       <input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
       <label for="terms" class="ml-2 block text-sm text-gray-700">
         I agree to the <a href="#" class="text-purple-600 underline">Terms & Privacy</a>
       </label>
     </div>
 
     <!-- Submit -->
     <div class="mt-6">
       <button type="submit" class="w-full bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-900 transition duration-200">
         Register User
       </button>
     </div>
   </form>
 </div>
 
 </template>





<style  scoped>

</style>