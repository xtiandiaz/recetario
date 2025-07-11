<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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

const settings = useSettingsStore()
const session = useSessionStore()
const route = useRoute()

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
</script>

<template>
  <main>
    <div :id="summary?.category" class="category-background"></div>
    
    <VuetyForm v-if="recipe">
      <h3 class="serif">{{ recipe.title }}</h3>
      
      <span class="headline">
        <VuetySvgIcon :icon="Icon.Scale" />
        <h6 class="serif">{{ localizedString(LocalizedStringKey.Title_Ingredients) }}</h6>
      </span>
      <VuetyFormSection>
        <VuetyTaskFormRow 
          v-for="(ingredient, index) of recipe.ingredients"
          :key="index"
          class="ingredient"
        >
          <IngredientItem :ingredient="ingredient" />
        </VuetyTaskFormRow>
      </VuetyFormSection>
      
      <span class="headline">
        <VuetySvgIcon :icon="Icon.Doc" />
        <h6 class="serif">{{ localizedString(LocalizedStringKey.Title_Instructions) }}</h6>
      </span>
      <VuetyFormSection>
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

h3 {
  margin: 0;
  text-align: center;
}

.headline {
  display: flex;
  gap: 0.75em;
  margin: 1em 0 0 1.125em;
  
  &, :deep(.svg-icon) {
    @include palette.color-attribute('color', 'secondary-body');
  }
  
  > * {
    display: inline-block;
  }
  
  h6 {
    margin: 0;
  }
  
  .svg-icon {
    width: 1.5em;
  }
}

.vuety-form {
  gap: 1em;
}

.vuety-form-row.task {  
  :deep(.content) {
    align-self: center;
  }
}

.vuety-progress-indicator {
  margin: auto;
  width: 3em;
  @include mixins.position(absolute, 0, 0, 0, 0);
}
</style>
