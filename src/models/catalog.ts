import type { SectionKey, CategoryKey, RecipeKey } from "@/assets/keys/catalog.keys"
import type { Color } from "@design-tokens/palette"

export interface Category {
  color: Color
  emoji: string
  key: CategoryKey
  recipes: RecipeKey[]
}

export interface Section {
  categories: Category[]
  key: SectionKey
}

export interface Catalog {
  sections: Section[]
}
