<script setup lang="ts">
import { ref } from 'vue'
import type { VuetySegmentedButtonSegment } from '@vueties/components/buttons/view-models';
import VuetySegmentedButtonFormRow from '@vueties/components/form/rows/VuetySegmentedButtonFormRow.vue';
import { Icon } from '@/assets/design-tokens/iconography';

const emits = defineEmits<{
  scale: [by: number]
}>()

const scale: VuetySegmentedButtonSegment<number>[] = Array.closedRange(1, 3, 1).map(n => {
  return { key: n, label: `×${n}`}
})

const selectedMultiplier = ref(scale[0].key)

function onMultiplierSelected(multiplier: number) {
  selectedMultiplier.value = multiplier
  
  emits('scale', multiplier)
}
</script>

<template>
  <VuetySegmentedButtonFormRow 
    :choice="selectedMultiplier" 
    :icon="Icon.Ruler"
    :segments="scale"
    @select="(mult) => onMultiplierSelected(mult)"
  />
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';
</style>
