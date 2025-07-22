import type { Catalog } from "@/models/catalog";
import type { DataSheet } from "@/models/data-sheet";
import type { Inventory } from "@/models/inventory";
import type { LocalizedRecipe, RawLocalizedContent } from "@/models/localization";
import type { RawRecipe } from '@/models/recipe';
import useContentStore from '@/stores/content'
import useSettingsStore from '@/stores/settings'
import { localizeCatalog, localizeRecipe, localizeInventory } from "./localization";
import { refineRawRecipe } from "@/utils/recipe.utils";
import { refineRawLocalizedContent } from "@/utils/localization.utils";
import { RecipeKey } from "@/assets/keys/catalog.keys";

const sourcePath = (import.meta.env.PROD 
  ? 'https://raw.githubusercontent.com/xtiandiaz/recetario/refs/heads/main/src/assets/json'
  : 'json')
  
async function fetchData<T>(path: string): Promise<T> {
  const response = await fetch(`${sourcePath}/${path}.json?salt=${Math.random()}`)
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
    content.dataSheet = await fetchData<DataSheet>('data-sheet')
  }
  
  if (!content.inventory) {
    content.inventory = localizeInventory(await fetchData<Inventory>('inventory'), content.localized)
  }
  
  if (!content.catalog) {
    const catalog = await fetchData<Catalog>('catalog')
    content.catalog = localizeCatalog(catalog)
  }
}

export async function fetchRecipe(key: RecipeKey): Promise<LocalizedRecipe | undefined> {
  await loadContent()
  
  const rawRecipe = await fetchData<RawRecipe>(`recipes/${key}`)
  const content = useContentStore()
  
  if (rawRecipe && content.inventory) {
    return localizeRecipe(refineRawRecipe(rawRecipe, content.inventory))
  }
  
  return undefined
}
