export enum IngredientKey {
  ActiveDryYeast = 'active-dry-yeast',
  AllPurposeWheatFlour = 'all-purpose-wheat-flour',
  GranulatedSalt = 'granulated-salt',
  GranulatedSugar = 'granulated-sugar',
  OliveOil = 'olive-oil',
  SeedMix = 'seed-mix',
  StrongWheatFlour = 'strong-wheat-flour',
  WholeMilk = 'whole-milk',
  WholeRyeFlour = 'whole-rye-flour',
  WholeWheatFlour = 'whole-wheat-flour',
}

export enum TemperatureKey {
  Tepid = 'tepid'
}

export interface Ingredient {
  key: IngredientKey
  quantity: string
  temperature: TemperatureKey
  
  title?: string
}
