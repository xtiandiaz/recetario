<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import VuetyScene from './vueties/scenes/VuetyScene.vue'
import { type VuetyNavigationBarVM } from './vueties/components/bars/view-models';
import { Icon } from './assets/design-tokens/iconography';
import { loadContent } from './services/content-provision';
import VuetyProgressIndicator from '@/vueties/components/misc/VuetyProgressIndicator.vue';

const isLoading = ref(true)

const navBarVM: VuetyNavigationBarVM = {
  isVisible: true,
  rightBarItems: [
    {
      icon: Icon.Scale,
      path: '{current}/inventory'
    },
  ]
}

onBeforeMount(async () => {
  await loadContent()
  
  isLoading.value = false
})
</script>

<template>
  <VuetyScene v-if="!isLoading" :navigationBarVM="navBarVM" />
  <VuetyProgressIndicator v-else />
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.vuety-progress-indicator {
  margin: auto;
  @include vs.size(3em);
  @include vs.position(absolute, 0, 0, 0, 0);
}
</style>
