<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useContentStore from '@/stores/content'
import VuetyForm from '@/vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue';
import VuetyInfoFormRow from '@/vueties/components/form/rows/VuetyInfoFormRow.vue';
import { IngredientKey } from '@/assets/keys/inventory.keys';
import { Unit } from '@/assets/keys/data-sheet.keys';
import { unitIcon } from '@/utils/measurement.utils';

const { ingredientKey } = defineProps<{
  ingredientKey: IngredientKey
}>()

const route = useRoute()
const content = useContentStore()
const ingredient = content.inventory?.localizedIngredients.find(ing => ing.key === ingredientKey)

const units: Unit[] = [Unit.Gram, Unit.Mililiter, Unit.Cup, Unit.TableSpoon, Unit.TeaSpoon]

onMounted(() => {
  route.meta.setTitle(ingredient?.localizedName, true)
})
</script>

<template>
  <VuetyForm>    
    <VuetyFormSection
      :title="ingredient?.localizedName"
      :showsLargeTitle="true"
    >
      <VuetyInfoFormRow 
        :title="content.localized?.other.get('title-density') ?? `{Density}`"
        :value="`${ingredient?.density?.value} g/mL`"
      />
    </VuetyFormSection>
    
    <VuetyFormSection>
      <VuetyInfoFormRow 
        v-for="(unit, index) of units"
        :key="index"
        :title="unitIcon(unit) ? '' : content.localized?.units.get(unit) ?? unit"
        :icon="unitIcon(unit)"
      />
    </VuetyFormSection>
  </VuetyForm>
</template>

<style scoped lang="scss">

</style>
