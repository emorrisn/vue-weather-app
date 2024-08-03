import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import AboutView from '@/views/AboutView.vue'
import LocationView from '@/views/LocationView.vue'
import MyLocationsView from '@/views/MyLocationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      meta: { title: 'Search' },
      component: SearchView
    },
    {
      path: '/locations',
      name: 'my-locations',
      meta: { title: 'My Locations' },
      component: () => MyLocationsView
    },
    {
      path: '/about',
      name: 'about',
      meta: { title: 'About' },
      component: () => AboutView
    },
    {
      path: '/location/:lat/:lon',
      name: 'location',
      meta: { title: 'Location' },
      component: () => LocationView
    }
  ]
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = 'Weather Tracker: ' + to.meta.title
  }
})

export default router
