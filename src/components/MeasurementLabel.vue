<script setup lang="ts">
import type { Measurement } from '@/models/measurement';
import { localizedMeasurementOrTemperatureEstimateHTML } from '@/utils/localization.utils';
import type { TemperatureEstimate } from '@/assets/types/data-sheet.types';

const { measurement } = defineProps<{
  measurement?: Measurement | TemperatureEstimate
  abbreviated?: boolean
  equivalent?: Measurement
}>()
</script>

<template>
  <div 
    v-if="measurement" 
    v-html="localizedMeasurementOrTemperatureEstimateHTML(measurement)"
  >
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/measurement';
@use '@design-tokens/palette';
@use '@design-tokens/typography';

.measurement-label {
  align-items: center;
  display: flex;
  gap: 0.25em;
  padding: 0.125em 0 0 0;
  
  :not(&.temperature) {
    @extend .strong;
  }
  
  .svg-icon {
    width: 1.25em;
    @include palette.color-attribute('color', 'tertiary-body');
  }
  
  .equivalence {
    @extend .caption;
    @include palette.color-attribute('color', 'tertiary-body');
  }
}
</style>
