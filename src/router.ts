import { createRouter, createWebHashHistory } from 'vue-router'
import { ref, type Ref } from 'vue'
import CatalogView from './views/CatalogView.vue'
import CategoryView from './views/CategoryView.vue'
import RecipeView from './views/RecipeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: Ref<string | undefined>
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: CatalogView
    },
    {
      path: '/category/:cKey',
      component: CategoryView,
      props: true,
    },
    {
      path: '/recipe/:rKey',
      component: RecipeView,
      props: true,
    }
  ]
})

router.getRoutes().forEach(r => {
  r.meta.title = ref<string>()
})

export default router
