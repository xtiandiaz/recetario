import { CategoryKey, SectionKey } from "@/models/catalog";
import type { RecipeKey } from "@/models/recipe";
import type { IngredientKey, Priority } from "@/models/ingredient";
import type { Measurement, TemperatureMeasurement } from '@/models/measurement'
import { Unit } from '@/models/measurement'
import { localizedString } from "@/services/localization"
import '@/assets/tungsten/extensions/array.extensions'

export const sectionTitle = (key: SectionKey): string => {
  return localizedString(`section-${key}`)
}

export const categoryTitle = (key: CategoryKey): string => {
  return localizedString(`category-${key}`)
}

export const recipeTitle = (key: RecipeKey): string => {
  return localizedString(`recipe-${key}`)
}

export const ingredientTitle = (key: IngredientKey): string => {
  return localizedString(`ingredient-${key}`)
}

export const priorityTitle = (key: Priority): string => {
  return localizedString(`priority-${key}`)
}

export const localizedMeasurementUnit = (unit: Unit, abbreviated: boolean, pluralized: boolean): string => {
  switch (unit) {
    case Unit.Celcius:
      return unit
    default:
      return localizedString(`unit-${unit}${abbreviated ? '-abbr' : ''}`)
        + (pluralized && !abbreviated ? 's' : '')
  }
}

const unitQuantitySeparator = (unit: Unit): string => {
  switch (unit) {
    case Unit.Celcius: 
      return ''
    default: 
      return ' '
  }
}

export const localizedQuantity = (measurement: Measurement, abbreviated: boolean = true): string => {
  const temperatureMeasurement = measurement as TemperatureMeasurement
  if (temperatureMeasurement && temperatureMeasurement.estimate) {
    return localizedString(`estimate-temperature-${temperatureMeasurement.estimate}`)
  }
  
  if (measurement.quantity) {
    const quantityValues = typeof measurement.quantity === 'object' 
      ? [measurement.quantity.min, measurement.quantity.max]
      : [measurement.quantity]
    
    return [
      quantityValues.map(v => v.toLocaleString()).join('-'),
      localizedMeasurementUnit(
        measurement.unit, 
        abbreviated, 
        !abbreviated && (quantityValues.last()! > 1)
      )
    ].join(unitQuantitySeparator(measurement.unit))
  }
  
  return '?'
}
