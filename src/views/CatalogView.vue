<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getCatalog } from '@/services/content-provision';

const router = useRouter()

const catalog = getCatalog()
</script>

<template>
  <main>
    <section 
      v-for="(section, sectionIndex) in catalog.sections"
      :key="sectionIndex"
    >
      <h3 class="serif">{{ section.title }}</h3>
      <div class="cards">
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
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/varties';
@use '@/assets/styles/category-theme';
@use '@vueties/components/bars/styles' as bar-styles;
@use '@vueties/styles/mixins';
@use '@design-tokens/typography';
@use '@design-tokens/palette';

$card-gap: 0.75em;

main {
  margin: 0 auto;
  max-width: 720px;
}

h3 {
  text-align: center;
}

section {
  $h-margin: 1em;
  
  margin: 1em $h-margin;
  padding: 0;
  width: calc(100% - $h-margin * 2);
  
  .cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $card-gap;
  }
}

.category-card {
  $h-padding: 1.5em;
  
  border: none;
  border-radius: 1em;
  display: inline-block;
  flex: 1 1 calc(50% - $card-gap - $h-padding * 2);
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
