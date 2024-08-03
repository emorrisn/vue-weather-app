<template>
  <div
    @click="viewLocation()"
    class="block w-full transition-colors ease-in-out border-b-2 border-gray-700 cursor-pointer hover:shadow-sm focus:outline-none group hover:border-gray-600"
  >
    <div class="relative flex items-center overflow-hidden">
      <div class="px-8 py-6 grow">
        <div class="flex flex-col justify-center">
          <h3
            class="text-xl font-semibold text-gray-300 transition-colors ease-in-out group-hover:text-gray-100"
          >
            {{ place_name }} {{ place_country }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  place_name: {
    type: String,
    default: "",
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  place_country: {
    type: String,
    default: "",
    required: false,
  },
});

const viewLocation = () => {
  console.log(props);
  const { lat, lon } = props;
  router.push({
    name: "location",
    params: { lat: lat, lon: lon },
  });
};
</script>
