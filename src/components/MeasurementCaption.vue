<script setup lang="ts">
import { computed } from 'vue'
import { decodeMeasurementString, measurementIcon, unitKind } from '@/utils/measurement.utils';
import { localizedQuantity } from '@/utils/localization.utils';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue'

const { measurementString } = defineProps<{
  measurementString: string
  abbreviated?: boolean
}>()

const measurement = computed(() => decodeMeasurementString(measurementString))
const icon = computed(() => measurement.value?.unit ? measurementIcon(measurement.value) : undefined)
</script>

<template>
  <div 
    v-if="measurement" 
    :class="[
      'measurement-caption', 
      unitKind(measurement.unit), 
      measurement.estimate ? 'estimate' : ''
    ]"
  >
    {{ localizedQuantity(measurement, abbreviated === true) }}
    
    <VuetySvgIcon v-if="icon" cls :icon="icon" />
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';
@use '@design-tokens/typography';

.measurement-caption {
  align-items: center;
  display: flex;
  gap: 0.25em;
  padding: 0.125em 0 0 0;
  
  &.estimate {
    @extend .italic;
    @include palette.color-attribute('color', 'secondary-body');
  }
  :not(&.estimate) {
    @extend .strong;
  }
  
  .svg-icon {
    width: 1.25em;
    @include palette.color-attribute('color', 'tertiary-body');
  }
  
  // &.temperature {
  //   &, * {
  //     @include palette.color-attribute('color', 'pink');
  //   }
  // }
}
</style>
