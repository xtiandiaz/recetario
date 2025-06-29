import catalog from '@/assets/json/catalog.json'
import type { Catalog } from "@/models/catalog";
import { localizedString } from './localization';
import { categoryTitleKey, sectionTitleKey } from '@/view-models/catalog.vm';

export function getCatalog(): Catalog {
  const _catalog = JSON.parse(JSON.stringify(catalog)) as Catalog
  
  _catalog.sections.forEach(s => {
    s.title = localizedString(sectionTitleKey(s.key))
    
    s.categories.forEach(c => c.title = localizedString(categoryTitleKey(c.key)))
    s.categories.sort((a, b) => a.title!.localeCompare(b.title!))
  })
  
  return _catalog
}
