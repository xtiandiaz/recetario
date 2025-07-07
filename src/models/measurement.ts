export enum Unit {
  Celcius = 'ºC',
  Cup = 'cup',
  Drop = 'drop',
  Gram = 'g',
  Hour = 'hr',
  Mililiter = 'ml',
  Minute = 'min',
  TableSpoon = 'tbsp',
  TeaSpoon = 'tsp',
}

export enum UnitKind {
  CustomaryVolumeOrWeight = 'customary-volume-weight',
  Temperature = 'temperature',
  Time = 'time',
  Volume = 'volume',
  Weight = 'weight',
}

export interface Measurement {
  quantity: number
  unit: Unit
}

export enum TemperatureEstimate {
  TemperatureRoom = 'room',
  TemperatureTepid = 'tepid',
}

export interface TemperatureMeasurement extends Measurement {
  estimate?: TemperatureEstimate
}
