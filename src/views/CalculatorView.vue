<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import VuetyForm from '@vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import VuetyInfoFormRow from '@/vueties/components/form/rows/VuetyInfoFormRow.vue';
import '@/assets/tungsten/extensions/array.extensions'

const route = useRoute()

onMounted(() => {
  route.meta.title.value = 'Calculadora'
})
</script>

<template>
  <VuetyForm>
    <h1 class="large-title">Calculadora</h1>
    <VuetyFormSection>
      <VuetyInfoFormRow 
        v-for="(val, index) of Array.range(0, 20, 1)" 
        :key="index"
        :title="val.toString()"
      />
    </VuetyFormSection>
  </VuetyForm>
</template>

<style scoped lang="scss">

</style>
