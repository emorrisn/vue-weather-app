<template>
  <main>
    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative pt-2 mx-auto text-gray-600">
        <input
          v-model="locationSearch"
          class="w-full h-12 px-5 pr-16 text-sm text-gray-100 transition-colors ease-in-out bg-gray-800 border-2 border-gray-900 shadow focus:shadow-xl focus:bg-gray-700/50 rounded-xl focus:outline-none"
          type="search"
          name="search"
          @input="getSearchResults"
          placeholder="Search Locations..."
        />
        <button type="submit" class="absolute top-0 right-0 mt-5 mr-4 text-gray-500">
          <Transition name="fade">
            <template v-if="locationLoading">
              <svg
                class="animate-spin size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </template>

            <template v-else-if="!locationLoading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </template>
          </Transition>
        </button>
      </div>
      <div class="flex flex-col gap-2 mt-6">
        <p v-if="maptilerError">Sorry, something went wrong. Try again later?</p>
        <SearchResult
          v-for="result in maptilerResults"
          :key="result.id"
          :place_name="result.place_name"
          :lat="result.center[1]"
          :lon="result.center[0]"
        />
        <Transition name="fade">
          <EmptySearch
            v-if="
              locationSearch.value !== '' &&
              maptilerResults.length === 0 &&
              !locationLoading
            "
          />
          <LoadingSkeleton v-else-if="locationLoading && maptilerResults.length === 0" />
        </Transition>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import EmptySearch from "@/components/search/EmptySearch.vue";
import SearchResult from "@/components/search/SearchResult.vue";
import LoadingSkeleton from "@/components/search/LoadingSkeleton.vue";

const mapilerAPIKey = "";

const locationSearch = ref("");
const locationSearchTimeout = ref(null);
const locationLoading = ref(false);

const maptilerResults = ref([]);
const maptilerError = ref(null);

const getSearchResults = () => {
  clearTimeout(locationSearchTimeout.value);
  locationLoading.value = true;
  maptilerError.value = null;
  maptilerResults.value = [];

  locationSearchTimeout.value = setTimeout(async () => {
    // Call the API to get the search results
    if (locationSearch.value.length > 3 && locationSearch.value !== "") {
      try {
        const result = await axios.get(
          `https://api.maptiler.com/geocoding/${locationSearch.value}.json?key=${mapilerAPIKey}&types=place`
        );
        maptilerResults.value = result.data.features;
        console.log(result.data.features);
      } catch (error) {
        console.error(error);
        maptilerError.value = error;
      }
      locationLoading.value = false;
      return;
    }
    locationLoading.value = false;
  }, 500);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.fade-enter-from {
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.fade-leave-to {
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
