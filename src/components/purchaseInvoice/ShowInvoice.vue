
<script setup>
import { api } from '@/api';
// import { nextTick } from 'vue';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import html2pdf from 'html2pdf.js';
// import { Scale } from 'lucide-vue-next';

const pdfContent = ref(null);
const {id} = useRoute().params;
const invoice = ref({});
// const downloadPdf = ()=>{
//   const element =pdfContent.value
//   if (!element || !invoice.value.id) {
//     console.warn('PDF element or invoice ID is missing');
//     return;
//   }
//   const options={
//     margin:0.5,
//     filename : `purchase-invoice-${invoice.value.id}.pdf`,
//     image:{
//       type:'jpeg',quality:0.98
//     },
//     html2canvas:{
//       scale:2
//     },
//     jsPDF:{
//       unit:'in', format:'letter',orientation:'portrait' 
//     },
//     // html2pdf().options().from(element).save()
   
//   };
//   html2pdf().set(options).from(element).save()
// }

const downloadPdf = async () => {
  await nextTick(); // waits for DOM update

  const element = pdfContent.value;
  if (!element || !invoice.value.id) {
    alert('PDF element or invoice ID is missing!');
    return;
  }

  const options = {
    margin: 0.5,
    filename: `purchase-invoice-${invoice.value.id}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf().set(options).from(element).save();
};
onMounted(async () => {
  await getInvoice();       // Wait for invoice to load
  await nextTick();         // Wait for DOM to update after invoice data is set
  console.log("pdf element", pdfContent.value); // Should now be valid
});
  const getInvoice=async()=>{
   try {
    const res= await  api.get(`/purchaseInvoice/${id}`)
      invoice.value = res.data.purchaseInvoiceGet
    console.log(res.data)
   } catch (error) {
    console.log(error)
   }

   

  }


</script>
<template>
  

  <!-- <div ref="pdfContent" v-if="invoice" class="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-md overflow-hidden"> -->
    <div v-if="invoice.id" ref="pdfContent" class="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-md overflow-hidden">

  <div class="bg-purple-500 text-white text-center py-4">
    <h3 class="text-xl font-semibold">Purchase Invoice - Raw Materials</h3>
  </div>

  <div class="p-6 space-y-6">
    <div class="flex flex-col md:flex-row justify-between gap-6">
      <div v-if="invoice.inv_supplier">
        <h5 class="font-semibold mb-2">Supplier Details:</h5>
        <p ><strong>Name:</strong> {{ `${invoice.inv_supplier.first_name} ${invoice.inv_supplier.last_name}` }}</p>
        <p><strong>Address:</strong> {{invoice.inv_supplier.address}}</p>
        <p><strong>Email:</strong> {{invoice.inv_supplier.email}}</p>
      </div>
      <div class="text-right" v-if="invoice">
        <h5 class="font-semibold mb-2">Invoice Details:</h5>
        <p><strong>Invoice ID:</strong> #INV-000{{ invoice.id }}</p>
        <p><strong>Purchase Date:</strong> {{ invoice.purchase_date }}</p>
        <p><strong>Delivery Date:</strong> {{ invoice.delivery_date }}</p>
      </div>
    </div>

    <hr class="my-4">

    <div >
      <h5 class="font-semibold mb-3">Product Details</h5>
      <div class="overflow-x-auto">
        <table class="w-full table-auto border border-gray-300 text-sm">
          <thead class="bg-gray-200">
            <tr>
              <th class="border px-4 py-2">Material Name</th>
              <th class="border px-4 py-2">Unit Price</th>
              <th class="border px-4 py-2">Quantity</th>
              <th class="border px-4 py-2">Discount</th>
              <th class="border px-4 py-2">VAT </th>
              <th class="border px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            
            <tr v-if="invoice.purchase_details" v-for="detail in invoice.purchase_details" :key="detail.id">
              <td class="border px-4 py-2">{{ detail.product.name }}</td>
              <td class="border px-4 py-2">{{ detail.price }}</td>
              <td class="border px-4 py-2">{{ detail.quantity }}</td>
              <td class="border px-4 py-2"> {{ detail.discount }}</td>
              <td class="border px-4 py-2">{{ detail.vat }}</td>
              <!-- const total = {{ detail.price }} * {{ detail.quantity }}
              const subtotal  = `{total -{{ detail.discount  }}}-{{ detail.vat  }}` -->
              <td class="border px-4 py-2">  {{ (detail.price * detail.quantity - detail.discount + Number(detail.vat)).toFixed(2) }}</td>
            </tr>
           
            <tr v-else="invoice">
              <td colspan="6" class="border px-4 py-2 text-center text-gray-500 italic">No products found for this purchase order.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between gap-6">
      <div>
        <p><strong>Shipping Address:</strong> {{ invoice.shipping_address }}</p>
        <p><strong>Notes:</strong> Urgent delivery required</p>
      </div>
      <div v-if="invoice" class="text-right">
        <h4 class="text-lg font-bold">Total: {{ invoice.total_amount }}</h4>
        <h5 class="text-base">Paid: {{ invoice.paid_amount }}</h5>
        <h5 class="text-base">Pending Amount:{{ (invoice.total_amount - invoice.paid_amount ) }}</h5>
      </div>
    </div>
  </div>

  <div class="bg-gray-100 text-center py-4">
    <a
  v-if="invoice.id"
  @click.prevent="downloadPdf"
 
  class="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
>
  Download PDF
</a>
    <button onclick="window.print();" class="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Print Invoice</button>
  </div>
</div>

</template>

<style lang="scss" scoped>

</style>