import { 
  ConsistencyKey, 
  DensityKey, 
  TemperatureEstimate, 
  Unit, 
  // UnitKind
} from "@/assets/types/data-sheet.types";

export interface RawConsistency {
  key: ConsistencyKey
  preciseUnits: Unit[]
}

export interface Consistency {
  key: ConsistencyKey
  preciseUnits: Unit[]
}

export interface Density {
  key: DensityKey
  value: number
}

export interface RawDataSheet {
  consistencies: RawConsistency[]
  densities: Density[]
  temperatureEstimates: TemperatureEstimate[]
  units: Unit[]
}

export interface DataSheet {
  consistencies: Consistency[]
  densities: Density[]
  temperatureEstimates: TemperatureEstimate[]
  units: Unit[]
}
