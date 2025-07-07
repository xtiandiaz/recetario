import rawCatalog from '@/assets/json/catalog.json'
import rawDataSheet from '@/assets/json/data-sheet.json'
import type { Catalog, Category, CategoryKey } from "@/models/catalog";
import type { DataSheet } from '@/models/data-sheet';
import type { RawRecipe, Recipe, RecipeKey } from '@/models/recipe';
import { categoryTitle, sectionTitle } from '@/utils/localization.utils';
import { refineRawRecipe } from '@/utils/recipe.utils';

const sourcePath = 'https://raw.githubusercontent.com/xtiandiaz/recetario/refs/heads/main/dist'

let catalog: Catalog | undefined = undefined
let dataSheet: DataSheet | undefined = undefined

export function getDataSheet(): DataSheet {
  if (dataSheet) {
    return dataSheet
  }
  
  dataSheet = rawDataSheet as DataSheet
  
  return dataSheet
}

export function getCatalog(): Catalog {
  if (catalog) {
    return catalog
  }
  
  catalog = rawCatalog as Catalog
  
  catalog.sections.forEach(s => {
    s.title = sectionTitle(s.key)
    
    s.categories.forEach(c => c.title = categoryTitle(c.key))
    s.categories.sort((a, b) => a.title!.localeCompare(b.title!))
  })
  
  return catalog
}

export function getCategory(key: CategoryKey): Category | undefined {
  return getCatalog().sections.flatMap(s => s.categories).find(c => c.key === key)
}

export async function getRecipe(key: RecipeKey): Promise<Recipe | undefined> {
  try {
    const rawRecipe = await (await fetch(`${sourcePath}/recipes/${key}.json`)).json() as RawRecipe
    
    return refineRawRecipe(rawRecipe, getDataSheet())
  } catch (e: unknown) {
    console.error(e)
    
    return undefined
  }
}
