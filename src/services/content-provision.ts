import type { RawCatalog, Catalog } from "@/models/catalog";
import type { RawRecipe, Recipe, RecipeKey } from '@/models/recipe';
import useSessionStore from '@/stores/session'
import { refineRawCatalog, refineRawRecipe } from '@/utils/catalog.utils';

const sourcePath = (import.meta.env.PROD 
  ? 'https://raw.githubusercontent.com/xtiandiaz/recetario/refs/heads/main/src/assets/json'
  : 'json')

let catalog: Catalog | undefined = undefined

async function loadFile<T>(path: string): Promise<T | undefined> {
  try {
    const response = await fetch(`${sourcePath}/${path}.json`)
    // console.log(path, response.status, response.statusText, response)
    
    return await response.json() as T
  } catch (e: unknown) {
    console.error(e)
    
    return undefined
  }
}

async function getCatalog(): Promise<Catalog | undefined> {
  if (catalog) {
    return catalog
  }
  
  const rawCatalog = await loadFile<RawCatalog>(`catalog`)
  if (rawCatalog) {
    catalog = refineRawCatalog(rawCatalog)
    return catalog
  }
  
  return undefined
}

export async function loadCatalog() {
  const session = useSessionStore()
  
  session.catalog = await getCatalog()
}

export async function getRecipe(key: RecipeKey): Promise<Recipe | undefined> {
  const rawRecipe = await loadFile<RawRecipe>(`recipes/${key}`)
  const dataSheet = (await getCatalog())?.dataSheet
  if (rawRecipe && dataSheet) {
    return refineRawRecipe(rawRecipe, dataSheet)
  }
  
  return undefined
}
