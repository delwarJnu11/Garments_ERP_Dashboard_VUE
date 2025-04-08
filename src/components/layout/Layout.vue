<script setup>
import { RouterView } from 'vue-router';
import Footer from './Footer.vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
</script>

<template>
	<div class="flex bg-gray-100 h-screen">
		<Sidebar />

		<div class="flex flex-col flex-1">
			<Header />

			<main class="flex-1 p-6 h-screen overflow-y-auto">
				<RouterView />
			</main>

			<Footer />
		</div>
	</div>
</template>

<style scoped></style>
