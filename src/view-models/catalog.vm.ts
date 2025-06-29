import { CategoryKey, SectionKey } from "@/models/catalog";
import { LocalizedStringKey } from "@/models/localization";

export const sectionTitleKey = (sectionKey: SectionKey): LocalizedStringKey => {
  switch (sectionKey) {
    case SectionKey.Food:
      return LocalizedStringKey.Title_SectionFood
  }
}

export const categoryTitleKey = (categoryKey: CategoryKey): LocalizedStringKey => {
  switch (categoryKey) {
    case CategoryKey.Bakery:
      return LocalizedStringKey.Title_CategoryBakery
    case CategoryKey.Miscellaneous:
      return LocalizedStringKey.Title_CategoryMisc
    case CategoryKey.Salads:
      return LocalizedStringKey.Title_CategorySalads
    case CategoryKey.SaucesAndDips:
      return LocalizedStringKey.Title_CategorySaucesAndDips
  }
}
