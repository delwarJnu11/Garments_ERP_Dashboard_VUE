<script setup>
import { api } from '@/api';
import { useCart } from '@/store/Cart';
import { useProductStore } from '@/store/ProductStore';
import { useSupplerStore } from '@/store/SupplierStore';
import { ref } from 'vue';
import { onMounted, reactive } from 'vue';


const supplierStore = useSupplerStore()
const productStore = useProductStore()
const cart = useCart("purchase");
const cartItems = ref(cart.getCart());
const today = new Date()
const purchaseDate = new Date().toLocaleDateString()
const deliveryDate = new Date()
deliveryDate.setDate(today.getDate() + 7)
const deliveryDaeFormat = deliveryDate.toLocaleDateString()


onMounted(async () => {
    await supplierStore.fetchAllSuppliers()
    await productStore.fetchProducts()
    await productStore.fetchWarehouse()
    await productStore.fetchForInvoiceProducts()
    await productStore.fetchInoviceId()
    cartStore.initCart('myCart')
  
});

const dataObj = reactive({
    selectedSupplier: {},
    selectedWarehouse: {},
    selectedProduct: {},
    name: '',
    item_id: 0,
    qty: 1,
    discount: 0,
    total_discount: 0,
    vat: 0,
    pending_amount: 0,
    total_vat: 0,
    grandTotal: 0,
})

const grandTotalCalculate=()=>{
    dataObj.total_discount = cart.getCart().reduce((acc,element)=>acc + element.discount,0 )
    dataObj.total_vat = cart.getCart().reduce((acc,element)=>acc + element.vat,0 )
    dataObj.grandTotal = cart.getCart().reduce((acc,element)=>acc + element.subtotal,0 )
    console.log(dataObj.total_discount)
    console.log(dataObj.total_vat)
    console.log(dataObj.grandTotal)
}

const addToCart = () => {
    if (!dataObj.selectedProduct?.unit_price) {
        alert("Please select a product with a valid unit price.");
        return;
    }

    let total = dataObj.selectedProduct.unit_price * dataObj.qty;
    let discountAmount = (total * dataObj.discount) / 100;
    let vatAmount = (total * dataObj.vat) / 100;
    let subtotal = total - discountAmount + vatAmount;

    const data = {
        item_id: dataObj.selectedProduct.id,
        name: dataObj.selectedProduct.name,
        price: dataObj.selectedProduct.unit_price,
        qty: dataObj.qty,

        // Save both percentage and actual values
        discount: `${dataObj.discount}% (${discountAmount.toFixed(2)})`,
        vat: `${dataObj.vat}% (${vatAmount.toFixed(2)})`,

        subtotal: subtotal.toFixed(2),
    };

    cart.save(data);
    cartItems.value = cart.getCart();
    grandTotalCalculate()

    console.log("Added item:", data);

    // Reset
    dataObj.selectedProduct = {};
    dataObj.qty = 1;
    dataObj.discount = 0;
    dataObj.vat = 0;
};



const purchaseProcess = ()=>{
   const processData ={
    products:cart.getCart,
    supplier:dataObj.selectedSupplier,
    warehouse:dataObj.selectedWarehouse,
    totalDiscount:dataObj.total_discount,
    totalVat:dataObj.total_vat,
    grandTotal:dataObj.grandTotal
   }
   api.post('purchaseInvoice',processData)
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    });
   }


const handleProcess = ()=>{
    purchaseProcess.supplier_id = selectedSupplier.value?.id
    purchaseProcess.warehouse_id = selectedWarehouse.value?.id
    purchaseProcess.products = item.value

}

</script>

