<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import { RecipeKey, type Recipe } from '@/models/recipe';
import useSettingsStore from '@/stores/settings'
import useSessionStore from '@/stores/session'
import { getRecipe } from '@/services/content-provision';
import { localizedString } from '@/services/localization';
import VuetyForm from '@/vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue'
import VuetyTaskFormRow from '@/vueties/components/form/rows/VuetyTaskFormRow.vue';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue';
import { Icon } from '@/assets/design-tokens/iconography';
import { LocalizedStringKey } from '@/models/localization';
import IngredientItem from '@/components/IngredientItem.vue';
import VuetyProgressIndicator from '@/vueties/components/misc/VuetyProgressIndicator.vue';

const { recipeKey } = defineProps<{
  recipeKey: RecipeKey
}>()

const route = useRoute()
const settings = useSettingsStore()
const session = useSessionStore()

const summary = computed(() => session.getRecipeSummary(recipeKey))
const recipe = ref<Recipe | undefined>()
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
    
    <h3 class="headline">{{ summary?.title }}</h3>
    
    <VuetyForm v-if="recipe">
      
      <VuetyFormSection
        :title="localizedString(LocalizedStringKey.Title_Ingredients)"
        :showsLargeTitle="true"
      >
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of recipe.ingredients"
          :key="index"
          class="ingredient"
        >
          <IngredientItem :ingredient="ingredient" />
        </VuetyTaskFormRow>
      </VuetyFormSection>
      
      <VuetyFormSection
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

:deep(.vuety-form-section .large-title) {
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
