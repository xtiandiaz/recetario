<script setup lang="ts">
import { computed } from 'vue'
import { decodeQuantityString, quantityUnitIcon } from '@/utils/recipe.utils';
import { localizedQuantityUnit } from '@/utils/localization.utils';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue'

const { quantityString } = defineProps<{
  quantityString: string
}>()

const quantityParts = computed(() => decodeQuantityString(quantityString))
const quantity = computed(() => quantityParts.value?.[0])
const unit = computed(() => quantityParts.value?.[1])
const unitIcon = computed(() => unit.value ? quantityUnitIcon(unit.value) : undefined)
</script>

<template>
  <div v-if="quantity && unit" class="quantity">
    {{ quantity }} {{ localizedQuantityUnit(unit) }}
    <VuetySvgIcon v-if="unitIcon" :icon="unitIcon" />
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';
@use '@design-tokens/palette';

.quantity {
  @extend .strong;
  align-items: center;
  display: flex;
  gap: 0.25em;
  padding: 0.125em 0;
  
  .svg-icon {
    width: 1em;
    @include palette.color-attribute('color', 'body');
  }
}
</style>
