import { Unit } from "@/assets/keys/data-sheet.keys"

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
