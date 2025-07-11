import type { RawCategory, Category, RawCatalog, Catalog, DataSheet } from "@/models/catalog";
import type { RawRecipe, Recipe } from "@/models/recipe";
import { refineRawIngredient } from "./ingredient.utils";
import { categoryTitle, recipeTitle, sectionTitle } from "./localization.utils";

export function refineRawCatalog(rawCatalog: RawCatalog): Catalog {
  return {
    dataSheet: rawCatalog.dataSheet,
    sections: rawCatalog.sections.map(rs => {
      return {
        categories: rs.categories
          .map(rc => refineRawCategory(rc))
          .sort((a, b) => a.title.localeCompare(b.title)),
        key: rs.key,
        title: sectionTitle(rs.key)
      }
    }).sort((a, b) => a.title.localeCompare(b.title)),
  }
}

export function refineRawCategory(rawCategory: RawCategory): Category {
  return {
    color: rawCategory.color,
    emoji: rawCategory.emoji,
    key: rawCategory.key,
    title: categoryTitle(rawCategory.key),
    recipes: rawCategory.recipes.map(key => {
      return {
        category: rawCategory.key,
        key,
        title: recipeTitle(key)
      }
    }).sort((a, b) => a.title.localeCompare(b.title))
  }
}

export function refineRawRecipe(rawRecipe: RawRecipe, dataSheet: DataSheet): Recipe {
  const ingredients = rawRecipe
    .ingredients.map(ri => refineRawIngredient(ri, dataSheet))
    .sort((a, b) => a.title.localeCompare(b.title))
  
  return {
    category: rawRecipe.category,
    ingredients,
    instructions: rawRecipe.instructions,
    key: rawRecipe.key,
    origin: rawRecipe.origin,
    title: recipeTitle(rawRecipe.key)
  }
}
