import type { Density } from "./data-sheet"
import type { Measurement } from "./measurement"

export enum IngredientKey {
  ActiveDryYeast = 'active-dry-yeast',
  AllPurposeWheatFlour = 'all-purpose-wheat-flour',
  GranulatedSalt = 'granulated-salt',
  GranulatedSugar = 'granulated-sugar',
  OliveOil = 'olive-oil',
  SeedMix = 'seed-mix',
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
  temperature?: Measurement
}
