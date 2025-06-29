<script setup lang="ts">
import { Icon } from './assets/design-tokens/iconography';
import { VuetyNavigationBarVM } from '@vueties/components/bars/view-models';
import VuetyScene from './vueties/scenes/VuetyScene.vue'

const navBarVM: VuetyNavigationBarVM = {
  isVisible: true,
  rightBarItems: [
    {
      icon: Icon.Scale,
      isEnabled: true,
      path: '/datasheet'
    }
  ]
}
</script>

<template>
  <VuetyScene :navigationBarVM="navBarVM" />
</template>

<style scoped lang="scss">
</style>
