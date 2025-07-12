import { LocalizedStringKey } from "@/models/localization";

export default new Map<string, string>([
  [LocalizedStringKey.Title_Ingredients, 'Ingredientes'],
  [LocalizedStringKey.Title_Instructions, 'Instrucciones'],
  
  /////////////////////////////////////////////////
  // ----------------------------------------------
  ['section-food', 'Comida'],
  // ----------------------------------------------
  ['category-bakery', 'Panadería'],
    ['recipe-pita', 'Pita'],
    ['recipe-pizza', 'Pizza'],
    ['recipe-rustic-bread', 'Pan rústico'],
  
  ['category-misc-food', 'Varios'],
    ['recipe-granola', 'Granola'],
    ['recipe-onigiri', 'Onigiri 🍙'],
  
  ['category-salads', 'Ensaladas'],
    ['recipe-tabbouleh', 'Tabulé'],
    
  ['category-sauces', 'Salsas'],
    ['recipe-baba-ganoush', 'Baba Ganoush'],
    ['recipe-hummus', "Hummus"],
    ['recipe-tzatziki', 'Tzatziki'], 
    
  ['category-soups', 'Sopas'],
    ['recipe-creamy-salmon-soup', 'Salmón cremosa'],
  
  // ---------------------------------------------
  ['section-personal-care', 'Cuidado personal'],
  // ----------------------------------------------
  ['category-personal-hygiene', 'Higiene'],
    ['recipe-liquid-deodorant', 'Desodorante líquido'],
    ['recipe-pasty-deodorant', 'Desodorante pastoso'],
  
  /////////////////////////////////////////////////
  ['ingredient-all-purpose-wheat-flour', 'Harina de trigo común'],
  ['ingredient-active-dry-yeast', 'Levadura seca'],
  ['ingredient-baking-soda', 'Bicarbonato de sodio'],
  ['ingredient-carrier-oil', 'Aceite portador'],
  ['ingredient-coconut-oil', 'Aceite de coco'],
  ['ingredient-corn-starch', 'Fécula de maíz'],
  ['ingredient-dry-fruit-mix', 'Variedad de frutos secos al gusto'],
  ['ingredient-essential-oil', "Aceite esencial"],
  ['ingredient-granulated-salt', 'Sal'],
  ['ingredient-granulated-sugar', 'Azúcar'],
  ['ingredient-honey', 'Miel de abejas'],
  ['ingredient-oat-flakes', 'Hojuelas de avena'],
  ['ingredient-olive-oil', 'Aceite de oliva'],
  ['ingredient-nut-seed-mix', 'Variedad de nueces y semillas al gusto'],
  ['ingredient-strong-wheat-flour', 'Harina de fuerza "00"'],
  ['ingredient-water', 'Agua'],
  ['ingredient-whole-milk', 'Leche entera'],
  ['ingredient-whole-wheat-flour', 'Harina de trigo integral'],
  ['ingredient-rye-flour', 'Harina de centeno'],
  
  /////////////////////////////////////////////////
  ['unit-cup', 'Taza'],
  ['unit-cup-abbr', "Tz."],
  ['unit-gtt', 'Gota'],
  ['unit-gtt-abbr', 'gtt'],
  ['unit-g', 'gramo'],
  ['unit-g-abbr', 'g'],
  ['unit-ml', 'mililitro'],
  ['unit-ml-abbr', 'ml'],
  ['unit-tbsp', 'Cucharada'],
  ['unit-tbsp-abbr', 'Cda.'],
  ['unit-tsp', 'cucharadita'],
  ['unit-tsp-abbr', 'cdta.'],
  
  /////////////////////////////////////////////////
  ['estimate-temperature-tepid', 'Tibio/a'],
  ['estimate-temperature-room', 'Al clima'],
  
  /////////////////////////////////////////////////
  ['priority-optional', 'Opcional'],
])
