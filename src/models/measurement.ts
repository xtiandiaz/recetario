import { Unit } from "@/assets/types/data-sheet.types"

export interface Quantity {
  htmlString: string
  value: number
}

export class DecimalQuantity implements Quantity {
  value: number
  
  constructor(value: number | string) {
    this.value = Math.round(Number(value) * 10) / 10
  }
  
  get htmlString(): string {
    return this.value.toLocaleString()
  }
}

export class FractionQuantity implements Quantity {
  _whole: number
  _fractionNumerator: number
  _fractionDenominator: number
  
  constructor(...parts: (number | string)[]) {
    const numerator = Number(parts[0])
    const denominator = parts.length > 1 ? Number(parts[1]) : 1
    
    if (numerator >= denominator) {
      this._whole = Math.floor(numerator / denominator)
      this._fractionNumerator = numerator - this._whole * denominator
    } else {
      this._whole = 0
      this._fractionNumerator = numerator
    }
    
    this._fractionDenominator = denominator
  }
  
  get value(): number {
    return this._whole + this._fractionNumerator / this._fractionDenominator
  }
  
  get htmlString(): string {
    if (this._hasFraction) {
      return `${this._unitsHTMLString}${this._fractionHTMLString}`
    } else {
      return `${this._whole.toLocaleString()}`
    }
  }
  
  private get _hasFraction(): boolean {
    return this._fractionNumerator >= 1
  }
  
  private get _unitsHTMLString(): string {
    return this._whole > 0 ? `${this._whole}${this._hasFraction ? '&nbsp;' : ''}` : ''
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
