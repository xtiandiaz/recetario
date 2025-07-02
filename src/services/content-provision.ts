import rawCatalog from '@/assets/json/catalog.json'
import type { Catalog, Category, CategoryKey } from "@/models/catalog";
import type { Recipe, RecipeKey } from '@/models/recipe';
import { categoryTitle, sectionTitle, recipeTitle, ingredientTitle } from '@/utils/localization.utils';

let catalog: Catalog | undefined = undefined

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
    const recipe = await (await fetch(`/recipes/${key}.json`)).json() as Recipe
    recipe.title = recipeTitle(recipe.key)
    
    recipe.ingredients.forEach(i => i.title = ingredientTitle(i.key))
    recipe.ingredients.sort((a, b) => a.title!.localeCompare(b.title!))
    
    return recipe
  } catch {
    console.error(key, 'Not found!')
    
    return undefined
  }
}
