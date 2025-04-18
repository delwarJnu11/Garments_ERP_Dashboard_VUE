import { api } from '@/api';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {  
  state: () => ({
    categories: [],
    search: null,
    error: null,
    loading: false  
  }),
  actions: {
    async fetchCategory(url = '/all-categories') {
        this.loading = true;
        this.error = null;
        try {
          const res = await api.get(url);
         this.categories = res.data.categories;// still nested in .data
        //   console.log("Categories:",res.data.categories );
        } catch (err) {
          this.error = err.message || 'Failed to fetch categories';
        } finally {
          this.loading = false;
        }
      }
      
  }
});

