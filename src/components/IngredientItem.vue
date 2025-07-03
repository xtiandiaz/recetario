<script setup lang="ts">
import type { Ingredient } from '@/models/ingredient';
import MeasurementCaption from './MeasurementCaption.vue';

defineProps<{
  ingredient: Ingredient
}>()
</script>

<template>
  {{ ingredient.title! }}
  
  <div class="captions">
    <MeasurementCaption :measurementString="ingredient.quantity" :abbreviated="false" />
    <MeasurementCaption v-if="ingredient.temperature" :measurementString="ingredient.temperature" />
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';

.captions {
  @extend .strong;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em 1em;
}
</style>
