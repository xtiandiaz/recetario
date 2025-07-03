import { MeasurementEstimate, Unit } from "@/models/measurement";
import { UnitKind, type Measurement } from "@/models/measurement"
import { Icon } from '@design-tokens/iconography'
import { enumKeyFromValue } from "@/assets/tungsten/enum";

export const unitKind = (unit: Unit): UnitKind => {
  switch (unit) {
    case Unit.Celcius:
      return UnitKind.Temperature
    case Unit.Mililiter:
      return UnitKind.Volume;
    case Unit.Gram:
      return UnitKind.Weight
    default:
      return UnitKind.WeightOrVolume
  }
}

export const estimateUnit = (estimate: MeasurementEstimate): Unit => {
  switch (estimate) {
    case MeasurementEstimate.TemperatureRoom:
    case MeasurementEstimate.TemperatureTepid:
      return Unit.Celcius
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

export function decodeMeasurementString(measurementString: string): Measurement | undefined {
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
  
  return measurementMatch && unit ? { quantity: Number(measurementMatch[1]), unit } : undefined
}
