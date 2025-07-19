import type { Quantity, FractionalQuantity, Measurement } from "@/models/measurement"
import type { Ingredient } from "@/models/inventory";
import useContentStore from '@/stores/content'
import { Consistency, Unit } from "@/assets/keys/data-sheet.keys";
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

function produceFractionalQuantity([numerator, denominator]: (number | string)[]): FractionalQuantity {
  numerator = Number(numerator)
  denominator = Number(denominator) ?? 1

  let wholes: number
  if (numerator >= denominator) {
    wholes = Math.floor(numerator / denominator)
    numerator = numerator - wholes * denominator
  } else {
    wholes = 0
  }

  return { 
    wholes, 
    numerator, 
    denominator, 
    value: (wholes * denominator + numerator) / denominator
  }
}

function parseQuantity(quantityString: string): Quantity | undefined {
  const fractionParts = quantityString.split('/')
  if (fractionParts.length > 1) {
    return produceFractionalQuantity(fractionParts)
  }
  
  return { value: Number(quantityString) }
}

export function parseMeasurement(text: string): Measurement | undefined {
  const parts = text.match(measurementRegExp)
  if (!parts) {
    return undefined
  }
  
  const quantity = parseQuantity(parts[1])
  const unit = parts[3] as Unit
  if (quantity && unit) {    
    return { quantity, unit }
  }
  
  return undefined
}

export function calculateRecipeIngredientMeasurementEquivalent(
  recipeIngredient: RecipeIngredient
): Measurement | undefined {
  if (recipeIngredient.amount) {
    return calculateIngredientMeasurementEquivalent(recipeIngredient, recipeIngredient.amount)
  }
  
  return undefined
}

export function calculateIngredientMeasurementEquivalent(
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
      return { quantity: { value: volumeML / density }, unit: Unit.Mililiter }
    default:
      return { quantity: { value: volumeML * density }, unit: Unit.Gram }
  }
}

export function htmlifyQuantity(quantity: Quantity, by: number): string {
  if ('numerator' in quantity) {
    const fractionalQuantity = quantity as FractionalQuantity
    const wholes = fractionalQuantity.wholes * by + Math.floor(fractionalQuantity.numerator * by / fractionalQuantity.denominator)
    const numerator = fractionalQuantity.numerator * by % fractionalQuantity.denominator
    const denominator = fractionalQuantity.denominator
    
    const hasFraction = numerator >= 1
    if (hasFraction) {
      const wholesHTMLString = wholes > 0 ? `${wholes}${hasFraction ? '&nbsp;' : ''}` : ''
      const fractionHTMLString = hasFraction 
        ? `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
        : ''
      
      return `${wholesHTMLString}${fractionHTMLString}`
    } else {
      return `${wholes.toLocaleString()}`
    }
  }
  
  return (quantity.value * by).toLocaleString()
}
