import Login from '@/pages/Auth/Login.vue';
import Create from '@/pages/Roles/Create.vue';
import Roles from '@/pages/Roles/Roles.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../dashboard/Dashboard.vue';
import Layout from '../layout/Layout.vue';
import BalanceSheet from '../modules/accounts/reports/BalanceSheet.vue';
import COA from '../modules/accounts/reports/COA.vue';
import IncomeStatement from '../modules/accounts/reports/IncomeStatement.vue';
import Ledger from '../modules/accounts/reports/Ledger.vue';
import Journals from '../modules/accounts/reports/Journals.vue';
import Transactions from '../modules/accounts/transactions/Transactions.vue';
import CreateTransaction from '../modules/accounts/transactions/CreateTransaction.vue';
import Accounts from '../modules/accounts/account/Accounts.vue';
import CreateAccount from '../modules/accounts/account/CreateAccount.vue';
import AccountGroups from '../modules/accounts/accountGroup/AccountGroups.vue';
import CreateAccountGroup from '../modules/accounts/accountGroup/CreateAccountGroup.vue';
import VueCrud from '../modules/accounts/vueCrud/VueCrud.vue';
import CreateVueCrud from '../modules/accounts/vueCrud/CreateVueCrud.vue';
import User from '@/pages/User.vue';
import Category from '@/pages/Category.vue';
import CreateCategory from '../categories/CreateCategory.vue';
import UpdateCategory from '../categories/UpdateCategory.vue';
import UserList from '../users/UserList.vue';
import CreateUser from '../users/CreateUser.vue';

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


			// Account Module Menu
			{
				path: '/accounts/transactions',
				component: Transactions,
			},
			{
				path: '/accounts/transactions/create',
				component: CreateTransaction,
			},
			{
				path: '/accounts/Accounts',
				component: Accounts,
			},
			{
				path: '/accounts/Accounts/create',
				component: CreateAccount,
			},
			{
				path: '/accounts/accountGroups',
				component: AccountGroups,
			},
			{
				path: '/accounts/AccountGroup/create',
				component: CreateAccountGroup,
			},

			// Account Module Reports
			{
				path: '/accounts/balanceSheet',
				component: BalanceSheet,
			},
			{
				path: '/accounts/COA',
				component: COA,
			},
			{
				path: '/accounts/IncomeStatement',
				component: IncomeStatement,
			},
			{
				path: '/accounts/Ledger',
				component: Ledger,
			},
			{
				path: '/accounts/journals',
				component: Journals,
			},
			{
				path: '/vueCrud',
				component: VueCrud,
			},
			{
				path: '/vueCrud/create',
				component: CreateVueCrud,
			},
			{
				path: '/vueCrud/update/:id',
				component: CreateVueCrud,
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
				path: '/users/create',
				component: CreateUser,
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
			
			
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
