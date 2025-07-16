import { Unit } from "@/assets/types/data-sheet.types"

export class Quantity {
  _units: number
  _fractionNumerator: number
  _fractionDenominator: number
  
  constructor(...parts: (number | string)[]) {
    const numerator = Number(parts[0])
    const denominator = parts.length > 1 ? Number(parts[1]) : 1
    
    if (numerator >= denominator) {
      this._units = Math.floor(numerator / denominator)
      this._fractionNumerator = numerator - this._units * denominator
    } else {
      this._units = 0
      this._fractionNumerator = numerator
    }
    
    this._fractionDenominator = denominator
  }
  
  get value(): number {
    return this._units + this._fractionNumerator / this._fractionDenominator
  }
  
  get htmlString(): string {
    if (this._hasFraction) {
      return `${this._unitsHTMLString}${this._fractionHTMLString}`
    } else {
      return `${this._units.toLocaleString()}`
    }
  }
  
  private get _hasFraction(): boolean {
    return this._fractionNumerator >= 1
  }
  
  private get _unitsHTMLString(): string {
    return this._units > 0 ? `${this._units}${this._hasFraction ? '&nbsp;' : ''}` : ''
  }
  
  private get _fractionHTMLString(): string {
    return  this._hasFraction 
      ? `<sup>${this._fractionNumerator}</sup>&frasl;<sub>${this._fractionDenominator}</sub>`
      : ''
  }
}

export interface Measurement {
  quantity: Quantity
  unit: Unit
}
