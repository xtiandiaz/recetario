import { Unit } from "@/assets/keys/data-sheet.keys"
import type { Fraction } from "@/assets/tungsten/math"

export interface Quantity {
  value: number
}

export interface FractionalQuantity extends Quantity {
  wholes: number
  fraction: Fraction
}

export interface Measurement {
  quantity: Quantity
  unit?: Unit
}
