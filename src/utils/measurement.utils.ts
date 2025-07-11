import { Unit, UnitKind, TemperatureEstimate } from "@/models/measurement";
import type { QuantityRange, Measurement, TemperatureMeasurement } from "@/models/measurement"
import type { Density } from "@/models/catalog";
import useSessionStore from '@/stores/session'
import { Icon } from '@design-tokens/iconography'
import { enumKeyFromValue } from "@/assets/tungsten/enum";
import { Consistency } from "@/models/ingredient";
import { clamp } from "@/assets/tungsten/math";

export const unitKind = (unit: Unit): UnitKind => {
  switch (unit) {
    case Unit.Celcius:
      return UnitKind.Temperature
    case Unit.Drop:
    case Unit.Mililiter:
      return UnitKind.Volume;
    case Unit.Gram:
      return UnitKind.Weight
    case Unit.Cup:
    case Unit.TableSpoon:
    case Unit.TeaSpoon:
      return UnitKind.CustomaryVolumeOrWeight
    case Unit.Hour:
    case Unit.Minute:
      return UnitKind.Time
  }
}

export const temperatureEstimateApproximateValue = (estimate: TemperatureEstimate): number => {
  switch (estimate) {
    case TemperatureEstimate.TemperatureRoom:
      return 20
    case TemperatureEstimate.TemperatureTepid:
      return 30
  }
}

export const consistencyPreciseUnits = (consistency: Consistency): Unit[] => {
  switch (consistency) {
    case Consistency.Granulated:
    case Consistency.Powder:
    case Consistency.Solid:
      return [Unit.Gram]
    case Consistency.Liquid:
    case Consistency.Viscous:
      return [Unit.Mililiter]
    case Consistency.SemiSolid:
      return [Unit.Gram, Unit.Mililiter]
  }
}

export const measurementIcon = (measurement: Measurement): Icon | undefined => {
  switch (measurement.unit) {
    case Unit.Cup:
      return Icon.Cup
    case Unit.Celcius:
      const icons = [Icon.ThermometerLow, Icon.ThermometerMedium, Icon.ThermometerHigh]
      const quantityValue = typeof measurement.quantity === 'object' ? measurement.quantity.max : measurement.quantity
      const index = clamp(Math.floor(quantityValue / 50), 0, icons.length)
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

export function decodeMeasurementString(measurementString: string): Measurement {
  const unitPattern = Object.values(Unit).join('|')
  const measurementRegExp = new RegExp(`^\\s*(\\d*\[.\\-,]?\\d+)\\s*(${unitPattern})\\s*$`)
  const measurementMatch = measurementString.match(measurementRegExp)
  const unit = measurementMatch ? enumKeyFromValue(Unit, measurementMatch[2])! : undefined
  
  if (measurementMatch && unit) {
    const range = measurementMatch[1].split('-').map(Number)
    return { 
      quantity: range.length > 1 ? { min: range[0], max: range[1] } as QuantityRange : range[0], 
      unit 
    }
  }
  
  throw new Error(`Undecodable measurement string: ${measurementString}`)
}

export function decodeTemperatureMeasurementString(measurementString: string): TemperatureMeasurement {
  const estimatePattern = Object.values(TemperatureEstimate).join('|')
  const estimateRegExp = new RegExp(`^\\s*(${estimatePattern})\\s*$`)
  const estimateMatch = measurementString.match(estimateRegExp)
  const estimate = estimateMatch ? enumKeyFromValue(TemperatureEstimate, estimateMatch[1])! : undefined
  
  if (estimate) {
    return { estimate: estimate, quantity: temperatureEstimateApproximateValue(estimate), unit: Unit.Celcius }
  }
  
  return decodeMeasurementString(measurementString) as TemperatureMeasurement
}

export function convertCustomaryVolumeOrWeight(
  measurement: Measurement, 
  density: Density, 
  to: Unit
): Measurement {
  const fromUnitKind = unitKind(measurement.unit)
  if (fromUnitKind !== UnitKind.CustomaryVolumeOrWeight) {
    throw new Error(`Invalid Unit kind for customary volume/weight conversion: ${fromUnitKind}`)
  }
    
  if (measurement.quantity === undefined) {
    throw new Error(`Undefined quantity for customary volume/weight conversion: ${measurement.quantity}`)
  }
  
  const toUnitKind = unitKind(to)
  if (!(toUnitKind === UnitKind.Volume || toUnitKind === UnitKind.Weight)) {
    throw new Error(`Invalid target kind for customary volume/weight conversion: ${toUnitKind}`)
  }
  
  const session = useSessionStore()
  const dataSheet = session.catalog!.dataSheet
  const unitVolume = dataSheet.customaryUnitVolumes.find(uv => uv.unit === measurement.unit)?.ml
  if (!unitVolume) {
    throw new Error(`Undefined volume for customary Unit: ${measurement.unit}`)
  }
  
  function convert(volumeMl: number): number {
    switch (to) {
      case Unit.Gram:
        return volumeMl * density.value
      case Unit.Mililiter:
        return volumeMl / density.value
      default:
        throw new Error(`Undefined conversion target Unit: ${to}`)
    }
  }
  
  // console.log(measurement.quantity, measurement.unit, volumeMl, `(${unitVolume})`, density.key, density.value)
  
  if (typeof measurement.quantity === 'object') {
    return { 
      quantity: {
        min: convert(measurement.quantity.min * unitVolume),
        max: convert(measurement.quantity.max * unitVolume)
      }, 
      unit: to 
    }
  }
  
  return { quantity: convert(measurement.quantity * unitVolume), unit: to }
}
