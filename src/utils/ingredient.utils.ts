import { DensityKey } from "@/models/data-sheet"
import { IngredientKey, Consistency } from "@/models/ingredient"
import type { RawIngredient, Ingredient } from "@/models/ingredient";
import type { Measurement } from "@/models/measurement";
import type { DataSheet } from "@/models/data-sheet";
import { ingredientTitle } from "./localization.utils";
import { decodeMeasurementString, convertCustomaryVolumeOrWeight, consistencyPreciseUnits } from "./measurement.utils";

export const ingredientDensityKey = (ingredientKey: IngredientKey): DensityKey | undefined => {
  switch (ingredientKey) {
    case IngredientKey.AllPurposeWheatFlour:
    case IngredientKey.StrongWheatFlour:
    case IngredientKey.WholeRyeFlour:
    case IngredientKey.WholeWheatFlour:
      return DensityKey.Flour
    case IngredientKey.ActiveDryYeast:
      return DensityKey.GranulatedYeast
    case IngredientKey.GranulatedSalt:
      return DensityKey.GranulatedSalt
    case IngredientKey.GranulatedSugar:
      return DensityKey.GranulatedSugar
    case IngredientKey.OliveOil:
      return DensityKey.OliveOil
    case IngredientKey.WholeMilk:
    case IngredientKey.Water:
      return DensityKey.Water
    default:
      return undefined
  }
}

const ingredientConsistency = (ingredientKey: IngredientKey): Consistency | undefined => {
  switch (ingredientKey) {
    case IngredientKey.AllPurposeWheatFlour:
    case IngredientKey.StrongWheatFlour:
    case IngredientKey.WholeRyeFlour:
    case IngredientKey.WholeWheatFlour:
      return Consistency.Powder
    case IngredientKey.ActiveDryYeast:
    case IngredientKey.GranulatedSalt:
    case IngredientKey.GranulatedSugar:
      return Consistency.Granulated
    case IngredientKey.OliveOil:
      return Consistency.Viscous
    case IngredientKey.WholeMilk:
    case IngredientKey.Water:
      return Consistency.Liquid
    default:
      return undefined
  }
}

export function refineRawIngredient(rawIngredient: RawIngredient, dataSheet: DataSheet): Ingredient {
  const amount = decodeMeasurementString(rawIngredient.amount)
  
  const densityKey = ingredientDensityKey(rawIngredient.key)
  const density = dataSheet.densities.find(d => d.key == densityKey)
  const temperature = rawIngredient.temperature 
    ? decodeMeasurementString(rawIngredient.temperature) 
    : undefined
  
  return {
    amount,
    consistency: ingredientConsistency(rawIngredient.key),
    density,
    key: rawIngredient.key,
    temperature,
    title: ingredientTitle(rawIngredient.key)
  }
}

export function calculateAmountWeightOrVolumeEquivalent(ingredient: Ingredient): Measurement | undefined {
  if (!ingredient.density || !ingredient.consistency) {
    console.log('Undefined density or consistency for ingredient:', ingredient)
    return undefined
  }
  const altUnits = consistencyPreciseUnits(ingredient.consistency)
  const equivalenceUnit = altUnits.find(u => u !== ingredient.amount.unit)
  if (!equivalenceUnit) {
    console.log('Undefined equivalence Unit for ingredient:', ingredient)
    return undefined
  }
  
  return convertCustomaryVolumeOrWeight(ingredient.amount, ingredient.density, equivalenceUnit)
}
