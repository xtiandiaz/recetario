import type { RouteRecordRaw } from 'vue-router'
import { createVuetyRouter } from '@vueties/router/vuety-router'
import CatalogView from './views/CatalogView.vue'
import CategoryView from './views/CategoryView.vue'
import RecipeView from './views/RecipeView.vue'
import InventoryView from './views/InventoryView.vue'
import IngredientView from './views/IngredientView.vue'

function produceCommonChildren(parentPath: string): RouteRecordRaw[] {
  return [
    {
      path: `${parentPath}/inventory`,
      components: {
        modal: InventoryView
      }
    },
    {
      path: `${parentPath}/inventory/:ingredientKey`,
      components: {
        modal: IngredientView
      },
      props: true
    }
  ]
}

export default createVuetyRouter([
  {
    path: '/',
    component: CatalogView,
    children: produceCommonChildren('/')
  },
  {
    path: '/category/:categoryKey',
    component: CategoryView,
    props: true,
    children: produceCommonChildren('/category/:categoryKey')
  },
  {
    path: '/recipe/:recipeKey',
    component: RecipeView,
    props: true,
    children: produceCommonChildren('/recipe/:recipeKey')
  }
])
