import type { Language, LocalizedContent, RawLocalizedContent } from "@/models/localization";
import type { Measurement } from "@/models/measurement";
import useContentStore from '@/stores/content'
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
    ingredients: createContentMap(rawLocalizedContent['ingredients']),
    language: language,
    other: createContentMap(rawLocalizedContent['other']),
    recipes: createContentMap(rawLocalizedContent['recipes']),
    sections: createContentMap(rawLocalizedContent['sections']),
    temperatureEstimates: createContentMap(rawLocalizedContent['temperatureEstimates']),
    units: createContentMap(rawLocalizedContent['units'])
  }
}

export const localizedMeasurementHTML = (measurement: Measurement): string => {
  const localizedContent = useContentStore().localized
  
  return `<div class="measurement-label">
    <span class="label">
      ${measurement.quantity.htmlString} ${localizedContent?.units.get(measurement.unit) ?? measurement.unit}
    </span>
    <span class="icon ${measurement.unit}"></span>
  </div>`
}
