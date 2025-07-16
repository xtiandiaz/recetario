<script setup lang="ts">
import type { Measurement } from '@/models/measurement';
import { localizedMeasurementOrTemperatureEstimateHTML, localizedMeasurementString } from '@/utils/localization.utils';
import type { TemperatureEstimate } from '@/assets/types/data-sheet.types';

const { measurement } = defineProps<{
  measurement: Measurement | TemperatureEstimate
  equivalent?: Measurement
}>()
</script>

<template>
  <div class="measurement-label-wrapper">
    <div 
      v-if="measurement" 
      v-html="localizedMeasurementOrTemperatureEstimateHTML(measurement)"
    >
    </div>
    <span v-if="equivalent" class="equivalent">
      ({{ localizedMeasurementString(equivalent) }})
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/measurement';
@use '@design-tokens/palette';
@use '@design-tokens/typography';

.measurement-label-wrapper {
  align-items: center;
  display: flex;
  gap: 0.25em;
}

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
}

.equivalent {
  @extend .caption;
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
