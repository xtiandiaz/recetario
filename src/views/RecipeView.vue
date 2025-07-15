<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import type { LocalizedRecipe } from '@/models/localization';
import { LocalizedStringKey } from '@/models/localization';
import useContentStore from '@/stores/content'
import { fetchRecipe } from '@/services/content-provision'
import { localizeRecipe } from '@/services/localization';
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

const localized = ref<LocalizedRecipe>()
const mandatoryIngredients = computed(() => localized?.value?.localizedIngredients.filter(i => !i.optional))
const optionalIngredients = computed(() => localized?.value?.localizedIngredients.filter(i => i.optional === true))

watch(() => recipeKey, async (key) => {
  localized.value = undefined
  route.meta.title.value = content.localized?.recipes.get(key)
  
  const recipe = await fetchRecipe(key)
  localized.value = recipe ? localizeRecipe(recipe) : undefined
}, { deep: true, immediate: true })

onBeforeMount(() => {
  route.meta.showsLargeTitle.value = true
})
</script>

<template>
  <main>
    <div :id="localized?.category" class="category-background"></div>
    
    <h4 class="headline">{{ localized?.title }}</h4>
    
    <VuetyForm v-if="localized">
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
        
        <span v-if="optionalIngredients && optionalIngredients.length > 0">
          <div class="divider">
            {{ content.localized?.other.get(LocalizedStringKey.Text_Optional)?.capitalized() }}
          </div>
          
          <VuetyTaskFormRow 
            v-for="(ingredient, index) of optionalIngredients"
            class="ingredient"
            :key="index"
          >
            <IngredientItem :localizedIngredient="ingredient" />
          </VuetyTaskFormRow>
        </span>
      </VuetyFormSection>
      
      <VuetyFormSection
        :icon="Icon.Doc"
        :showsLargeTitle="true"
        :title="content.localized?.other.get(LocalizedStringKey.Title_Instructions)"
      >
        <VuetyTaskFormRow v-for="(step, index) of localized.localizedInstructions" :key="index">
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
