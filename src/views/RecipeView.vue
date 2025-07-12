<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import { RecipeKey, type Recipe } from '@/models/recipe';
import { Priority } from '@/models/ingredient';
import { LocalizedStringKey } from '@/models/localization';
import useSettingsStore from '@/stores/settings'
import useSessionStore from '@/stores/session'
import { getRecipe } from '@/services/content-provision';
import { localizedString } from '@/services/localization';
import IngredientItem from '@/components/IngredientItem.vue';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue'
import VuetyTaskFormRow from '@vueties/components/form/rows/VuetyTaskFormRow.vue';
import VuetyProgressIndicator from '@vueties/components/misc/VuetyProgressIndicator.vue';
import { priorityTitle } from '@/utils/localization.utils';
import { Icon } from '@design-tokens/iconography';

const { recipeKey } = defineProps<{
  recipeKey: RecipeKey
}>()

const route = useRoute()
const settings = useSettingsStore()
const session = useSessionStore()

const summary = computed(() => session.getRecipeSummary(recipeKey))
const recipe = ref<Recipe | undefined>()
const mandatoryIngredients = computed(() => recipe?.value?.ingredients.filter(i => i.priority === undefined))
const optionalIngredients = computed(() => recipe?.value?.ingredients.filter(i => i.priority === Priority.Optional))
const steps = computed(() => recipe.value?.instructions.find(i => i.language === settings.currentLanguage)?.steps)

watch(summary, async (value) => {
  recipe.value = undefined
  route.meta.title.value = value?.title
  
  if (value) {
    recipe.value = await getRecipe(value?.key)
  }
}, { deep: true, immediate: true })

onBeforeMount(() => {
  route.meta.showsLargeTitle.value = true
})
</script>

<template>
  <main>
    <div :id="summary?.category" class="category-background"></div>
    
    <h4 class="headline">{{ summary?.title }}</h4>
    
    <VuetyForm v-if="recipe">
      <VuetyFormSection
        :icon="Icon.Scale"
        :title="localizedString(LocalizedStringKey.Title_Ingredients)"
        :showsLargeTitle="true"
      >
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of mandatoryIngredients"
          :key="index"
          class="ingredient"
        >
          <IngredientItem :ingredient="ingredient" />
        </VuetyTaskFormRow>
        
        <span v-if="optionalIngredients && optionalIngredients.length > 0">
          <div class="divider">
            {{ priorityTitle(Priority.Optional) }}
          </div>
          
          <VuetyTaskFormRow 
            v-for="(ingredient, index) of optionalIngredients"
            :key="index"
            class="ingredient"
          >
            <IngredientItem :ingredient="ingredient" />
          </VuetyTaskFormRow>
        </span>
      </VuetyFormSection>
      
      <VuetyFormSection
        :icon="Icon.Doc"
        :title="localizedString(LocalizedStringKey.Title_Instructions)"
        :showsLargeTitle="true"
      >
        <VuetyTaskFormRow v-for="(step, index) of steps" :key="index">
          <span>{{ step }}</span>
        </VuetyTaskFormRow>
      </VuetyFormSection>
    </VuetyForm>
    
    <VuetyProgressIndicator v-else />
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/styles/category-theme';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);
@use '@vueties/styles/mixins';
@use '@design-tokens/palette';

@include category-theme.backgrounds();

:deep(.large-title *) {
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
