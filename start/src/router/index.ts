import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/search',
      name: 'search',
      children: [
        {
          path: 'index',
          name: 'search_index',
          component: () => import('@/views/search/index.vue')
        }
      ]
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/index.vue')
    }
  ]
})

export default router
