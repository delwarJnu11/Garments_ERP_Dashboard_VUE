import './assets/main.css';

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from './App.vue';
import { router } from './components/routes/routes';
import { useAuthStore } from './store/AuthStore';

createApp(App)
	.use(createPinia())
	.use(PrimeVue)
	.use(router)
	.use(Vue3Toastify, {
		autoClose: 5000,
		position: 'top-right',
		theme: 'dark',
		pauseOnHover: true,
		hideProgressBar: false,
	})
	.mount('#app');
	const auth = useAuthStore();
	auth.initAuth();

