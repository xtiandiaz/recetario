import type { Measurement } from "@/models/measurement"
import { Quantity } from "@/models/measurement"
import type { Ingredient } from "@/models/inventory";
import useContentStore from '@/stores/content'
import { Consistency, Unit } from "@/assets/types/data-sheet.types";
import { measurementRegExp } from "@/assets/reg-exps";
import { clamp } from "@/assets/tungsten/math";
import '@/assets/tungsten/extensions/string.extensions'
import { Icon } from '@design-tokens/iconography'
import type { RecipeIngredient } from "@/models/recipe";

export const measurementIcon = (measurement: Measurement): Icon | undefined => {
  switch (measurement.unit) {
    case Unit.Cup:
      return Icon.Cup
    case Unit.Celcius:
      const icons = [Icon.ThermometerLow, Icon.ThermometerMedium, Icon.ThermometerHigh]
      const index = clamp(Math.floor(measurement.quantity.value / 50), 0, icons.length)
      return icons[index]
    case Unit.Drop:
      return Icon.Drop
    case Unit.TableSpoon:
      return Icon.TableSpoon
    case Unit.TeaSpoon:
      return Icon.TeaSpoon
    default:
      return undefined
  }
}

export function parseMeasurement(text: string): Measurement | undefined {
  const parts = text.match(measurementRegExp)
  if (!parts) {
    return undefined
  }
  
  const quantity = parts[1]
  const unit = parts[3] as Unit
  if (quantity && unit) {
    return { quantity: new Quantity(...quantity.split('/')), unit }
  }
  
  return undefined
}

export function recipeIngredientMeasurementEquivalent(
  recipeIngredient: RecipeIngredient
): Measurement | undefined {
  if (recipeIngredient.amount) {
    return ingredientMeasurementEquivalent(recipeIngredient, recipeIngredient.amount)
  }
  
  return undefined
}

export function ingredientMeasurementEquivalent(
  ingredient: Ingredient, 
  measurement: Measurement
): Measurement | undefined {
  const dataSheet = useContentStore().dataSheet
  const density = dataSheet?.densities.find(d => d.key === ingredient.densityKey)?.value
  const consistency = ingredient.consistency
  const customaryVolume = dataSheet?.customaryVolumes.find(cv => cv.unit === measurement.unit)
  
  if (!dataSheet || !customaryVolume || !density || !consistency) {
    // console.log(customaryVolume, density, consistency)
    return undefined
  }
  
  const volumeML = customaryVolume.mL * measurement.quantity.value
  
  switch (consistency) {
    case Consistency.Liquid:
    case Consistency.Viscous:
      return { quantity: new Quantity(volumeML / density), unit: Unit.Mililiter }
    default:
      return { quantity: new Quantity(volumeML * density), unit: Unit.Gram }
  }
}
