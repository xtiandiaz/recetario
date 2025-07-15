import type { DataSheet } from "@/models/data-sheet";
import type { Inventory, RawInventory } from "@/models/inventory";

export function refineRawInventory(rawInventory: RawInventory, dataSheet: DataSheet): Inventory {
  return {
    ingredients: rawInventory.ingredients.map(ri => {
      return {
        consistency: dataSheet.consistencies.find(c => c.key === ri.consistency),
        density: dataSheet.densities.find(d => d.key === ri.density),
        key: ri.key,
      }
    })
  }
}
