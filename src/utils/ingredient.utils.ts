import { DensityKey } from "@/models/catalog"
import type { DataSheet } from "@/models/catalog";
import { IngredientKey, Consistency } from "@/models/ingredient"
import type { RawIngredient, Ingredient } from "@/models/ingredient";
import type { Measurement } from "@/models/measurement";
import { ingredientTitle } from "./localization.utils";
import { 
  consistencyPreciseUnits, 
  convertCustomaryVolumeOrWeight, 
  decodeMeasurementString, 
  decodeTemperatureMeasurementString
} from "./measurement.utils";
import { enumKeyFromValue } from "@/assets/tungsten/enum";

export const ingredientDensityKey = (ingredientKey: IngredientKey): DensityKey | undefined => {
  const analogous = enumKeyFromValue(DensityKey, ingredientKey as string)
  if (analogous) {
    return analogous
  }
  
  switch (ingredientKey) {
    case IngredientKey.AllPurposeWheatFlour:
    case IngredientKey.StrongWheatFlour:
    case IngredientKey.WholeRyeFlour:
    case IngredientKey.WholeWheatFlour:
      return DensityKey.Flour
    case IngredientKey.ActiveDryYeast:
      return DensityKey.GranulatedYeast
    case IngredientKey.WholeMilk:
      return DensityKey.Water
    default:
      return undefined
  }
}

const ingredientConsistency = (ingredientKey: IngredientKey): Consistency | undefined => {
  switch (ingredientKey) {
    case IngredientKey.AllPurposeWheatFlour:
    case IngredientKey.BakingSoda:
    case IngredientKey.CornStarch:
    case IngredientKey.StrongWheatFlour:
    case IngredientKey.WholeRyeFlour:
    case IngredientKey.WholeWheatFlour:
      return Consistency.Powder
    
    case IngredientKey.ActiveDryYeast:
    case IngredientKey.GranulatedSalt:
    case IngredientKey.GranulatedSugar:
      return Consistency.Granulated
    
    case IngredientKey.CoconutOil:
      return Consistency.SemiSolid
    
    case IngredientKey.EssentialOil:
    case IngredientKey.Honey:
    case IngredientKey.OliveOil:
      return Consistency.Viscous
    
    case IngredientKey.CarrierOil:
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
    ? decodeTemperatureMeasurementString(rawIngredient.temperature) 
    : undefined
  
  return {
    amount,
    consistency: ingredientConsistency(rawIngredient.key),
    density,
    extras: rawIngredient.extras,
    key: rawIngredient.key,
    temperature,
    title: ingredientTitle(rawIngredient.key)
  }
}

export function calculateAmountWeightOrVolumeEquivalent(ingredient: Ingredient): Measurement | undefined {  
  if (!ingredient.density || !ingredient.consistency) {
    console.warn('Undefined density or consistency for ingredient:', ingredient.key)
    return undefined
  }
  const altUnits = consistencyPreciseUnits(ingredient.consistency)
  const equivalenceUnit = altUnits.find(u => u !== ingredient.amount.unit)
  if (!equivalenceUnit) {
    console.warn('Undefined equivalence Unit for ingredient:', ingredient.key)
    return undefined
  }
  
  return convertCustomaryVolumeOrWeight(ingredient.amount, ingredient.density, equivalenceUnit)
}
