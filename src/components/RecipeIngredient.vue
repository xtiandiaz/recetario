<script setup lang="ts">
import type { LocalizedRecipeIngredient } from '@/models/localization';
import { recipeIngredientMeasurementEquivalent } from '@/utils/measurement.utils';
import MeasurementLabel from './MeasurementLabel.vue';

const { localizedIngredient: ingredient } = defineProps<{
  localizedIngredient: LocalizedRecipeIngredient
}>()
</script>

<template>
  {{ ingredient.name }}
  
  <div v-if="ingredient.localizedNote" class="note">{{ ingredient.localizedNote }}</div>
  
  <div class="captions">
    <MeasurementLabel 
      v-if="ingredient.amount"
      :measurement="ingredient.amount" 
      :equivalent="recipeIngredientMeasurementEquivalent(ingredient)"
    />
    
    <MeasurementLabel 
      v-if="ingredient.temperature" 
      :measurement="ingredient.temperature" 
    />
    
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';
@use '@design-tokens/typography';

.note {
  @extend .caption;
  @include palette.color-attribute('color', 'secondary-body');
}

.captions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.75em;
}
</style>
