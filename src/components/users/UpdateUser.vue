<script setup>
import { api } from '@/api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const roles = ref([]);
const router = useRouter();
const imgUrl = import.meta.env.VITE_IMG_BASE_URL
const { id } = useRoute().params
const userData = reactive({
  id: "",
  name: "",
  email: "",
  role_id: "",
  image: "",
})
onMounted(() => {
  fetchUser()
  fetchRoles()
})

const fetchUser = () => {
  api.get(`/users/${id}`)
    .then(res => {
      // console.log(res.data.user)
      userData.id = res.data.user.id
      userData.name = res.data.user.name
      userData.email = res.data.user.email
      userData.role_id = res.data.user.role_id;
      userData.image = res.data.user.image
    })
    .catch(err => {
      console.log(err)
    })
}

const fetchRoles = () => {
  api.get("/roles")
    .then((result) => {
      // console.log(result.data)
      roles.value = result.data.roles.data;
      

    }).catch((err) => {

    });
}
const updateUser = () => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("role_id", userData.role_id);

  // if (userData.password) {
  //   formData.append("password", userData.password);
  //   formData.append("password_confirmation", userData.password); // Match for confirmation rule
  // }

  if (userData.image instanceof File) {
    formData.append("image", userData.image);
  }

  api.post(`/users/${userData.id}?_method=PUT`, formData)
    .then(res => {
      console.log("Updated!", res.data);
      router.push("/users");
    })
    .catch(err => {
      console.error("Validation Error", err.response.data.errors);
    });
};


// const updateUser = () => {
//     const formData = new FormData
//     formData.append("id",userData.id);
//     formData.append("name",userData.name);
//     formData.append("email",userData.email);
//     formData.append("role_id",userData.role_id);
//     formData.append("image",userData.image);

//     api.put(`/users/${userData.id}`,formData)
//     .then((result) => {
//       console.log(result.data)
//       roles.value = result.data.roles.data
//       router.push('/users')
//     }).catch((err) => {
//       console.log(err)
//     });
// }



// Handle image file change
const handleImageChange = (e) => {
 userData.image = e.target.files[0];
};


</script>


<template>
  <div class="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md mt-10">
    <h2 class="text-2xl font-bold mb-2">Register</h2>
    <p class="text-sm text-gray-600 mb-6">Create New User</p>
    <form @submit.prevent="updateUser">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Image Preview -->
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div class="relative">
            <input type="text" v-model="userData.name"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your name" />
            <span class="absolute right-3 top-2.5 text-gray-400">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div class="relative">
            <input type="email" v-model="userData.email"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email" />
            <span class="absolute right-3 top-2.5 text-gray-400">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <!-- User Role -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">User Role</label>
          <select v-model="userData.role_id"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">Select User Role</option>

            <option v-for="role in roles" :key="role.id" :value="role.id" :selected="role.id === userData.role_id">{{
              role.name }}</option>
          </select>
        </div>
        <!-- Upload Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input @change="handleImageChange" type="file"
            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
        </div>
      </div>
      <div class="m-3">
        <img v-if="imagePreview" :src="imagePreview" width="100" alt="Image Preview" />
        <img v-else-if="userData.image" :src="`${imgUrl}//users/${userData.image}`" width="100"
          alt="Current User Image" />
      </div>


      <!-- Terms -->
      <div class="mt-6 flex items-center">
        <input id="terms" name="terms" type="checkbox"
          class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
        <label for="terms" class="ml-2 block text-sm text-gray-700">
          I agree to the <a href="#" class="text-purple-600 underline">Terms & Privacy</a>
        </label>
      </div>

      <!-- Submit -->
      <div class="mt-6">
        <button type="submit"
          class="w-full bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-900 transition duration-200">
          Register User
        </button>
      </div>

    
    </form>
  </div>
</template>

<style scopes></style>