import { MeasurementEstimate, Unit } from "@/models/measurement";
import { UnitKind, type Measurement } from "@/models/measurement"
import type { Density } from "@/models/data-sheet";
import { getDataSheet } from "@/services/content-provision";
import { Icon } from '@design-tokens/iconography'
import { enumKeyFromValue } from "@/assets/tungsten/enum";
import { Consistency } from "@/models/ingredient";

export const unitKind = (unit: Unit): UnitKind => {
  switch (unit) {
    case Unit.Celcius:
      return UnitKind.Temperature
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

export const estimateUnit = (estimate: MeasurementEstimate): Unit => {
  switch (estimate) {
    case MeasurementEstimate.TemperatureRoom:
    case MeasurementEstimate.TemperatureTepid:
      return Unit.Celcius
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
      return Icon.ThermometerMedium
    case Unit.TableSpoon:
      return Icon.TableSpoon
    case Unit.TeaSpoon:
      return Icon.TeaSpoon
    default:
      return undefined
  }
}

export function decodeMeasurementString(measurementString: string): Measurement {
  const estimatePattern = Object.values(MeasurementEstimate).join('|')
  const estimateRegExp = new RegExp(`^\\s*(${estimatePattern})\\s*$`)
  const estimateMatch = measurementString.match(estimateRegExp)
  const estimate = estimateMatch ? enumKeyFromValue(MeasurementEstimate, estimateMatch[1])! : undefined
  
  if (estimate) {
    return { estimate: estimate, unit: estimateUnit(estimate) }
  }
  
  const unitPattern = Object.values(Unit).join('|')
  const measurementRegExp = new RegExp(`^\\s*(\\d*[.,]?\\d+)\\s*(${unitPattern})\\s*$`)
  const measurementMatch = measurementString.match(measurementRegExp)
  const unit = measurementMatch ? enumKeyFromValue(Unit, measurementMatch[2])! : undefined
  
  if (measurementMatch && unit) {
    return { quantity: Number(measurementMatch[1]), unit }
  }
  
  throw new Error(`Undecodable measurement string: ${measurementString}`)
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
  
  const dataSheet = getDataSheet()
  const unitVolume = dataSheet.customaryUnitVolumes.find(uv => uv.unit === measurement.unit)?.ml
  if (!unitVolume) {
    throw new Error(`Undefined volume for customary Unit: ${measurement.unit}`)
  }
  
  const volumeMl = measurement.quantity * unitVolume
  let quantity: number
  
  switch (to) {
    case Unit.Gram:
      quantity = volumeMl * density.value
      break
    case Unit.Mililiter:
      quantity = volumeMl / density.value
      break
    default:
      throw new Error(`Undefined conversion target Unit: ${to}`)
  }
  
  return { quantity, unit: to }
}
