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
      <h4 class="serif">{{ section.title }}</h4>
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
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 720px;
}

h4 {
  text-align: center;
  margin-bottom: 1em;
}

section {
  $h-margin: 1em;
  
  box-sizing: border-box;
  margin: 3em $h-margin 1em $h-margin;
  padding: 0;
  
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
