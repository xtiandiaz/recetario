import type { Catalog } from "@/models/catalog";
import type { RawDataSheet } from "@/models/data-sheet";
import type { RawInventory } from "@/models/inventory";
import { type RawLocalizedContent } from "@/models/localization";
import type { RawRecipe, Recipe } from '@/models/recipe';
import useContentStore from '@/stores/content'
import useSettingsStore from '@/stores/settings'
import { localizeCatalog } from "./localization";
import { refineRawInventory } from "@/utils/inventory.utils";
import { refineRawRecipe } from "@/utils/recipe.utils";
import { refineRawLocalizedContent as refineRawLocalizedContent } from "@/utils/localization.utils";
import { refineRawDataSheet } from "@/utils/data-sheet.utils";
import { RecipeKey } from "@/assets/types/catalog.types";

const sourcePath = (import.meta.env.PROD 
  ? 'https://raw.githubusercontent.com/xtiandiaz/recetario/refs/heads/main/src/assets/json'
  : 'json')
  
async function fetchData<T>(path: string): Promise<T> {
  const response = await fetch(`${sourcePath}/${path}.json`)
  // console.log(path, response.status, response.statusText, response)
  
  return await response.json() as T
}

export async function loadContent() {
  const content = useContentStore()
  
  if (!content.localized) {
    const settings = useSettingsStore()
    const rawLocalizedContent = await fetchData<RawLocalizedContent>(
      `localized-content/${settings.currentLanguage}`
    )
    content.localized = refineRawLocalizedContent(rawLocalizedContent, settings.currentLanguage)
  }
  
  if (!content.dataSheet) {
    const rawDataSheet = await fetchData<RawDataSheet>('data-sheet')
    content.dataSheet = refineRawDataSheet(rawDataSheet, content.localized)
  }
  
  if (!content.inventory) {
    const rawInventory = await fetchData<RawInventory>('inventory')
    content.inventory = refineRawInventory(rawInventory, content.dataSheet)
  }
  
  if (!content.catalog) {
    const catalog = await fetchData<Catalog>('catalog')
    content.catalog = localizeCatalog(catalog)
  }
}

export async function fetchRecipe(key: RecipeKey): Promise<Recipe | undefined> {
  await loadContent()
  
  const rawRecipe = await fetchData<RawRecipe>(`recipes/${key}`)
  const content = useContentStore()
  
  if (rawRecipe && content.inventory) {
    return refineRawRecipe(rawRecipe, content.inventory)
  }
  
  return undefined
}
