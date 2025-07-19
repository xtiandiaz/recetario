import type { Inventory } from "@/models/inventory";
import type { RawRecipeIngredient, RecipeIngredient, RawRecipe, Recipe } from "@/models/recipe";
import { parseMeasurement } from "./measurement.utils";
import { IngredientCut, type TemperatureEstimate } from "@/assets/keys/data-sheet.keys";
import '@/assets/tungsten/extensions/map.extensions'
import { Icon } from "@/assets/design-tokens/iconography";

export const ingredientCutIcon = (cut: IngredientCut): Icon => {
  switch(cut) {
    case IngredientCut.Diced:
      return Icon.Dice
    case IngredientCut.FinelyChopped:
    case IngredientCut.FinelyDiced:
    case IngredientCut.Minced:
      return Icon.Brunoise
    case IngredientCut.IntoWedges:
      return Icon.Wedges
    case IngredientCut.Julienned:
    case IngredientCut.IntoStrips:
      return Icon.Julienne
    case IngredientCut.RoundSliced:
      return Icon.RoundSlices
    case IngredientCut.Sliced:
      return Icon.Slices 
  }
}

export function refineRawRecipeIngredient(
  rawRecipeIngredient: RawRecipeIngredient, 
  inventory: Inventory,
): RecipeIngredient {
  const amount = parseMeasurement(rawRecipeIngredient.amount)
  const ingredient = inventory.ingredients.find(i => i.key === rawRecipeIngredient.key)
  
  const rawTemperature = rawRecipeIngredient.temperature
  const temperature = rawTemperature ? (parseMeasurement(rawTemperature) ?? rawTemperature as TemperatureEstimate) : undefined
  
  return {
    ...ingredient,
    amount,
    cut: rawRecipeIngredient.cut,
    key: rawRecipeIngredient.key,
    note: rawRecipeIngredient.note ? Map.fromObject(rawRecipeIngredient.note) : undefined,
    optional: rawRecipeIngredient.optional === true,
    temperature
  }
}

export function refineRawRecipe(rawRecipe: RawRecipe, inventory: Inventory): Recipe {
  return {
    category: rawRecipe.category,
    ingredients: rawRecipe.ingredients.map(ri => refineRawRecipeIngredient(ri, inventory)),
    instructions: Map.fromObject(rawRecipe.instructions),
    key: rawRecipe.key,
    origin: rawRecipe.origin,
    portions: rawRecipe.portions
  }
}
