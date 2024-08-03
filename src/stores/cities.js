// cities.js
import { ref, watch } from 'vue'

const cities = ref(loadCitiesFromLocalStorage())

function loadCitiesFromLocalStorage() {
  const storedCities = localStorage.getItem('cities')
  return storedCities ? JSON.parse(storedCities) : []
}

function saveCitiesToLocalStorage() {
  localStorage.setItem('cities', JSON.stringify(cities.value))
}

watch(cities, saveCitiesToLocalStorage, { deep: true })

function isCityInStore(city) {
  return cities.value.some(
    (storedCity) =>
      storedCity.lat === city.lat &&
      storedCity.lon === city.lon &&
      storedCity.name === city.name &&
      storedCity.country === city.country
  )
}

export function useCitiesStore() {
  return {
    cities,
    isCityInStore
  }
}
