<script setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';

const transactions = ref([]);

onMounted(()=>{
fetchTransactions();
})

const fetchTransactions=()=>{
    api.get('transactions')
    .then((resp)=>{
        console.clear();
        transactions.value=resp.data;
        console.log(resp.data);
        // console.log(transactions);
    })
    .catch((error)=>{
        console.log(error);
    })
}

console.log(transactions);

</script>

<template>
<h1 class="text-center text-blue-400 p-5 font-bold text-[24px] rounded bg-gray-600">Transactions</h1>
<RouterLink to="/accounts/transactions/create">Add Transaction</RouterLink>

<table class="table-auto mx-auto">
    <thead>
        <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Details</th>
            <th>Debit</th>
            <th>Credit</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id" class="my-5">
            <td class="px-3 py-1">{{ transaction.transaction_date }}</td>
            <td class="px-3 py-1">{{ transaction.account.name }}</td>
            <td class="px-3 py-1">{{ transaction.description }}</td>
            <td class="px-3 py-1">{{ transaction.debit?? transaction.debit }}</td>
            <td class="px-3 py-1">{{ transaction.credit }}</td>   
        </tr>
    </tbody>
</table>
</template>

<style scoped>

</style>