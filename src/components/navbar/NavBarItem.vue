<template>
  <RouterLink
    v-if="props.linkable !== false"
    :to="{
      name: props.name,
    }"
    :class="[
      'rounded-xl px-3 py-2 text-sm font-medium flex gap-x-2 items-center',
      isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white transition ease-in-out',
    ]"
  >
    <slot></slot>
    {{ capitalize(props.name).replace(/-/g, " ") }}
  </RouterLink>
</template>

<script setup>
import { capitalize, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps(["name", "specific"]);
const route = useRoute();

const isActive = computed(() => route.name === props.name);
</script>
