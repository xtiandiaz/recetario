import type { RawRecipe, Recipe } from "@/models/recipe";
import type { DataSheet } from "@/models/data-sheet";
import { refineRawIngredient } from "./ingredient.utils";
import { recipeTitle } from "./localization.utils";

export function refineRawRecipe(rawRecipe: RawRecipe, dataSheet: DataSheet): Recipe {
  const ingredients = rawRecipe
    .ingredients.map(ri => refineRawIngredient(ri, dataSheet))
    .sort((a, b) => a.title.localeCompare(b.title))
  
  return {
    category: rawRecipe.category,
    ingredients,
    instructions: rawRecipe.instructions,
    key: rawRecipe.key,
    origin: rawRecipe.origin,
    title: recipeTitle(rawRecipe.key)
  }
}
