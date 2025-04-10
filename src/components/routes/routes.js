import Login from '@/pages/Auth/Login.vue';
import Category from '@/pages/Category.vue';
import Create from '@/pages/Roles/Create.vue';
import Roles from '@/pages/Roles/Roles.vue';
import User from '@/pages/User.vue';
import { createRouter, createWebHistory } from 'vue-router';
import CreateCategory from '../categories/CreateCategory.vue';
import UpdateCategory from '../categories/UpdateCategory.vue';
import Dashboard from '../dashboard/Dashboard.vue';
import Layout from '../layout/Layout.vue';
import OrderCreate from '../Order/OrderCreate.vue';

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
			{
				path: '/categories/edit/:id',
				component: UpdateCategory,
			},
			{
				path: '/order/create',
				component: OrderCreate,
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
