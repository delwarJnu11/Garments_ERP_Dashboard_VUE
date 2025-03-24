import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../dashboard/Dashboard.vue';
import Layout from '../layout/Layout.vue';

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '/',
				component: Dashboard,
			},
			{
				path: '/dashboard',
				component: Dashboard,
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
