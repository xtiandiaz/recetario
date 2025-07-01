export enum IngredientKey {
  ActiveDryYeast = 'active-dry-yeast',
  AllPurposeWheatFlour = 'all-purpose-wheat-flour',
  GranulatedSalt = 'granulated-salt',
  GranulatedSugar = 'granulated-sugar',
  OliveOil = 'olive-oil',
  StrongWheatFlour = 'strong-wheat-flour',
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
