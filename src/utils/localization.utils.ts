import type { Language, LocalizedContent, RawLocalizedContent } from "@/models/localization";
import type { Measurement } from "@/models/measurement";
import useContentStore from '@/stores/content'
import type { TemperatureEstimate } from "@/assets/keys/data-sheet.keys";
import { htmlifyQuantity } from "./measurement.utils";
import '@/assets/tungsten/extensions/array.extensions'

export function refineRawLocalizedContent(
  rawLocalizedContent: RawLocalizedContent,
  language: Language
): LocalizedContent {
  function createContentMap<Key>(content: object): Map<Key, string> {
    return new Map(Object.entries(content).map(e => [e[0] as Key, e[1] as string]))
  }
  
  return {
    categories: createContentMap(rawLocalizedContent['categories']),
    ingredientCuts: createContentMap(rawLocalizedContent['ingredientCuts']),
    ingredients: createContentMap(rawLocalizedContent['ingredients']),
    language: language,
    other: createContentMap(rawLocalizedContent['other']),
    recipes: createContentMap(rawLocalizedContent['recipes']),
    sections: createContentMap(rawLocalizedContent['sections']),
    temperatureEstimates: createContentMap(rawLocalizedContent['temperatureEstimates']),
    units: createContentMap(rawLocalizedContent['units'])
  }
}

export const localizedMeasurementString = (measurement: Measurement, by: number): string => {
  const localizedContent = useContentStore().localized
  const localizedUnit = measurement.unit 
    ? ` ${(localizedContent?.units.get(measurement.unit) ?? measurement.unit)}`
    : undefined
  const prefix = localizedUnit ? '' : '×'
  
  return `${prefix}${htmlifyQuantity(measurement.quantity, by)}${localizedUnit ?? ''}`
}

export const localizedMeasurementHTML = (measurement: Measurement, by: number): string => {
  return `<div class="measurement-label">
    <span class="label">${localizedMeasurementString(measurement, by)}</span>
    <span class="icon ${measurement.unit}"></span>
  </div>`
}

export const localizedMeasurementOrTemperatureEstimateHTML = (
  measurementOrEstimate: Measurement | TemperatureEstimate,
  by: number
): string => {
  if (typeof measurementOrEstimate !== 'string') {
    return localizedMeasurementHTML(measurementOrEstimate, by)
  }
  
  const localizedContent = useContentStore().localized
  
  return `<div class="measurement-label">
    <span class="label">
      ${localizedContent?.temperatureEstimates.get(measurementOrEstimate)}
    </span>
    <span class="icon ºC"></span>
  </div>`
}
