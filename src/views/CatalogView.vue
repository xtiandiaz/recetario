<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import useSessionStore from '@/stores/session'
import VuetyForm from '@vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@/vueties/components/form/rows/VuetyPushFormRow.vue';

const router = useRouter()
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
      
      <!-- <div class="cards">
        <button
          v-for="(category, index) in section.categories.filter(c => c.recipes.length > 0)"
          :key="index"
          :id="category.key"
          class="category-card"
          @click="router.push(`category/${category.key}`)"
        >
          <label>
            <span class="h1">{{ category.emoji }}</span>
            <h6>{{ category.title }}</h6>
          </label>
        </button>
      </div> -->
    </VuetyFormSection>
  </VuetyForm>
</template>

<style scoped lang="scss">
@use '@/assets/varties';
@use '@/assets/styles/category-theme';
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 720px
);
@use '@vueties/components/bars/styles' as bar-styles;
@use '@vueties/styles/mixins';
@use '@design-tokens/typography';
@use '@design-tokens/palette';

$card-gap: 0.75em;

h4 {
  text-align: center;
  margin-bottom: 1em;
}

:deep(.large-title) {
  @extend .serif;
}

.category-card {
  $h-padding: 1.5em;
  
  border: none;
  border-radius: 1em;
  display: inline-block;
  box-sizing: border-box;
  flex: 1 1 calc(50% - $card-gap);
  font-size: 1em;
  padding: 1.5em $h-padding;
  @include category-theme.thematize('cards');
  
  label {
    h6 {
      margin: 0
    }
  }
}
</style>
