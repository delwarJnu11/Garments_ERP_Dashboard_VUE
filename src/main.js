import './assets/main.css';

import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './components/routes/routes';

createApp(App).use(PrimeVue).use(router).mount('#app');