<template>
    <div class="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <div class="text-center bg-purple-500 text-white py-4 rounded-md">
            <h3 class="text-xl font-semibold">Purchase Invoice - Raw Materials</h3>
        </div>

        <!-- Supplier & Invoice Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <!-- Supplier Details -->
            <div>
                <label class="block font-semibold mb-2">Supplier Details:</label>
                <div class="flex space-x-2">
                    <select id="supplier_id" v-model="dataObj.selectedSupplier"
                        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option value="">Select Supplier</option>
                        <option v-for="supplier in supplierStore.allSuppliers" :key="supplier.id" :value="supplier">{{
                            supplier.first_name }} {{ supplier.last_name }}</option>
                    </select>
                    <button class="bg-purple-500 text-white px-3 py-1 rounded">+</button>
                </div>
                <p class="mt-2"><strong>Supplier ID:</strong> #SUP-<span class="supp_id">{{ dataObj.selectedSupplier.id
                        }} </span></p>
                <p><strong>Address:</strong> <span class="address">{{ dataObj.selectedSupplier.address }} </span></p>
                <p><strong>Email:</strong> <span class="email">{{ dataObj.selectedSupplier.email }} </span></p>
            </div>

            <!-- Invoice Details -->
            <div>
                <label class="block font-semibold mb-2">Invoice Details:</label>
                <div class="bg-gray-100 border p-4 rounded">
                    <p><strong>Invoice ID:</strong> #<span class="invoice_id">INV-</span></p>
                    <p><strong>Purchase Date:</strong> {{ purchaseDate }}<span class="purchase_date"></span></p>
                    <p><strong>Delivery Date:</strong>{{ deliveryDaeFormat }} <span class="deliver_date"></span></p>
                </div>
            </div>
        </div>

        <!-- Warehouse -->
        <div class="mt-6">
            <label class="block font-semibold mb-2">Warehouse :</label>
            <div class="flex  space-x-2">
                <select id="warehouse_id" v-model="dataObj.selectedWarehouse"
                    class="w-112 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                    <option>Select Warehouse</option>
                    <option v-for="warehouse in productStore.warehouses" :key="warehouse.id" :value="warehouse">{{
                        warehouse.name }}</option>

                </select>
                <button class="bg-purple-600 text-white px-3 py-1 rounded">+</button>

            </div>
            <p class="mt-3"><strong>Address:</strong> <span class="address">{{ dataObj.selectedWarehouse.address }}
                </span></p>
        </div>

        <!-- Raw Material Table -->
        <div class="mt-10 overflow-x-auto">
            <table class="min-w-full border border-gray-300 text-sm text-left">
                <thead>
                    <tr class="bg-purple-500 text-white">
                        <th class="p-2">Material Name</th>
                        <th class="p-2">Unit Price</th>
                        <th class="p-2">Quantity</th>
                        <th class="p-2">Discount (%)</th>
                        <th class="p-2">VAT (%)</th>
                        <th class="p-2">Subtotal</th>
                        <th class="p-2">
                            <button class="bg-red-500 text-white px-3 py-1 rounded">Clear All</button>
                        </th>
                    </tr>
                    <tr>
                        <td class="p-2">
                            <div class="flex space-x-2">
                                <select v-model="dataObj.selectedProduct"
                                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                                    <option>Select Material</option>
                                    <option v-for="raw in productStore.rawMaterials" :key="raw.id" :value="raw">{{
                                        raw.name }}</option>

                                </select>
                                <button class="bg-purple-600 text-white px-3 py-1 rounded">+</button>
                            </div>
                        </td>
                        <td class="p-2"><input type="number"
                                class="w-full  border border-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                :value="dataObj.selectedProduct.unit_price">
                        </td>
                        <td class="p-2"><input v-model="dataObj.qty" type="number"
                                class="w-full border border-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        </td>
                        <td class="p-2"><input type="number"
                                class="w-full border border-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                v-model="dataObj.discount">
                        </td>
                        <td class="p-2"><input type="number"
                                class="w-full border border-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                v-model="dataObj.vat">
                        </td>
                        <td class="p-2"><input type="text" disabled class="w-full rounded border-gray-300"></td>
                        <td class="p-2"><button @click="addToCart"
                                class="bg-purple-600 text-white px-3 py-1 rounded">Add</button></td>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <!-- Static example row -->
                    <tr v-for="(item, i) in cartItems" :key="item.id">
                        <td class="p-2">{{ item.name }}</td>
                        <td class="p-2">{{ item.price }}</td>
                        <td class="p-2">{{ item.qty }}</td>
                        <td class="p-2"> - {{ item.discount }}</td>
                        <td class="p-2"> + {{ item.vat }}</td>
                        <td class="p-2">{{ item.subtotal }}</td>
                        <td class="p-2"><button class="bg-amber-500 text-white px-2 py-1 rounded">Remove</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Payment Info and Summary -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
                <h6 class="text-lg font-semibold mb-3">Payment info:</h6>
                <ul class="list-disc list-inside">
                    <li>Credit Card - 123***********789</li>
                    <li>Paid Amount: <span>$1,000</span></li>
                </ul>
                <p class="mt-4"><strong>Delivery Address:</strong> 123 Factory Road, Dhaka</p>
                <p><strong>Notes:</strong> Urgent delivery required.</p>
            </div>
            <div class="text-right">
                <h5 class="text-lg font-semibold">Invoice Summary:</h5>
                <p><strong>Total Amount:</strong> <span>$1,500.00</span></p>
                <p><strong>Discount:</strong> <span>- $75.00</span></p>
                <p><strong>VAT (15%):</strong> <span>+ $213.75</span></p>
                <hr class="my-2">
                <h4 class="text-xl font-bold">Grand Total: <span>$1,638.75</span></h4>
            </div>
        </div>

        <!-- Footer Buttons -->
        <div class="mt-8 text-center space-x-2">
            <button @click="purchaseProcess" class="bg-purple-600 text-white px-6 py-2 rounded">Process Invoice</button>
            <button onclick="window.print();" class="bg-green-500 text-white px-6 py-2 rounded">Print Invoice</button>
            <button class="bg-purple-500 text-white px-6 py-2 rounded">Save</button>
            <button class="bg-red-600 text-white px-6 py-2 rounded">Cancel</button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>