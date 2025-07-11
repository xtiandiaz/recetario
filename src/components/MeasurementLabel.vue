<script setup lang="ts">
import { computed } from 'vue'
import { UnitKind, type Measurement } from '@/models/measurement';
import { measurementIcon, unitKind } from '@/utils/measurement.utils';
import { localizedQuantity } from '@/utils/localization.utils';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue'
import { clamp } from '@/assets/tungsten/math';

const { measurement } = defineProps<{
  measurement: Measurement
  abbreviated?: boolean
  equivalent?: Measurement
}>()

const icon = computed(() => measurementIcon(measurement))
const measurementKindClass = computed(() => {
  switch (unitKind(measurement.unit)) {
    case UnitKind.Temperature:
      const quantity = typeof measurement.quantity === 'object' ? measurement.quantity.max : measurement.quantity
      const tVal = clamp(Math.floor(quantity / 25) * 25, 0, 100)
      return `temperature-${tVal}`
    default:
      return undefined
  }
})
</script>

<template>
  <div 
    v-if="measurement" 
    :class="['measurement-label', unitKind(measurement.unit), measurementKindClass]"
  >
    {{ localizedQuantity(measurement, abbreviated === true) }}
    
    <VuetySvgIcon v-if="icon" cls :icon="icon" />
    
    <div v-if="equivalent" class="equivalence">
      ({{ localizedQuantity(equivalent, abbreviated === true) }})
    </div>
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
