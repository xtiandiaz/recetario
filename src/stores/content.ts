import { defineStore } from "pinia";
import { ref } from 'vue'
import type { DataSheet } from "@/models/data-sheet";
import type { 
  LocalizedContent, 
  LocalizedCategory, 
  LocalizedCatalog, 
  LocalizedInventory,
  LocalizedRecipeSummary 
} from "@/models/localization";
import { CategoryKey, RecipeKey } from "@/assets/keys/catalog.keys";

export default defineStore('content', () => {
  const catalog = ref<LocalizedCatalog>()
  const dataSheet = ref<DataSheet>()
  const inventory = ref<LocalizedInventory>()
  const localized = ref<LocalizedContent>()
  
  function getLocalizedCategory(key: CategoryKey): LocalizedCategory | undefined {
    return catalog.value?.sections.flatMap(s => s.categories).find(c => c.key === key)
  }
  
  function getLocalizedRecipeSummary(key: RecipeKey): LocalizedRecipeSummary | undefined {
    return catalog.value?.sections
      .flatMap(s => s.categories)
      .flatMap(c => c.recipeSummaries)
      .find(rs => rs.key === key)
  }
  
  return {
    catalog,
    dataSheet,
    inventory,
    localized,
    
    getLocalizedCategory,
    getLocalizedRecipeSummary
  }
})
