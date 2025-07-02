import type { LocalizedStringKey } from "@/models/localization"
import { CategoryKey, SectionKey } from "@/models/catalog";
import type { RecipeKey } from "@/models/recipe";
import type { IngredientKey } from "@/models/ingredient";
import { QuantityUnit } from "@/models/units"
import { localizedString } from "@/services/localization"

export const sectionTitle = (key: SectionKey): string => {
  return localizedString(`title-section-${key}` as LocalizedStringKey)
}

export const categoryTitle = (key: CategoryKey): string => {
  return localizedString(`title-category-${key}` as LocalizedStringKey)
}

export const recipeTitle = (key: RecipeKey): string => {
  return localizedString(`title-recipe-${key}` as LocalizedStringKey)
}

export const ingredientTitle = (key: IngredientKey): string => {
  return localizedString(`title-ingredient-${key}` as LocalizedStringKey)
}

export const localizedQuantityUnit = (unit: QuantityUnit): string => {
  switch (unit) {
    case QuantityUnit.Gram:
      return unit
    default:
      return localizedString(`unit-${unit}` as LocalizedStringKey)
  }
}
