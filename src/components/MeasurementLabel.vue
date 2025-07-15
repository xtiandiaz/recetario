<script setup lang="ts">
import { computed } from 'vue'
import type { Measurement } from '@/models/measurement';
import { localizedMeasurementHTML, localizedMeasurementString } from '@/utils/localization.utils';
import { measurementIcon } from '@/utils/measurement.utils';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue'
import { UnitKind } from '@/assets/keys/data-sheet.keys';
import { clamp } from '@/assets/tungsten/math';

const { measurement } = defineProps<{
  measurement?: Measurement
  abbreviated?: boolean
  equivalent?: Measurement
}>()

const icon = computed(() => measurement ? measurementIcon(measurement) : undefined)
const measurementKindClass = computed(() => {
  // switch (measurement.unit.kind) {
  //   case UnitKind.Temperature:
  //     const quantity = typeof measurement.quantity === 'object' ? measurement.quantity.max : measurement.quantity
  //     const tVal = clamp(Math.floor(quantity / 25) * 25, 0, 100)
  //     return `temperature-${tVal}`
  //   default:
      return undefined
  // }
})
</script>

<template>
  <div 
    v-if="measurement" 
    v-html="localizedMeasurementHTML(measurement)"
    :class="['measurement-label', measurement.unit, measurementKindClass]"
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
