import { RecipeKey } from "./recipe"
import type { Color } from "@design-tokens/palette"

export enum CategoryKey {
  Bakery = "bakery",
  MiscFood = "misc-food",
  Pastas = "pastas",
  Salads = "salads",
  Sauces = "sauces",
  Soups = "soups",
}

export interface Category {
  color: Color
  emoji: string
  key: CategoryKey
  recipes: RecipeKey[]
  
  title?: string
}

export enum SectionKey {
  Food = 'food'
}

export interface Section {
  key: SectionKey
  categories: Category[]
  
  title?: string
}

export interface Catalog {
  sections: Section[]
}
