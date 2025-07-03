export enum Unit {
  Celcius = 'ºC',
  Cup = 'cup',
  Gram = 'g',
  Hour = 'hr',
  Mililiter = 'ml',
  Minute = 'min',
  TableSpoon = 'tbsp',
  TeaSpoon = 'tsp',
}

export enum UnitKind {
  Temperature = 'temperature',
  Volume = 'volume',
  Weight = 'weight',
  WeightOrVolume = 'weight-or-volume',
}

export interface Measurement {
  unit: Unit
  
  estimate?: MeasurementEstimate
  quantity?: number
}

export enum MeasurementEstimate {
  TemperatureRoom = 'room',
  TemperatureTepid = 'tepid',
}
