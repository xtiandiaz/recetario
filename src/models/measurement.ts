import type { TemperatureEstimate } from "./data-sheet"
import { Unit } from "@/assets/types/data-sheet.types"

export interface QuantityRange {
  max: number
  min: number
}

export interface Measurement {
  quantity: number
  unit: Unit
}

export interface TemperatureMeasurement extends Measurement {
  estimate?: TemperatureEstimate
  label?: string
}
