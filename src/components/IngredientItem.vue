<script setup lang="ts">
import { computed } from 'vue';
import type { Ingredient } from '@/models/ingredient';
import settingsStore from '@/stores/settings';
import { calculateAmountWeightOrVolumeEquivalent } from '@/utils/ingredient.utils';
import MeasurementLabel from './MeasurementLabel.vue';

const { ingredient } = defineProps<{
  ingredient: Ingredient
}>()

const settings = settingsStore()

const equivalent = computed(() => {
  try {
    return calculateAmountWeightOrVolumeEquivalent(ingredient)
  } catch (e: unknown) {
    console.error(e)
    return undefined
  }
})

const extras = computed(() => ingredient.extras?.find(e => e.language === settings.currentLanguage))
</script>

<template>
  {{ ingredient.title! }}
  
  <div class='extras'>{{ extras?.note }}</div>
  
  <div class="captions">
    <MeasurementLabel 
      :measurement="ingredient.amount" 
      :abbreviated="true" 
      :equivalent="equivalent"
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

.captions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.75em;
  margin: 0.125em 0;
}

.extras {
  @extend .caption;
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
