<script setup lang="ts">
import { ref, watch } from 'vue'
import { RecipeKey, type Recipe } from '@/models/recipe';
import { getRecipe } from '@/services/content-provision';
import { localizedString } from '@/services/localization';
import VuetyForm from '@/vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue'
import VuetyInfoFormRow from '@/vueties/components/form/rows/VuetyInfoFormRow.vue';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue';
import { Icon } from '@/assets/design-tokens/iconography';
import { LocalizedStringKey } from '@/models/localization';

const props = defineProps<{
  rKey: RecipeKey
}>()

const recipe = ref<Recipe | undefined>()

watch(() => props.rKey, async (recipeKey) => {
  recipe.value = undefined
  recipe.value = await getRecipe(recipeKey)
}, { immediate: true })
</script>

<template>
  <main>
    <div :id="recipe?.category" class="category-background"></div>
    
    <VuetyForm v-if="recipe">
      <h3 class="serif">{{ recipe.title }}</h3>
      
      <span class="headline">
        <VuetySvgIcon :icon="Icon.Scale" />
        <h6 class="serif">{{ localizedString(LocalizedStringKey.Title_Ingredients) }}</h6>
      </span>
      <VuetyFormSection>
        <VuetyInfoFormRow 
          v-for="(ingredient, index) of recipe.ingredients"
          :key="index"
          :icon="Icon.RadioCircle"
          :title="ingredient.title!"
          :subtitle="ingredient.quantity"
        />
      </VuetyFormSection>
      
      <span class="headline">
        <VuetySvgIcon :icon="Icon.Doc" />
        <h6 class="serif">{{ localizedString(LocalizedStringKey.Title_Instructions) }}</h6>
      </span>
      <VuetyFormSection>
        <VuetyInfoFormRow 
          v-for="(step, index) of recipe.instructions[0].steps"
          :key="index"
          :icon="Icon.RadioCircle"
          :title="step"
        />
      </VuetyFormSection>
    </VuetyForm>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/styles/category-theme';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);
@use '@design-tokens/palette';

@include category-theme.backgrounds();

h3 {
  margin: 0;
  text-align: center;
}

.headline {
  display: flex;
  gap: 0.75em;
  margin: 1em 0 0 1em;
  
  &, :deep(.svg-icon) {
    @include palette.color-attribute('color', 'tertiary-body');
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

.vuety-form-section {
  :deep(.svg-icon) {
    @include palette.color-attribute('color', 'secondary-body');
  }
}
</style>
