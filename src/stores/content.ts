import { defineStore } from "pinia";
import { ref } from 'vue'
import type { Inventory } from "@/models/inventory";
import type { DataSheet } from "@/models/data-sheet";
import type { LocalizedContent, LocalizedCategory, LocalizedCatalog } from "@/models/localization";
import { CategoryKey } from "@/assets/types/catalog.types";

export default defineStore('content', () => {
  const catalog = ref<LocalizedCatalog>()
  const dataSheet = ref<DataSheet>()
  const inventory = ref<Inventory>()
  const localized = ref<LocalizedContent>()
  
  function getLocalizedCategory(key: CategoryKey): LocalizedCategory | undefined {
    return catalog.value?.sections.flatMap(s => s.categories).find(c => c.key === key)
  }
  
  return {
    catalog,
    dataSheet,
    inventory,
    localized,
    
    getLocalizedCategory
  }
})
