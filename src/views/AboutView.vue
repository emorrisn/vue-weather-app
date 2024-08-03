<script setup></script>

<template>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
        About
      </h1>
      <p class="mt-2 text-xl leading-8 text-gray-300">
        This is a weather app where you can search and track places and get their weather
        information live.
      </p>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
        Why?
      </h1>
      <p class="mt-2 text-xl leading-8 text-gray-300">
        I made this app to brush up my Vue.js skills.
      </p>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
        How it works
      </h1>
      <p class="mt-2 text-xl leading-8 text-gray-300">
        Search a place using /search and click on the search result to get the weather
        information. If you would like to track the weather of a place, click on the track
        button. You can view the tracked locations using /locations page.
      </p>
      <h1 class="mt-6 text-2xl font-bold tracking-tight text-gray-100 sm:text-2xl">
        Removing a tracked location
      </h1>
      <p class="mt-2 text-xl leading-8 text-gray-300">
        To remove a tracked location, simply click on the remove button when viewing that
        location on the /locations page.
      </p>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
        Privacy & More
      </h1>
      <p class="mt-2 text-xl leading-8 text-gray-300">
        No requests are sent to any servers that I own, however, some responses may be
        stored in your browser cookies for a short period of time. Additionally, requests
        to the 3rd-party API (openweathermap.org/api) being used may be tracked. If you're
        truly and overly concerned about privacy then I recommend you to not use this app.
      </p>
    </div>
  </main>
</template>
