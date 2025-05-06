import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Auth/Login.vue';
import Category from '@/pages/Category.vue';
import Create from '@/pages/Roles/Create.vue';
import Roles from '@/pages/Roles/Roles.vue';
import User from '@/pages/User.vue';
import CreateCategory from '../categories/CreateCategory.vue';
import UpdateCategory from '../categories/UpdateCategory.vue';
import Dashboard from '../dashboard/Dashboard.vue';
import Layout from '../layout/Layout.vue';
import OrderCreate from '../Order/OrderCreate.vue';
import CreateUser from '../users/CreateUser.vue';
import UpdateUser from '../users/UpdateUser.vue';
import ProductList from '../products/ProductList.vue';
import { useAuthStore } from '@/store/AuthStore';
import CreateProduct from '../products/CreateProduct.vue';
import Suppliers from '../suppliers/Suppliers.vue';
import CreatePurchaseInvoice from '../purchaseInvoice/CreatePurchaseInvoice.vue';
import PurchaseInvoice from '../purchaseInvoice/PurchaseInvoice.vue';
import ShowInvoice from '../purchaseInvoice/ShowInvoice.vue';


const routes = [
	{
	  path: '/',
	  redirect: '/login',
	},
	{
	  path: '/login',
	  component: Login,
	  meta: { public: true },
	},
	{
	  path: '/dashboard',
	  component: Layout,
	  children: [
		{ path: '', component: Dashboard },
		{ path: '/roles', component: Roles },
		{ path: '/roles/create', component: Create },
		{ path: '/users', component: User },
		{ path: '/users/create', component: CreateUser },
		{ path: '/users/edit/:id', component: UpdateUser },
		{ path: '/categories', component: Category },
		{ path: '/categories/create', component: CreateCategory },
		{ path: '/categories/edit/:id', component: UpdateCategory },
		{ path: '/order/create', component: OrderCreate },
		{ path: '/products', component: ProductList },
		{ path: '/products/create', component: CreateProduct },
		{ path: '/suppliers', component: Suppliers },
		{path:'/purchaseInvoice',component:PurchaseInvoice},
		{path:'/createInvoice',component:CreatePurchaseInvoice},
		{path:'/purchaseInvoice/show/:id',component:ShowInvoice},
	  ],
	},
  ];
  
  

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
	const auth = useAuthStore();
  
	// If trying to access login page while already logged in
	if (to.meta.public && to.path === '/login' && auth.token) {
	  return next('/dashboard');
	}
  
	// If not public and no token
	if (!to.meta.public && !auth.token) {
	  return next('/login');
	}
  
	next();
  });
  

// router.beforeEach((to, from, next) => {
// 	const auth = useAuthStore();
// 	if (!to.meta.public && !auth.token) {
// 	  return next('/');
// 	}
// 	next();
//   });
