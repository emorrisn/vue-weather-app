<template>
  <main>
    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Suspense>
        <WeatherData />

        <template #fallback>
          <div
            role="status"
            class="w-full space-y-8 border-gray-700 divide-y divide-gray-700 shadow animate-pulse"
          >
            <div class="flex items-center justify-between pt-4">
              <div>
                <div
                  class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                ></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-8">
              <div>
                <div
                  class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                ></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-8">
              <div>
                <div
                  class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                ></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-8">
              <div>
                <div
                  class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                ></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-8">
              <div>
                <div
                  class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                ></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import WeatherData from "@/components/WeatherData.vue";
</script>
