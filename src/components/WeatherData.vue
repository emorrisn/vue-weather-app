<template>
  <AddLocationBanner v-if="unsavedCity" :location="selectedLocation" />
  <section class="relative">
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
      <div class="space-y-5 max-w-4xl mx-auto text-center">
        <div
          class="flex items-center justify-center gap-x-2 text-7xl text-white font-extrabold mx-auto md:text-7xl"
        >
          <img
            class="size-32"
            :src="`https://openweathermap.org/img/wn/${weatherFormatted.location.weatherIcon}@2x.png`"
            alt=""
          />
          {{ Math.round(weatherFormatted.location.temp) }}°
        </div>
        <h2 class="text-4xl text-white font-bold mx-auto md:text-5xl capitalize">
          {{ weatherFormatted.location.title }}
        </h2>
        <p class="max-w-2xl mx-auto text-gray-400 text-xl font-semibold">
          {{ weatherFormatted.location.location }},
          {{ weatherFormatted.location.country }}
        </p>
      </div>
    </div>
    <div
      class="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
      style="
        background: linear-gradient(
          106.89deg,
          rgba(192, 132, 252, 0.11) 15.73%,
          rgba(14, 165, 233, 0.41) 15.74%,
          rgba(232, 121, 249, 0.26) 56.49%,
          rgba(79, 70, 229, 0.4) 115.91%
        );
      "
    ></div>
    <div
      class="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
      :style="bgStyle"
    ></div>
  </section>
  <section class="py-28 bg-gray-900">
    <div class="mx-auto px-4 md:px-8">
      <ul class="flex flex-col gap-4 items-center justify-center sm:flex-row">
        <li
          v-for="(item, idx) in weatherFormatted.stats"
          :key="idx"
          class="w-full text-center bg-gray-800 px-12 py-4 rounded-xl sm:w-auto"
        >
          <h4 class="text-4xl text-white font-semibold">{{ item.data }}</h4>
          <p class="mt-3 text-gray-400 font-medium">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </section>
  <section class="max-w-screen-xl mx-auto py-14 bg-gray-800 rounded-xl shadow mb-12">
    <div class="px-4 gap-12 md:flex md:px-8">
      <div class="flex-1">
        <div class="max-w-lg">
          <p class="mt-3 text-white text-4xl font-extrabold sm:text-4xl">
            More information
          </p>
          <h3 class="mt-6 font-semibold text-cyan-400">Local time</h3>
          <p class="mt-3 text-white text-3xl font-extrabold sm:text-4xl">
            {{ weatherFormatted.location.time }}
          </p>
        </div>
      </div>
      <div class="flex-1 mt-12 md:mt-0">
        <ul class="space-y-4 divide-y divide-gray-700">
          <li class="py-5" v-for="(item, index) in weatherFormatted.info" :key="index">
            <summary
              class="flex items-center justify-between font-semibold text-gray-200"
            >
              {{ item.q }}
            </summary>
            <p class="mt-3 text-gray-300 leading-relaxed">
              {{ item.a }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, computed, inject } from "vue";
import AddLocationBanner from "./locations/AddLocationBanner.vue";

const citiesStore = inject("citiesStore");
const route = useRoute();
const openweathermapAPIKey = "";

const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.params.lat}&lon=${route.params.lon}&appid=${openweathermapAPIKey}&units=metric`
    );

    const d = response.data;
    const locationResults = {
      temp: d.main.temp, // Celsius
      title: d.weather[0].main, // Weather title
      description: d.weather[0].description, // Weather description
      windSpeed: d.wind.speed, // m/s
      windDeg: d.wind.deg, // Wind direction in degrees
      humidity: d.main.humidity, // %
      pressure: d.main.pressure, // hPa
      sunrise: new Date(d.sys.sunrise * 1000).toLocaleString(),
      sunset: new Date(d.sys.sunset * 1000).toLocaleString(),
      time: new Date(d.dt * 1000).toLocaleString(),
      country: d.sys.country, // Country code
      placeName: d.name, // City name
      feelsLike: d.main.feels_like, // Celsius
      visibility: d.visibility, // meters
      weatherIcon: d.weather[0].icon,
      id: d.id,
    };

    return locationResults;
  } catch (error) {
    console.error(error);
  }
};

const locationData = ref({});
const weatherFormatted = ref({});
const selectedLocation = ref({});

const setWeatherValues = (data) => {
  weatherFormatted.value.stats = [
    { title: "Feels like", data: `${data.feelsLike}°` },
    { title: "Humidity", data: `${data.humidity}%` },
    { title: "Pressure", data: `${data.pressure}` },
    { title: "Wind Speed", data: `${data.windSpeed}` },
  ];
  weatherFormatted.value.location = {
    temp: data.temp,
    title: data.description,
    location: data.placeName,
    country: data.country,
    time: data.time,
    weatherIcon: data.weatherIcon,
  };
  weatherFormatted.value.info = [
    {
      q: `${data.visibility} meters`,
      a: "Visibility",
    },
    {
      q: `${data.sunrise}`,
      a: "Sunrise",
    },
    {
      q: `${data.sunset}`,
      a: "Sunset",
    },
    {
      q: `${data.windDeg}°`,
      a: "Wind direction",
    },
  ];
  selectedLocation.value = {
    lat: route.params.lat,
    lon: route.params.lon,
    name: data.placeName,
    country: data.country,
    id: data.id,
  };
};

locationData.value = await getWeatherData().then((data) => {
  // Set values
  setWeatherValues(data);

  // Update window title
  document.title = `${data.placeName} - ${data.temp}°C`;
});

const bgStyle = computed(() => {
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherFormatted.value.location.weatherIcon}@2x.png`;
  return {
    backgroundImage: `url(${weatherIconUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(125px)",
  };
});

const unsavedCity = computed(() => {
  return !citiesStore.isCityInStore(selectedLocation.value);
});
</script>
