<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { LocalizedIngredient } from '@/models/localization';
import useContentStore from '@/stores/content'
import VuetyForm from '@vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@/vueties/components/form/rows/VuetyPushFormRow.vue';
import type { DensityKey } from '@/assets/keys/data-sheet.keys';
import '@/assets/tungsten/extensions/array.extensions'

const route = useRoute()
const content = useContentStore()

const groupedIngredients = content.inventory?.localizedIngredients
  .filter(ing => ing.density)
  .sort((a, b) => a.localizedName.localeCompare(b.localizedName))
  .groupedBy((ing: LocalizedIngredient) => ing.localizedName[0])
  
function stringifyDensityValue(key: DensityKey): string {
  return `${content.dataSheet!.densities.find(d => d.key === key)?.value.toLocaleString()} g/mL`
}

onMounted(() => {
  route.meta.setTitle(content.localized?.other.get('title-calculator'), false)
})
</script>

<template>
  <VuetyForm>    
    <VuetyFormSection 
      v-for="(group, index) of groupedIngredients" 
      :key="index"
      :title="group[0].localizedName[0].capitalized()"
    >
      <VuetyPushFormRow 
        v-for="(ingredient, index) of group"
        :key="index"
        :title="ingredient.localizedName"
        :path="''"
        :value="stringifyDensityValue(ingredient.density!)"
      />
    </VuetyFormSection>
  </VuetyForm>
</template>

<style scoped lang="scss">

</style>
