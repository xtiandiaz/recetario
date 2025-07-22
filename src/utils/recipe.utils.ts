import type { RawRecipeIngredient, RecipeIngredient, RawRecipe, Recipe } from "@/models/recipe";
import type { LocalizedInventory } from "@/models/localization";
import { parseMeasurement } from "./measurement.utils";
import { IngredientCut, type TemperatureEstimate } from "@/assets/keys/data-sheet.keys";
import '@/assets/tungsten/extensions/map.extensions'
import { Icon } from "@/assets/design-tokens/iconography";

export const ingredientCutIcon = (cut: IngredientCut): Icon => {
  switch(cut) {
    case IngredientCut.Chopped:
    case IngredientCut.Diced:
      return Icon.Dice
    case IngredientCut.FinelyChopped:
    case IngredientCut.Grated:
    case IngredientCut.Ground:
    case IngredientCut.Minced:
      return Icon.Brunoise
    case IngredientCut.FinelyDiced:
      return Icon.SmallDice
    case IngredientCut.IntoSmallWedges:
    case IngredientCut.IntoWedges:
      return Icon.Wedges
    case IngredientCut.Julienned:
    case IngredientCut.IntoStrips:
      return Icon.Julienne
    case IngredientCut.RoundSliced:
      return Icon.RoundSlices
    case IngredientCut.HalfRoundSliced:
      return Icon.HalfRoundSlices
    case IngredientCut.Sliced:
      return Icon.Slices 
  }
}

export function refineRawRecipeIngredient(
  rawRecipeIngredient: RawRecipeIngredient, 
  inventory: LocalizedInventory,
): RecipeIngredient {
  const amount = rawRecipeIngredient.amount ? parseMeasurement(rawRecipeIngredient.amount) : undefined
  const ingredient = inventory.localizedIngredients.find(i => i.key === rawRecipeIngredient.key)
  
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

export function refineRawRecipe(rawRecipe: RawRecipe, inventory: LocalizedInventory): Recipe {
  return {
    key: rawRecipe.key,
    category: rawRecipe.category,
    description: rawRecipe.description ? Map.fromObject(rawRecipe.description) : undefined,
    ingredients: rawRecipe.ingredients.map(ri => refineRawRecipeIngredient(ri, inventory)),
    instructions: Map.fromObject(rawRecipe.instructions),
    origin: rawRecipe.origin,
    portions: rawRecipe.portions
  }
}
