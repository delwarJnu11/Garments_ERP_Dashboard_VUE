<script setup>
import { reactive } from 'vue';


const transactions = reactive({
    voucher_ref:"",
    transaction_date:"",
    account_id:"",
    amount:"",
    description:"",
    transaction_against:"",
    debit:"",
    credit:"",
    user_id:"3",
})

</script>

<template>
<h1 class="text-center text-blue-400 p-5 font-bold text-[24px] rounded bg-gray-600">Register Transaction</h1>

<form @submit.prevent="addTransactions"></form>
</template>

<style scoped>

</style>