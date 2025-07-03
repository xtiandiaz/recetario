<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { RecipeKey, type Recipe } from '@/models/recipe';
import { getRecipe } from '@/services/content-provision';
import { localizedString } from '@/services/localization';
import VuetyForm from '@/vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue'
import VuetyTaskFormRow from '@/vueties/components/form/rows/VuetyTaskFormRow.vue';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue';
import { Icon } from '@/assets/design-tokens/iconography';
import { LocalizedStringKey } from '@/models/localization';
import VuetyProgressIndicator from '@/vueties/components/misc/VuetyProgressIndicator.vue';
import IngredientItem from '@/components/IngredientItem.vue';

const props = defineProps<{
  rKey: RecipeKey
}>()

const route = useRoute()

const recipe = ref<Recipe | undefined>()

watch(() => props.rKey, async (key) => {
  recipe.value = undefined
  
  recipe.value = await getRecipe(key)
  route.meta.title!.value = recipe.value?.title
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
        <VuetyTaskFormRow
          v-for="(step, index) of recipe.instructions[0].steps"
          :key="index"
        >
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
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 3em;
}
</style>
