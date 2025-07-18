import { 
  Consistency, 
  DensityKey, 
  TemperatureEstimate, 
  Unit
} from "@/assets/keys/data-sheet.keys";

export interface CustomaryVolume {
  unit: Unit
  mL: number
}

export interface Density {
  key: DensityKey
  value: number
}

export interface DataSheet {
  consistencies: Consistency[]
  customaryVolumes: CustomaryVolume[]
  densities: Density[]
  temperatureEstimates: TemperatureEstimate[]
  units: Unit[]
}
