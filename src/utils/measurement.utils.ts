import type { Measurement } from "@/models/measurement"
import { Quantity } from "@/models/measurement"
import { Unit } from "@/assets/types/data-sheet.types";
import { measurementRegExp } from "@/assets/reg-exps";
import { clamp } from "@/assets/tungsten/math";
import { Icon } from '@design-tokens/iconography'

export const measurementIcon = (measurement: Measurement): Icon | undefined => {
  switch (measurement.unit) {
    case Unit.Cup:
      return Icon.Cup
    case Unit.Celcius:
      const icons = [Icon.ThermometerLow, Icon.ThermometerMedium, Icon.ThermometerHigh]
      const index = clamp(Math.floor(measurement.quantity.value / 50), 0, icons.length)
      return icons[index]
    case Unit.Drop:
      return Icon.Drop
    case Unit.TableSpoon:
      return Icon.TableSpoon
    case Unit.TeaSpoon:
      return Icon.TeaSpoon
    default:
      return undefined
  }
}

export function parseMeasurement(text: string): Measurement | undefined {
  const parts = text.match(measurementRegExp)
  if (!parts) {
    return undefined
  }
  
  const quantity = parts[1]
  const unit = parts[3] as Unit
  if (quantity && unit) {
    return { quantity: new Quantity(...quantity.split('/')), unit }
  }
  
  return undefined
}

// export function decodeTemperatureMeasurementString(measurementString: string): TemperatureMeasurement {
//   const dataSheet = useContentStore().dataSheet
  
//   const estimatePattern = dataSheet?.temperatureEstimates.map(te => te.key).join('|')
//   const estimateRegExp = new RegExp(`^\\s*(${estimatePattern})\\s*$`)
//   const estimateMatch = measurementString.match(estimateRegExp)
//   const estimate = dataSheet?.temperatureEstimates.find(te => te.key === estimateMatch?.[1])
  
//   if (estimate) {
//     return { 
//       estimate, 
//       quantity: estimate.value, 
//       unit: dataSheet!.units.find(u => u.kind === UnitKind.Temperature)! 
//     }
//   }
  
//   return decodeMeasurementString(measurementString) as TemperatureMeasurement
// }

// export function convertCustomaryVolumeOrWeight(
//   measurement: Measurement, 
//   density: Density, 
//   to: Unit
// ): Measurement {
//   const customaryVolumeML = measurement.unit.customaryVolumeML
//   if (!customaryVolumeML) {
//     throw new Error(`Invalid Unit for customary volume/weight conversion: ${measurement.unit}`)
//   }
    
//   if (measurement.quantity === undefined) {
//     throw new Error(`Undefined quantity for customary volume/weight conversion: ${measurement.quantity}`)
//   }
  
//   const toUnitKind = to.kind
//   if (!(toUnitKind === UnitKind.Volume || toUnitKind === UnitKind.Weight)) {
//     throw new Error(`Invalid target kind for customary volume/weight conversion: ${toUnitKind}`)
//   }
  
//   function convert(volumeMl: number): number {
//     switch (to) {
//       case UnitKey.Gram:
//         return volumeMl * density.value
//       case UnitKey.Mililiter:
//         return volumeMl / density.value
//       default:
//         throw new Error(`Undefined conversion target Unit: ${to}`)
//     }
//   }
  
//   // console.log(measurement.quantity, measurement.unit, volumeMl, `(${unitVolume})`, density.key, density.value)
  
//   if (typeof measurement.quantity === 'object') {
//     return { 
//       quantity: {
//         min: convert(measurement.quantity.min * customaryVolumeML),
//         max: convert(measurement.quantity.max * customaryVolumeML)
//       }, 
//       unit: to
//     }
//   }
  
//   return { quantity: convert(measurement.quantity * customaryVolumeML), unit: to }
// }

// const unitQuantitySeparator = (key: UnitKey): string => {
//   switch (key) {
//     case UnitKey.Celcius: 
//       return ''
//     default: 
//       return ' '
//   }
// }

// export const localizedQuantity = (measurement: Measurement): string | undefined => {
//   const content = useContentStore()
  
//   const temperatureMeasurement = measurement as TemperatureMeasurement
//   if (temperatureMeasurement && temperatureMeasurement.estimate) {
//     return content.localized?.temperatureEstimates.get(temperatureMeasurement.estimate.key)
//   }
  
//   if (measurement.quantity) {
//     const quantityValues = typeof measurement.quantity === 'object' 
//       ? [measurement.quantity.min, measurement.quantity.max]
//       : [measurement.quantity]
    
//     return [
//       quantityValues.map(v => v.toLocaleString()).join('-'),
//       measurement.unit.localizedSymbol ?? measurement.unit.symbol
//     ].join(unitQuantitySeparator(measurement.unit.key))
//   }
  
//   return '?'
// }
