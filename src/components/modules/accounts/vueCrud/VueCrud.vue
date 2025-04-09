<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';

const vueData = ref([]);
const button = ref("Add Member");
const data = reactive({
    id:"",
    name:"",
    details:"",
})

onMounted(()=>{
fetchVueCrud()
})

const fetchVueCrud = ()=>{
    api.get("vueCrud")
    .then((result) => {
        vueData.value = result.data
        console.log(result)
    }).catch((err) => {
        console.log(error)
    });
}

const edit = (id)=>{
    api.get("vueCrud/"+id)
    .then((result) => {
        // vueData.value = result.data
        console.log(result.data)
        data.id = result.data.id
        data.name = result.data.name
        data.details = result.data.details
        button.value= "Update Member"
    }).catch((err) => {
        console.log(err)
    });
}

const deleted = (id)=>{
    api.delete("vueCrud/"+id)
    .then((result) => {
        vueData.value = result.data
        console.log(result)
        fetchVueCrud();
    }).catch((err) => {
        console.log(error)
    });
}

const submitData = ()=>{
    if (data.id!="") {
        api.put("vueCrud/"+data.id, data)
    .then((result) => {
        // vueData.value = result.data
        console.log(result)
        fetchVueCrud();
    }).catch((err) => {
        console.log(err)
    })

    }else{
        api.post("vueCrud", data)
    .then((result) => {
        // vueData.value = result.data
        console.log(result)
        fetchVueCrud();
    }).catch((err) => {
        console.log(err)
    });
    }
}


console.clear()
</script>

<template>
<h1 class="text-center font-bold bg-gray-400 p-4 rounded">Vue Crud Exam</h1>
<div>
    <!-- {{ data.name }} || {{ data.details }} <br> -->
    <form @submit.prevent="submitData(data.id)">
        <input v-model="data.name" type="text" placeholder="Insert your name">
        <input v-model="data.details" type="text" placeholder="Insert your details">
        <input type="submit" :value="`${button}`" class="btn bg-green-400 p-3 rounded">
    </form>
</div>
<table class="table mx-auto">
    <thead>
        <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="vue in vueData" :key="vue.id">
            <td class="px-3 py-1">
                {{ vue.name }}</td>
            <td class="px-3 py-1">
                {{ vue.details }}</td>
            <td class="px-3 py-1">
                <button @click="deleted(vue.id)" class="btn bg-red-400 mx-1 p-2 rounded">X</button>
                <button @click="edit(vue.id)" class="btn bg-green-400 mx-1 p-2 rounded">Edit</button>
            </td>
        </tr>
    </tbody>
</table>
</template>

<style scoped>

</style>