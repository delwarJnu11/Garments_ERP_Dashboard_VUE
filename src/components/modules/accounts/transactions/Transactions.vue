<script setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';

const transactions = ref([{

}]);

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
</template>

<style scoped>

</style>