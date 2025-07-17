import { Unit } from "@/assets/types/data-sheet.types"

export interface Quantity {
  value: number
}

export interface FractionalQuantity extends Quantity {
  wholes: number
  numerator: number
  denominator: number
}

export interface Measurement {
  quantity: Quantity
  unit: Unit
}
