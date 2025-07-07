import type { Unit } from "./measurement";

export interface CustomaryUnitVolume {
  ml: number
  unit: Unit
}

export enum DensityKey {
  BakingSoda = 'baking-soda',
  Butter = 'butter',
  CoconutOil = 'coconut-oil',
  CornStarch = 'corn-starch',
  Flour = 'flour',
  GranulatedSalt = 'granulated-salt',
  GranulatedSugar = 'granulated-sugar',
  GranulatedYeast = 'granulated-yeast',
  Honey = 'honey',
  OliveOil = 'olive-oil',
  SourDough = 'sour-dough',
  Water = 'water',
}

export interface Density {
  key: DensityKey
  value: number
}

export interface DataSheet {
  customaryUnitVolumes: CustomaryUnitVolume[]
  densities: Density[]
}
