<script setup lang="ts">
import type { LocalizedRecipeIngredient } from '@/models/localization';
import useContentStore from '@/stores/content'
import { calculateRecipeIngredientMeasurementEquivalent } from '@/utils/measurement.utils';
import MeasurementLabel from './MeasurementLabel.vue';
import SvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue';
import { ingredientCutIcon } from '@/utils/recipe.utils';
import '@/assets/tungsten/extensions/string.extensions'

const { localizedIngredient: ingredient } = defineProps<{
  localizedIngredient: LocalizedRecipeIngredient,
  amountMultiplier: number
}>()

const localizedContent = useContentStore().localized
</script>

<template>
  {{ ingredient.localizedName }}
  
  <div v-if="ingredient.localizedNote" class="note">{{ ingredient.localizedNote }}</div>
  
  <div class="labels">
    <MeasurementLabel 
      v-if="ingredient.amount"
      :measurement="ingredient.amount" 
      :equivalent="calculateRecipeIngredientMeasurementEquivalent(ingredient)"
      :multiplier="amountMultiplier"
    />
    <span v-else class="unspecified-amount">{{ localizedContent?.other.get('text-to-taste')?.capitalized() }}</span>
    
    <MeasurementLabel 
      v-if="ingredient.temperature" 
      :measurement="ingredient.temperature" 
    />
    
    <div v-if="ingredient.cut" class="cut theme-colored-item">
      {{ ingredient.localizedCut }}
      <SvgIcon :icon="ingredientCutIcon(ingredient.cut)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';
@use '@design-tokens/typography';
@use '@vueties/styles/mixins';

.note {
  @extend .caption;
  @include palette.color-attribute('color', 'secondary-body');
}

.labels {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0 0.75em;
  
  .cut {
    @extend .caption, .italic;
    align-items: center;
    display: inline-flex;
    gap: 0.25em;
    
    .svg-icon {
      @include mixins.size(1.75em);
    }
  }
}

.unspecified-amount {
  @extend .italic;
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
