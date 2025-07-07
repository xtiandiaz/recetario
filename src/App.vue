<script setup lang="ts">
import { Icon } from './assets/design-tokens/iconography';
import { type VuetyNavigationBarVM } from '@vueties/components/bars/view-models';
import VuetyScene from './vueties/scenes/VuetyScene.vue'

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
</script>

<template>
  <VuetyScene :navigationBarVM="navBarVM" />
</template>

<style scoped lang="scss">
</style>
