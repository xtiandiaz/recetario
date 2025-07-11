import { defineStore } from "pinia";
import { ref } from 'vue'
import type { Catalog, Category, CategoryKey } from "@/models/catalog";
import type { RecipeKey, RecipeSummary } from "@/models/recipe";

export default defineStore('session', () => {
  const catalog = ref<Catalog>()
  
  function getCategory(key: CategoryKey): Category | undefined {
    return catalog.value?.sections.flatMap(s => s.categories).find(c => c.key === key)
  }
  
  function getRecipeSummary(key: RecipeKey): RecipeSummary | undefined {
    return catalog.value?.sections.flatMap(s => s.categories.flatMap(c => c.recipes)).find(r => r.key === key)
  }
  
  return {
    catalog,
    
    getCategory,
    getRecipeSummary,
  }
})
