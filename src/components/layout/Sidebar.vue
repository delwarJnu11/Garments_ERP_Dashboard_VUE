<script setup>
// import Accounts from "../moduleMenu/Accounts.vue";
import { LayoutDashboard } from "lucide-vue-next";
import { ref } from "vue";
import OrdersBuyers from "../moduleMenu/OrdersBuyers.vue";
import Production from "../moduleMenu/Production.vue";
import Users from "../moduleMenu/Users.vue";
import InventoryProducts from "../moduleMenu/InventoryProducts.vue";
import Accounts from "../moduleMenu/Accounts.vue";

const isSidebarOpen = ref(true);

// State to track which menu is open
const activeMenu = ref(null);

const toggleMenu = (menu) => {
  activeMenu.value = activeMenu.value === menu ? null : menu;
};
</script>
<template>
  <aside
    :class="isSidebarOpen ? 'w-64' : 'w-20'"
    class="bg-primary text-white shadow-md transition-all duration-300 ease-in-out w-64 h-screen overflow-y-auto"
  >
    <div class="flex items-center justify-between px-4 py-3">
      <h2 v-if="isSidebarOpen" class="text-xl font-semibold">Dashboard</h2>
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="p-2 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <nav class="mt-4">
      <ul class="space-y-2">
        <li>
          <RouterLink
            to="/dashboard"
            class="flex items-center gap-2 p-2 text-white hover:bg-gray-200 hover:text-black"
            ><LayoutDashboard :color="'currentColor'" class="w-5 h-5" />
            Dashboard</RouterLink
          >
        </li>

        <!-- User Management -->
        <Users :activeMenu="activeMenu" :toggleMenu="toggleMenu" />
        <!-- Production Management -->
        <Production :activeMenu="activeMenu" :toggleMenu="toggleMenu" />
        <!-- Orders & Buyers -->
        <OrdersBuyers :activeMenu="activeMenu" :toggleMenu="toggleMenu" />
        <!-- Inventory management -->
        <InventoryProducts :activeMenu="activeMenu" :toggleMenu="toggleMenu" />
        <!-- Account management -->
        <Accounts :activeMenu="activeMenu" :toggleMenu="toggleMenu" />
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* .slide-enter-active,
.slide-leave-active {
	transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
	overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
	max-height: 0;
	opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
	max-height: 500px;
	opacity: 1;
} */
/* Smooth Slide Animation */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  max-height: 200px;
  opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
