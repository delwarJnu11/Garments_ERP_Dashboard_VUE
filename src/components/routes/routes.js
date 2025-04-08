import Login from '@/pages/Auth/Login.vue';
import Create from '@/pages/Roles/Create.vue';
import Roles from '@/pages/Roles/Roles.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../dashboard/Dashboard.vue';
import Layout from '../layout/Layout.vue';
import User from '@/pages/User.vue';

const routes = [
	{
		path: '/',
		component: Login,
	},
	{
		path: '/dashboard',
		component: Layout,
		children: [
			{
				path: '/dashboard',
				component: Dashboard,
			},
			{
				path: '/dashboard',
				component: Dashboard,
			},
			{
				path: '/roles',
				component: Roles,
			},
			{
				path: '/roles/create',
				component: Create,
			},
			{
				path: '/users',
				component: User,
			},
			
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
