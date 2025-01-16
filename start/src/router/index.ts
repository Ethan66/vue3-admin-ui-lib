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
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/views/form/index.vue')
    },
    {
      path: '/scss',
      name: 'scss',
      component: () => import('@/views/demo/css-lib/index.vue')
    },
    {
      path: '/less',
      name: 'less',
      component: () => import('@/views/demo/css-lib/less.vue')
    }
  ]
})

export default router
