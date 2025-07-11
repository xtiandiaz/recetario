import { RecipeKey, type RecipeSummary } from "./recipe"
import type { Unit } from "./measurement";
import type { Color } from "@design-tokens/palette"

export interface CustomaryUnitVolume {
  ml: number
  unit: Unit
}

export enum DensityKey {
  BakingSoda = 'baking-soda',
  Butter = 'butter',
  CarrierOil = 'carrier-oil',
  CoconutOil = 'coconut-oil',
  CornStarch = 'corn-starch',
  EssentialOil = 'essential-oil',
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


export enum CategoryKey {
  Bakery = "bakery",
  MiscFood = "misc-food",
  Pastas = "pastas",
  Salads = "salads",
  Sauces = "sauces",
  Soups = "soups",
}

export interface RawCategory {
  color: Color
  emoji: string
  key: CategoryKey
  recipes: RecipeKey[]
}

export interface Category {
  color: Color
  emoji: string
  key: CategoryKey
  recipes: RecipeSummary[]
  title: string
}

export enum SectionKey {
  Food = 'food'
}

export interface RawSection {
  categories: RawCategory[]
  key: SectionKey
  dataSheet: DataSheet
}

export interface Section {
  categories: Category[]
  key: SectionKey
  title: string
}

export interface RawCatalog {
  dataSheet: DataSheet
  sections: RawSection[]
}

export interface Catalog {
  dataSheet: DataSheet
  sections: Section[]
}
