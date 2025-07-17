<script setup lang="ts">
import { ref } from 'vue'
import type { VuetySegmentedButtonSegment } from '@vueties/components/buttons/view-models';
import VuetySegmentedButtonFormRow from '@vueties/components/form/rows/VuetySegmentedButtonFormRow.vue';

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
    :segments="scale" 
    :title="'Escala'"
    @select="(mult) => onMultiplierSelected(mult)"
  />
</template>

<style scoped lang="scss">

</style>
