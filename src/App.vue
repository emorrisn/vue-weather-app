<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-gray-900 text-white">
    <NavBar />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in"><component :is="Component" /> </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { provide } from "vue";

// Stores
import { useCitiesStore } from "./stores/cities";

// Components
import NavBar from "./components/NavBar.vue";

const citiesStore = useCitiesStore();
provide("citiesStore", citiesStore);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 150ms;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
