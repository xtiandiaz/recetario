import type { RawCategory, Category, RawCatalog, Catalog } from "@/models/catalog";
import type { LocalizedContent } from "@/models/localization";

export function refineRawCategory(rawCategory: RawCategory, localizedContent: LocalizedContent): Category {
  return {
    color: rawCategory.color,
    emoji: rawCategory.emoji,
    key: rawCategory.key,
    title: localizedContent.categories.get(rawCategory.key)!,
    recipes: rawCategory.recipes.map(key => {
      return {
        category: rawCategory.key,
        key,
        title: localizedContent.recipes.get(key)!
      }
    }).sort((a, b) => a.title.localeCompare(b.title))
  }
}

export function refineRawCatalog(rawCatalog: RawCatalog, localizedContent: LocalizedContent): Catalog {
  return {
    sections: rawCatalog.sections.map(rs => {
      return {
        categories: rs.categories
          .map(rc => refineRawCategory(rc, localizedContent))
          .sort((a, b) => a.title.localeCompare(b.title)),
        key: rs.key,
        title: localizedContent.sections.get(rs.key)!
      }
    }).sort((a, b) => a.title.localeCompare(b.title)),
  }
}
