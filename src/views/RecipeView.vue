<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router';
import type { LocalizedRecipe } from '@/models/localization';
import type { LocalizedRecipeSummary } from '@/models/localization';
import useContentStore from '@/stores/content'
import { fetchRecipe } from '@/services/content-provision'
import { RecipeKey } from '@/assets/keys/catalog.keys';
import RecipeScaleRow from '@/components/RecipeScaleFormRow.vue';
import IngredientItem from '@/components/RecipeIngredient.vue';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue'
import VuetyTaskFormRow from '@vueties/components/form/rows/VuetyTaskFormRow.vue';
import VuetyProgressIndicator from '@vueties/components/misc/VuetyProgressIndicator.vue';
import '@/assets/tungsten/extensions/string.extensions'
import { interpolateLocalizedString } from '@/services/localization';

const { recipeKey } = defineProps<{
  recipeKey: RecipeKey
}>()

const route = useRoute()
const content = useContentStore()

const summary = ref<LocalizedRecipeSummary>()
const recipe = ref<LocalizedRecipe>()
const ingredientAmountMultiplier = ref<number>(1)
const portions = computed(() => 
  recipe.value?.portions ? recipe.value.portions * ingredientAmountMultiplier.value : undefined
)
const ingredients = computed(() => recipe.value?.localizedIngredients)
const mandatoryIngredients = computed(() => ingredients.value?.filter(i => !i.optional))
const optionalIngredients = computed(() => ingredients.value?.filter(i => i.optional === true))

const hasOptionalIngredients = computed(() => {
  return optionalIngredients.value && optionalIngredients.value.length > 0
})

watch(() => recipeKey, async (newKey) => {
  summary.value = content.getLocalizedRecipeSummary(newKey)
  route.meta.setTitle(summary.value?.title, true)
  recipe.value = undefined
  
  recipe.value = await fetchRecipe(newKey)
}, { deep: true, immediate: true })
</script>

<template>
  <main :class="['theme-category', summary?.category]">
    <div class="theme-background"></div>
    
    <div id="headline">
      <h4 class="title">{{ summary?.title }} {{ recipe?.origin }}</h4>
      <span class="description">{{ recipe?.localizedDescription }}</span>
    </div>
    
    <VuetyForm v-if="recipe">
      <VuetyFormSection
        :showsLargeTitle="true"
        :title="content.localized?.other.get('title-ingredients')"
      >
        <RecipeScaleRow @scale="(mult) => ingredientAmountMultiplier = mult" />
        
        <div class="divider highlighted">
          <span v-if="portions">= {{ interpolateLocalizedString('title-portions', { count: portions }) }}</span>
        </div>
        
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of mandatoryIngredients"
          :key="index"
          class="ingredient"
        >
          <IngredientItem 
            :localizedIngredient="ingredient" 
            :amountMultiplier="ingredientAmountMultiplier" 
          />
        </VuetyTaskFormRow>
        
        <div v-if="hasOptionalIngredients" class="divider">
          {{ content.localized?.other.get('title-optional')?.capitalized() }}
        </div>
          
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of optionalIngredients"
          class="ingredient"
          :key="index"
        >
          <IngredientItem 
            :localizedIngredient="ingredient" 
            :amountMultiplier="ingredientAmountMultiplier" 
          />
        </VuetyTaskFormRow>
      </VuetyFormSection>
      
      <VuetyFormSection
        :showsLargeTitle="true"
        :title="content.localized?.other.get('title-instructions')"
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
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);
@use '@/assets/styles/theme';
@use '@/assets/styles/measurement';

@include theme.categories();
@include measurement.label();

#headline {
  margin: 0 auto;
  max-width: 420px;
  padding: 0.5em 2em;
  text-align: center;
  
  > * {
    margin: 0.5em auto;
  }
  
  .title {
    @include vs.handwritten();
  }
  
  .description {
    @include vs.italic();
    @include vs.color-attribute('color', vs.$secondary-body-color);
  }
}

.vuety-progress-indicator {
  margin: auto;
  @include vs.size(3em);
  @include vs.position(absolute, 0, 0, 0, 0);
}
</style>
