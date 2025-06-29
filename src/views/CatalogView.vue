<script setup lang="ts">
import { getCatalog } from '@/services/content-provider';

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
        >
          <label>
            <h1>{{ category.emoji }}</h1>
            <h6>{{ category.title }}</h6>
          </label>
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/components/bars/styles' as bar-styles;
@use '@design-tokens/palette';

$card-gap: 0.75em;

main {
  margin: 0 auto;
  max-width: 720px;
  height: calc(100% - bar-styles.$nav-bar-height);
  overflow: auto;
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
  
  flex: 1 1 calc(50% - $card-gap - $h-padding * 2);
  padding: 1.5em $h-padding;
  
  label {
    text-align: left;
    
    h1, h6 {
      margin: 0
    }
  }
}
</style>
