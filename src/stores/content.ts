import { defineStore } from "pinia";
import { ref } from 'vue'
import type { Inventory } from "@/models/inventory";
import type { DataSheet } from "@/models/data-sheet";
import type { Catalog, Category } from "@/models/catalog";
import type { RecipeSummary } from "@/models/recipe";
import type { LocalizedContent } from "@/models/localization";
import { CategoryKey, RecipeKey } from "@/assets/types/catalog.types";

export default defineStore('content', () => {
  const catalog = ref<Catalog>()
  const dataSheet = ref<DataSheet>()
  const inventory = ref<Inventory>()
  const localized = ref<LocalizedContent>()
  
  function getCategory(key: CategoryKey): Category | undefined {
    return catalog.value?.sections.flatMap(s => s.categories).find(c => c.key === key)
  }
  
  function getRecipeSummary(key: RecipeKey): RecipeSummary | undefined {
    return catalog.value?.sections.flatMap(s => s.categories.flatMap(c => c.recipes)).find(r => r.key === key)
  }
  
  return {
    catalog,
    dataSheet,
    inventory,
    localized,
    
    getCategory,
    getRecipeSummary,
  }
})
