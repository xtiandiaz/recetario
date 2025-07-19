<script setup lang="ts">
import type { LocalizedRecipeIngredient } from '@/models/localization';
import { calculateRecipeIngredientMeasurementEquivalent } from '@/utils/measurement.utils';
import MeasurementLabel from './MeasurementLabel.vue';
import SvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue';
import { ingredientCutIcon } from '@/utils/recipe.utils';

const { localizedIngredient: ingredient } = defineProps<{
  localizedIngredient: LocalizedRecipeIngredient,
  amountMultiplier: number
}>()
</script>

<template>
  {{ ingredient.name }}
  
  <div v-if="ingredient.localizedNote" class="note">{{ ingredient.localizedNote }}</div>
  
  <div class="labels">
    <MeasurementLabel 
      v-if="ingredient.amount"
      :measurement="ingredient.amount" 
      :equivalent="calculateRecipeIngredientMeasurementEquivalent(ingredient)"
      :multiplier="amountMultiplier"
    />
    
    <MeasurementLabel 
      v-if="ingredient.temperature" 
      :measurement="ingredient.temperature" 
    />
    
    <div v-if="ingredient.cut" class="cut theme-colored-item">
      {{ ingredient.localizedCut }}
      <SvgIcon :icon="ingredientCutIcon(ingredient.cut)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';
@use '@design-tokens/typography';
@use '@vueties/styles/mixins';

.note {
  @extend .caption;
  @include palette.color-attribute('color', 'secondary-body');
}

.labels {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0 1em;
  
  .cut {
    @extend .caption, .italic;
    align-items: center;
    display: inline-flex;
    gap: 0.25em;
    
    .svg-icon {
      @include mixins.size(1.75em);
    }
  }
}
</style>
