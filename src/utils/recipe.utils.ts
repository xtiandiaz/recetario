import type { Measurement } from "@/models/measurement";
import type { Inventory } from "@/models/inventory";
import type { RawRecipeIngredient, RecipeIngredient, RawRecipe, Recipe } from "@/models/recipe";
import { parseMeasurement } from "./measurement.utils";
import type { TemperatureEstimate } from "@/assets/types/data-sheet.types";
import '@/assets/tungsten/extensions/map.extensions'

export function refineRawRecipeIngredient(
  rawRecipeIngredient: RawRecipeIngredient, 
  inventory: Inventory,
): RecipeIngredient {
  const amount = parseMeasurement(rawRecipeIngredient.amount)
  const ingredient = inventory.ingredients.find(i => i.key === rawRecipeIngredient.key)
  
  const rawTemperature = rawRecipeIngredient.temperature
  const temperature = rawTemperature ? (parseMeasurement(rawTemperature) ?? rawTemperature as TemperatureEstimate) : undefined
  
  return {
    amount,
    consistency: ingredient?.consistency,
    density: ingredient?.density,
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
  }
}

export function calculateAmountWeightOrVolumeEquivalent(ingredient: RecipeIngredient): Measurement | undefined {  
  // if (!ingredient.density || !ingredient.consistency) {
  //   console.warn('Undefined density or consistency for ingredient:', ingredient.key)
    return undefined
  // }
  
  // const altUnits = ingredient.consistency.preciseUnits
  // const equivalenceUnit = altUnits.find(au => au.key !== ingredient.amount.unit.key)
  // if (!equivalenceUnit) {
  //   console.warn('Undefined equivalence Unit for ingredient:', ingredient.key)
  //   return undefined
  // }
  
  // return convertCustomaryVolumeOrWeight(ingredient.amount, ingredient.density, equivalenceUnit)
}
