<script setup lang="ts">
import { computed } from 'vue';
import type { Ingredient } from '@/models/ingredient';
import { calculateAmountWeightOrVolumeEquivalent } from '@/utils/ingredient.utils';
import MeasurementLabel from './MeasurementLabel.vue';

const { ingredient } = defineProps<{
  ingredient: Ingredient
}>()

const equivalent = computed(() => {
  try {
    return calculateAmountWeightOrVolumeEquivalent(ingredient)
  } catch (e: unknown) {
    console.error(e)
    return undefined
  }
})
</script>

<template>
  {{ ingredient.title! }}
  
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
@use '@design-tokens/typography';

.captions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.125em;
  margin-top: 0.125em;
}
</style>
