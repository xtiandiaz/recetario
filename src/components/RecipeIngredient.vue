<script setup lang="ts">
import type { LocalizedRecipeIngredient } from '@/models/localization';
import MeasurementLabel from './MeasurementLabel.vue';

const { localizedIngredient: ingredient } = defineProps<{
  localizedIngredient: LocalizedRecipeIngredient
}>()

// const equivalent = computed(() => {
//   try {
//     return calculateAmountWeightOrVolumeEquivalent(ingredient)
//   } catch (e: unknown) {
//     console.error(e)
//     return undefined
//   }
// })
</script>

<template>
  {{ ingredient.name }}
  
  <div v-if="ingredient.localizedNote" class="note">{{ ingredient.localizedNote }}</div>
  
  <div class="captions">
    <MeasurementLabel 
      :measurement="ingredient.amount" 
      :abbreviated="true"
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
