<script setup>
import { reactive } from 'vue';


const transactions = reactive({
    voucher_ref:"",
    transaction_date:"",
    account_id:"",
    amount:"",
    description:"",
    trainsaction_against:"",
    debit:"",
    credit:"",
            // $transaction->voucher_ref = $request->voucher_ref ?? "";
            // $transaction->transaction_date = $request->transaction_date;
            // $transaction->account_id = $request->account_id;
            // $transaction->amount = $request->debit;
            // $transaction->description = $request->description;
            // $transaction->transaction_against = $request->transaction_against_id;
            // $transaction->debit = $request->debit ?? 0;
            // $transaction->credit = $request->credit ?? 0;
            // $transaction->user_id = Auth::user()->id;
            // date_default_timezone_set("Asia/Dhaka");
            // $transaction->created_at = date('Y-m-d H:i:s');
            // date_default_timezone_set("Asia/Dhaka");
            // $transaction->updated_at = date('Y-m-d H:i:s');
            // $transaction->save();
})

</script>

<template>
<h1 class="text-center text-blue-400 p-5 font-bold text-[24px] rounded bg-gray-600">Register Transaction</h1>
</template>

<style scoped>

</style>