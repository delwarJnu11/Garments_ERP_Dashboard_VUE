
import { api } from '@/api';
import { defineStore } from 'pinia';


export const useSupplerStore = defineStore('supplier',{
    state:()=>({
        suppliers:[],
        error:null,
        loading:null,
        Search:""
    }),
    actions:{
        async fetchSupplier(url='/suppliers'){
            this.loading=true
            try {
                const res = await api.get(url,{params:{search:this.search}})
                this.suppliers = res.data.suppliers
                // this.suppliers = res.data.suppliers.data
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
            finally{
                this.loading=false
            }
           
        }
    }
});
