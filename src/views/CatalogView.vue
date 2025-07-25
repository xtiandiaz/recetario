<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import useContentStore from '@/stores/content'
import VuetyForm from '@vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@/vueties/components/form/rows/VuetyPushFormRow.vue';

const route = useRoute()
const content = useContentStore()

const catalog = computed(() => content.catalog)

onMounted(() => {
  route.meta.setTitle('– Recetario –')
})
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
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);

h4 {
  text-align: center;
  margin-bottom: 1em;
}
</style>
