import type { RecipeSummary } from "./recipe"
import type { SectionKey, CategoryKey, RecipeKey } from "@/assets/keys/catalog.keys"
import type { Color } from "@design-tokens/palette"

export interface RawCategory {
  color: Color
  emoji: string
  key: CategoryKey
  recipes: RecipeKey[]
}

export interface RawSection {
  categories: RawCategory[]
  key: SectionKey
}

export interface RawCatalog {
  sections: RawSection[]
}

export interface Category {
  color: Color
  emoji: string
  key: CategoryKey
  recipes: RecipeSummary[]
  title: string
}

export interface Section {
  categories: Category[]
  key: SectionKey
  title: string
}

export interface Catalog {
  sections: Section[]
}
