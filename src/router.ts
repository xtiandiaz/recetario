import { createRouter, createWebHashHistory } from 'vue-router'
import CatalogView from './views/CatalogView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: CatalogView
    }
  ]
})
