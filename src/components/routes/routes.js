import Login from '@/pages/Auth/Login.vue';
import Create from '@/pages/Roles/Create.vue';
import Roles from '@/pages/Roles/Roles.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../dashboard/Dashboard.vue';
import Layout from '../layout/Layout.vue';
import User from '@/pages/User.vue';
import Category from '@/pages/Category.vue';
import CreateCategory from '../categories/CreateCategory.vue';

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
			{
				path: '/categories',
				component: Category,
			},
			{
				path: '/categories/create',
				component: CreateCategory,
			},
			
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
