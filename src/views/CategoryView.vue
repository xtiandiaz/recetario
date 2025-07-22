<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { LocalizedRecipeSummary } from '@/models/localization';
import useContentStore from '@/stores/content'
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@vueties/components/form/rows/VuetyPushFormRow.vue';
import { CategoryKey } from '@/assets/keys/catalog.keys';
import '@/assets/tungsten/extensions/array.extensions'

const { categoryKey } = defineProps<{
  categoryKey: CategoryKey
}>()

const route = useRoute()
const content = useContentStore()

const localized = computed(() => content.getLocalizedCategory(categoryKey))
const recipeEntries = computed(() => localized.value?.recipeSummaries
  .groupedBy((val: LocalizedRecipeSummary) => val.title.substring(0, 1).toLocaleUpperCase())
)

watch(localized, async (value) => {
  route.meta.setTitle(value ? `${value.emoji} ${value.title}` : undefined, true)
}, { immediate: true })
</script>

<template>
  <main v-if="localized" :class="['theme-category', categoryKey]">
    <div :id="localized.key" class="theme-background"></div>
    
    <div class="headline">
      <h1 class="emoji">{{ localized.emoji }}</h1>
      <h5>{{ localized.title }}</h5>
    </div>
    
    <VuetyForm>
      <VuetyFormSection
        v-for="(group, index) in recipeEntries"
        :key="index"
        :title="group[0].title.substring(0, 1)"
      >
        <VuetyPushFormRow
          v-for="(recipeEntry, index) in group"
          :key="index"
          :path="`/recipe/${recipeEntry.key}`"
          :title="`${recipeEntry.title}`"
        />
      </VuetyFormSection>
    </VuetyForm>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/styles/theme';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);

@include theme.categories();

.headline {
  margin: 0;
  text-align: center;
  
  & > * {
    @extend .serif;
    margin: 0;
  }
  
  .emoji {
    line-height: 1;
  }
}
</style>
