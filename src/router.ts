import { createVuetyRouter } from '@vueties/router/vuety-router'
import CatalogView from './views/CatalogView.vue'
import CategoryView from './views/CategoryView.vue'
import RecipeView from './views/RecipeView.vue'
import CalculatorView from './views/CalculatorView.vue'

export default createVuetyRouter([
  {
    component: CatalogView,
    path: '/'
  },
  {
    component: CategoryView,
    path: '/category/:categoryKey',
    props: true,
  },
  {
    component: RecipeView,
    path: '/recipe/:recipeKey',
    props: true,
  },
  {
    components: {
      modal: CalculatorView
    },
    path: '/calculator',
  }
])
