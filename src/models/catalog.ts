import type { SectionKey, CategoryKey, RecipeKey } from "@/assets/types/catalog.types"
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
