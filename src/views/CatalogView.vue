<script setup lang="ts">
import { computed } from 'vue'
import useSessionStore from '@/stores/session'
import VuetyForm from '@vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@/vueties/components/form/rows/VuetyPushFormRow.vue';

const session = useSessionStore()

const catalog = computed(() => session.catalog)
</script>

<template>
  <VuetyForm v-if="catalog">
    <VuetyFormSection 
      v-for="(section, sectionIndex) in catalog.sections"
      :key="sectionIndex"
      :title="section.title"
      :showsLargeTitle="true"
    >      
      <VuetyPushFormRow 
        v-for="(category, index) in section.categories.filter(c => c.recipes.length > 0)"
        :emoji="category.emoji"
        :key="index"
        :path="`category/${category.key}`"
        :title="category.title"
        :value="category.recipes.length"
      />
    </VuetyFormSection>
  </VuetyForm>
</template>

<style scoped lang="scss">
@use '@/assets/varties';
@use '@/assets/styles/category-theme';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);
@use '@vueties/styles/mixins';
@use '@design-tokens/typography';
@use '@design-tokens/palette';

h4 {
  text-align: center;
  margin-bottom: 1em;
}

:deep(.large-title *) {
  @extend .serif;
}
</style>
