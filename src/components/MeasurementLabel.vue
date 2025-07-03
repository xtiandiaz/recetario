<script setup lang="ts">
import { computed } from 'vue'
import { measurementIcon, unitKind } from '@/utils/measurement.utils';
import { localizedQuantity } from '@/utils/localization.utils';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue'
import type { Measurement } from '@/models/measurement';

const { measurement } = defineProps<{
  measurement: Measurement
  abbreviated?: boolean
  equivalent?: Measurement
}>()

const icon = computed(() => measurementIcon(measurement))
</script>

<template>
  <div 
    v-if="measurement" 
    :class="['measurement-label', unitKind(measurement.unit)]"
  >
    {{ localizedQuantity(measurement, abbreviated === true) }}
    
    <VuetySvgIcon v-if="icon" cls :icon="icon" />
    
    <div v-if="equivalent" class="equivalence">
      ({{ localizedQuantity(equivalent, abbreviated === true) }})
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';
@use '@design-tokens/typography';

.measurement-label {
  align-items: center;
  display: flex;
  gap: 0.25em;
  padding: 0.125em 0 0 0;
  
  &.temperature {
    @extend .caption, .italic;
    &, .svg-icon {
      @include palette.color-attribute('color', 'orange');
    }
  }
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
