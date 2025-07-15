import type { RawDataSheet, DataSheet } from "@/models/data-sheet";
import type { LocalizedContent } from "@/models/localization";

export function refineRawDataSheet(
  rawDataSheet: RawDataSheet, 
  localizedContent: LocalizedContent
): DataSheet {
  const units = rawDataSheet.units.map(u => {
    u.localizedSymbol = localizedContent.units.get(u.key)  
    return u
  })
  
  return {
    consistencies: rawDataSheet.consistencies.map(rc => {
      return {
        key: rc.key,
        preciseUnits: rc.preciseUnits.map(uk => units.find(u => u.key === uk)!)
      }
    }),
    densities: rawDataSheet.densities,
    temperatureEstimates: rawDataSheet.temperatureEstimates.map(te => {
      te.label = localizedContent.temperatureEstimates.get(te.key)
      return te
    }),
    units
  }
}
