<script setup>
import { useAuthStore } from '@/store/AuthStore';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginData = reactive({
	email: '',
	password: '',
});

const auth = useAuthStore();

const handleLogin = async () => {
	try {
		await auth.login(loginData)
		router.push('/dashboard')
	} catch (error) {
		console.error('Login failed', error)
	}
}


// const handleLogin = ()=>{
// 	api.post('/login',loginData)
// 	.then((result) => {
// 		console.log(result)
// 		router.push('/dashboard')
// 	}).catch((err) => {
		
// 	});
// }
</script>

<template>
	<div
		class="flex items-center justify-center min-h-screen backdrop-blur-sm bg-black/50 bg-image"
	>
		<div
			class="w-full max-w-md p-8 space-y-6 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-md"
		>
			<h2 class="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
			<p class="text-sm text-center text-gray-600">Login to your account</p>

			<form
				class="space-y-5"
				@submit.prevent="handleLogin"
			>
				<!-- Email -->
				<div>
					<label
						for="email"
						class="block text-sm font-medium text-gray-700"
						>Email address</label
					>
					<input
						type="email"
						id="email"
						name="email"
						v-model="loginData.email"
						required
						class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<!-- Password -->
				<div>
					<label
						for="password"
						class="block text-sm font-medium text-gray-700"
						>Password</label
					>
					<input
						type="password"
						id="password"
						name="password"
						v-model="loginData.password"
						required
						class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<!-- Remember & Forgot -->
				<div class="flex items-center justify-between">
					<label class="inline-flex items-center">
						<input
							type="checkbox"
							class="form-checkbox text-blue-600"
						/>
						<span class="ml-2 text-sm text-gray-600">Remember me</span>
					</label>
					<a
						href="#"
						class="text-sm text-blue-600 hover:underline"
						>Forgot password?</a
					>
				</div>

				<!-- Login Button -->
				<button
					type="submit"
					class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Sign In
				</button>
			</form>

			<!-- Divider -->
			<div class="flex items-center justify-center">
				<span class="text-gray-600 text-sm">Don’t have an account?</span>
				<a
					href="#"
					class="ml-2 text-blue-600 text-sm hover:underline"
					>Sign up</a
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bg-image {
	background-image: url('./image/loginbg.jpg');
	background-size: cover;
	background-position: center;
}
</style>
