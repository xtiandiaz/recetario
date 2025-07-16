import type { RawDataSheet, DataSheet } from "@/models/data-sheet";

export function refineRawDataSheet(rawDataSheet: RawDataSheet): DataSheet {  
  return {
    consistencies: rawDataSheet.consistencies.map(rc => {
      return {
        key: rc.key,
        preciseUnits: rc.preciseUnits.map(pu => rawDataSheet.units.find(u => u === pu)!)
      }
    }),
    densities: rawDataSheet.densities,
    temperatureEstimates: rawDataSheet.temperatureEstimates,
    units: rawDataSheet.units
  }
}
