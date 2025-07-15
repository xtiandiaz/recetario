import { 
  ConsistencyKey, 
  DensityKey, 
  TemperatureEstimateKey, 
  UnitKey, 
  UnitKind
} from "@/assets/keys/data-sheet.keys";

export interface RawConsistency {
  key: ConsistencyKey
  preciseUnits: UnitKey[]
}

export interface Consistency {
  key: ConsistencyKey
  preciseUnits: Unit[]
}

export interface Density {
  key: DensityKey
  value: number
}

export interface Unit {
  key: UnitKey
  kind: UnitKind
  symbol: string
  
  customaryVolumeML?: number
  localizedSymbol?: string
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
