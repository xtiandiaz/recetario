import { 
  ConsistencyKey, 
  DensityKey, 
  TemperatureEstimateKey, 
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

export interface TemperatureEstimate {
  key: TemperatureEstimateKey
  value: number
  
  label?: string
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
