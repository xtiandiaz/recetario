import type { Unit } from "./measurement";

export interface CustomaryUnitVolume {
  ml: number
  unit: Unit
}

export enum DensityKey {
  Butter = 'butter',
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
