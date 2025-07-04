import type { LocalizedStringKey } from "@/models/localization"
import { CategoryKey, SectionKey } from "@/models/catalog";
import type { RecipeKey } from "@/models/recipe";
import type { IngredientKey } from "@/models/ingredient";
import { Unit, type Measurement, type TemperatureMeasurement } from '@/models/measurement'
import { localizedString } from "@/services/localization"

export const sectionTitle = (key: SectionKey): string => {
  return localizedString(`title-section-${key}` as LocalizedStringKey)
}

export const categoryTitle = (key: CategoryKey): string => {
  return localizedString(`title-category-${key}` as LocalizedStringKey)
}

export const recipeTitle = (key: RecipeKey): string => {
  return localizedString(`title-recipe-${key}` as LocalizedStringKey)
}

export const ingredientTitle = (key: IngredientKey): string => {
  return localizedString(`title-ingredient-${key}` as LocalizedStringKey)
}

export const localizedMeasurementUnit = (unit: Unit, abbreviated: boolean, pluralized: boolean): string => {
  switch (unit) {
    case Unit.Celcius:
      return unit
    default:
      return localizedString(`unit-${unit}${abbreviated ? '-abbr' : ''}` as LocalizedStringKey) 
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
    return localizedString(`estimate-${temperatureMeasurement.estimate}` as LocalizedStringKey)
  }
  
  if (measurement.quantity) {
    return [
      measurement.quantity.toLocaleString(),
      localizedMeasurementUnit(measurement.unit, abbreviated, !abbreviated && measurement.quantity > 1)
    ].join(unitQuantitySeparator(measurement.unit))
  }
  
  return '?'
}
