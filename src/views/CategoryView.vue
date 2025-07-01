<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { CategoryKey } from '@/models/catalog';
import { getCategory } from '@/services/content-provision';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@vueties/components/form/rows/VuetyPushFormRow.vue';
import { recipeTitle } from '@/utils/catalog.utils';

const props = defineProps<{
  cKey: CategoryKey
}>()

const route = useRoute()

const category = computed(() => getCategory(props.cKey)!)
const recipeEntries = computed(() => category.value.recipes
  .map(rk => { return { key: rk, title: recipeTitle(rk) } })
  .sort((a, b) => a.title.localeCompare(b.title))
)

onMounted(() => {
  // route.meta.title!.value = category?.title
})
</script>

<template>
  <main>
    <div :id="category.key" class="category-background"></div>
    
    <VuetyForm>
      <h3 class="serif">{{ category.emoji }} {{ category.title }}</h3>
      <VuetyFormSection>
        <VuetyPushFormRow
          v-for="(recipeEntry, index) in recipeEntries"
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

h3 {
  margin: 0;
  text-align: center;
}
</style>
