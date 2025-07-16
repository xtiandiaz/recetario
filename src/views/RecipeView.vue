<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import type { LocalizedRecipe } from '@/models/localization';
import type { LocalizedRecipeSummary } from '@/models/localization';
import { LocalizedStringKey } from '@/models/localization';
import useContentStore from '@/stores/content'
import { fetchRecipe } from '@/services/content-provision'
import IngredientItem from '@/components/RecipeIngredient.vue';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue'
import VuetyTaskFormRow from '@vueties/components/form/rows/VuetyTaskFormRow.vue';
import VuetyProgressIndicator from '@vueties/components/misc/VuetyProgressIndicator.vue';
import { RecipeKey } from '@/assets/types/catalog.types';
import { Icon } from '@design-tokens/iconography';
import '@/assets/tungsten/extensions/string.extensions'

const { recipeKey } = defineProps<{
  recipeKey: RecipeKey
}>()

const route = useRoute()
const content = useContentStore()

const summary = ref<LocalizedRecipeSummary>()
const recipe = ref<LocalizedRecipe>()
const mandatoryIngredients = computed(() => recipe?.value?.localizedIngredients.filter(i => !i.optional))
const optionalIngredients = computed(() => recipe?.value?.localizedIngredients.filter(i => i.optional === true))
const hasOptionalIngredients = computed(() => {
  return optionalIngredients.value && optionalIngredients.value.length > 0
})

watch(() => recipeKey, async (newKey) => {
  summary.value = content.getLocalizedRecipeSummary(newKey)
  route.meta.title.value = summary.value?.title
  
  recipe.value = await fetchRecipe(newKey)
}, { deep: true, immediate: true })

onBeforeMount(() => {
  route.meta.showsLargeTitle.value = true
})
</script>

<template>
  <main>
    <div :id="recipe?.category" class="category-background"></div>
    
    <h4 class="headline">{{ recipe?.title }}</h4>
    
    <VuetyForm v-if="recipe">
      <VuetyFormSection
        :icon="Icon.Scale"
        :showsLargeTitle="true"
        :title="content.localized?.other.get(LocalizedStringKey.Title_Ingredients)"
      >
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of mandatoryIngredients"
          :key="index"
          class="ingredient"
        >
          <IngredientItem :localizedIngredient="ingredient" />
        </VuetyTaskFormRow>
        
        <div v-if="hasOptionalIngredients" class="divider">
          {{ content.localized?.other.get(LocalizedStringKey.Text_Optional)?.capitalized() }}
        </div>
          
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of optionalIngredients"
          class="ingredient"
          :key="index"
        >
          <IngredientItem :localizedIngredient="ingredient" />
        </VuetyTaskFormRow>
      </VuetyFormSection>
      
      <VuetyFormSection
        :icon="Icon.Doc"
        :showsLargeTitle="true"
        :title="content.localized?.other.get(LocalizedStringKey.Title_Instructions)"
      >
        <VuetyTaskFormRow v-for="(step, index) of recipe.localizedInstructions" :key="index">
          <span v-html="step"></span>
        </VuetyTaskFormRow>
      </VuetyFormSection>
    </VuetyForm>
    
    <VuetyProgressIndicator v-else />
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/styles/category-theme';
@use '@/assets/styles/measurement';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);
@use '@vueties/styles/mixins';
@use '@design-tokens/palette';
@use '@design-tokens/iconography';

@include category-theme.backgrounds();
@include measurement.label();

:deep(.large-title *) {
  @extend .serif;
}

.rows .divider {
  @extend .serif;
}

.headline {
  @extend .serif;
  margin: 0.5em auto;
  padding: 0 2em;
  text-align: center;
}

.vuety-progress-indicator {
  margin: auto;
  width: 3em;
  @include mixins.position(absolute, 0, 0, 0, 0);
}

</style>
