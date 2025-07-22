import type { DataSheet } from "@/models/data-sheet";
import type { RawInventory, Inventory } from "@/models/inventory";

export function refineRawInventory(rawInventory: RawInventory, dataSheet: DataSheet): Inventory {
  return {
    ingredients: rawInventory.ingredients.map(rIng => {
      const density = dataSheet.densities.find(d => d.key === rIng.density)
      
      return {
        ...rIng,
        density
      }
    })
  }
}
