<script setup lang="ts">
import { computed, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CategoryKey } from '@/models/catalog';
import type { RecipeSummary } from '@/models/recipe';
import useSessionStore from '@/stores/session'
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@vueties/components/form/rows/VuetyPushFormRow.vue';
import '@/assets/tungsten/extensions/array.extensions'

const { categoryKey } = defineProps<{
  categoryKey: CategoryKey
}>()

const route = useRoute()
const session = useSessionStore()

const category = computed(() => session.getCategory(categoryKey))
const recipeEntries = computed(() => category.value?.recipes
  .groupedBy((val: RecipeSummary) => val.title.substring(0, 1).toLocaleUpperCase())
)

watch(category, async (value) => {
  route.meta.title.value = value ? `${value.emoji} ${value.title}` : undefined
}, { immediate: true })

onBeforeMount(() => {
  route.meta.showsLargeTitle.value = true
})
</script>

<template>
  <main v-if="category">
    <div :id="category.key" class="category-background"></div>
    
    <div class="headline">
      <h1>{{ category.emoji }}</h1>
      <h5>{{ category.title }}</h5>
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
@use '@/assets/styles/category-theme';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);

@include category-theme.backgrounds();

.headline {
  margin: 0;
  text-align: center;
  
  & > * {
    @extend .serif;
    margin: 0;
  }
}
</style>
