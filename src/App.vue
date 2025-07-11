<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import VuetyScene from './vueties/scenes/VuetyScene.vue'
import { type VuetyNavigationBarVM } from './vueties/components/bars/view-models';
import { Icon } from './assets/design-tokens/iconography';
import { loadCatalog } from './services/content-provision';
import VuetyProgressIndicator from '@/vueties/components/misc/VuetyProgressIndicator.vue';

const isLoading = ref(true)

const navBarVM: VuetyNavigationBarVM = {
  isVisible: true,
  rightBarItems: [
    {
      icon: Icon.Scale,
      isEnabled: false,
      path: '/calculator'
    },
  ]
}

onBeforeMount(async () => {
  await loadCatalog()
  
  isLoading.value = false
})
</script>

<template>
  <VuetyScene :navigationBarVM="navBarVM" />
  
  <VuetyProgressIndicator v-if="isLoading" />
</template>

<style scoped lang="scss">
@use '@vueties/styles/mixins';

.vuety-progress-indicator {
  margin: auto;
  width: 3em;
  @include mixins.position(absolute, 0, 0, 0, 0);
}
</style>
