import { createVuetyRouter } from '@vueties/router/vuety-router'
import CatalogView from './views/CatalogView.vue'
import CategoryView from './views/CategoryView.vue'
import RecipeView from './views/RecipeView.vue'
import CalculatorView from './views/CalculatorView.vue'

export default createVuetyRouter([
  {
    path: '/',
    components: {
      main: CatalogView
    },
    children: [
      {
        path: '/calculator',
        components: {
          modal: CalculatorView
        },
      }
    ]
  },
  {
    path: '/category/:categoryKey',
    components: {
      main: CategoryView
    },
    props: true,
    children: [
      {
        path: '/category/:categoryKey/calculator',
        components: {
          modal: CalculatorView
        },
      }
    ]
  },
  {
    path: '/recipe/:recipeKey',
    components: {
      main: RecipeView
    },
    props: true,
    children: [
      {
        path: '/recipe/:recipeKey/calculator',
        components: {
          modal: CalculatorView
      },
      }
    ]
  }
])
