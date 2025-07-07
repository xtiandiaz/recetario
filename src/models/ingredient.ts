import type { Density } from "./data-sheet"
import type { Measurement, TemperatureMeasurement } from "./measurement"

export enum IngredientKey {
  ActiveDryYeast = 'active-dry-yeast',
  AllPurposeWheatFlour = 'all-purpose-wheat-flour',
  BakingSoda = 'baking-soda',
  CoconutOil = 'coconut-oil',
  CornStarch = 'corn-starch',
  DryFruitMix = 'dry-fruit-mix',
  EssentialOil = 'essential-oil',
  GranulatedSalt = 'granulated-salt',
  GranulatedSugar = 'granulated-sugar',
  Honey = 'honey',
  OatFlakes = 'oat-flakes',
  OliveOil = 'olive-oil',
  NutSeedMix = 'nut-seed-mix',
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

export interface RawIngredient {
  amount: string
  key: IngredientKey
  
  temperature?: string
  title?: string
}

export interface Ingredient {
  amount: Measurement
  key: IngredientKey
  title: string
  
  consistency?: Consistency
  density?: Density
  temperature?: TemperatureMeasurement
}
