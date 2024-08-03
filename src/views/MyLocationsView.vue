<template>
  <main>
    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-col gap-2 mt-6">
        <SearchResult
          v-for="city in citiesStore.cities.value"
          :key="city.id"
          :place_name="city.name"
          :lat="city.lat"
          :lon="city.lon"
          :place_country="city.country"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { inject } from "vue";
import SearchResult from "@/components/search/SearchResult.vue";

const citiesStore = inject("citiesStore");

console.log(citiesStore.cities);
</script>
