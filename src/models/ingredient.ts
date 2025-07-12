import type { Density } from "./catalog"
import type { Language } from "./localization"
import type { Measurement, TemperatureMeasurement } from "./measurement"

export enum IngredientKey {
  ActiveDryYeast = 'active-dry-yeast',
  AllPurposeWheatFlour = 'all-purpose-wheat-flour',
  BakingSoda = 'baking-soda',
  CarrierOil = 'carrier-oil',
  CoconutOil = 'coconut-oil',
  CornStarch = 'corn-starch',
  DryFruitMix = 'dry-fruit-mix',
  EssentialOil = 'essential-oil',
  GranulatedSalt = 'granulated-salt',
  GranulatedSugar = 'granulated-sugar',
  Honey = 'honey',
  NutSeedMix = 'nut-seed-mix',
  OatFlakes = 'oat-flakes',
  OliveOil = 'olive-oil',
  StrongWheatFlour = 'strong-wheat-flour',
  Water = 'water',
  WholeMilk = 'whole-milk',
  WholeRyeFlour = 'whole-rye-flour',
  WholeWheatFlour = 'whole-wheat-flour',
}

export enum Consistency {
  Granulated = 'granulated',
  Liquid = 'liquid',
  Powder = 'powder',
  SemiSolid = 'semi-solid',
  Solid = 'solid',
  Viscous = 'viscous',
}

export interface Extras {
  language: Language
  
  note?: string
}

export enum Priority {
  Optional = 'optional'
}

export interface RawIngredient {
  amount: string
  key: IngredientKey
  
  extras?: Extras[]
  priority?: Priority
  temperature?: string
  title?: string
}

export interface Ingredient {
  amount: Measurement
  key: IngredientKey
  title: string
  
  consistency?: Consistency
  density?: Density
  extras?: Extras[]
  priority?: Priority
  temperature?: TemperatureMeasurement
}
