import { QuantityUnit } from "@/models/units";
import { Icon } from '@design-tokens/iconography'
import { enumKeyFromValue } from "@/assets/tungsten/enum";

export const quantityUnitIcon = (unit: QuantityUnit): Icon | undefined => {
  switch (unit) {
    case QuantityUnit.Cup:
      return Icon.Cup
    case QuantityUnit.TableSpoon:
      return Icon.TableSpoon
    case QuantityUnit.TeaSpoon:
      return Icon.TeaSpoon
    default:
      return undefined
  }
}

export function decodeQuantityString(quantityString: string): [number, QuantityUnit] | undefined {
  const unitPattern = Object.values(QuantityUnit).join('|')
  const regExp = new RegExp(`^\\s*(\\d*[.,]?\\d+)\\s*(${unitPattern})\\s*$`)
  console.log(regExp)
  
  const match = quantityString.match(regExp)
  const unit = match ? enumKeyFromValue(QuantityUnit, match[2])! : undefined
  
  return match && unit ? [Number(match[1]), unit] : undefined
}

export function getUnitIconFromQuantityString(quantityString: string): Icon | undefined {
  const unit = decodeQuantityString(quantityString)?.[1]
  
  return unit ? quantityUnitIcon(unit) : undefined
}
