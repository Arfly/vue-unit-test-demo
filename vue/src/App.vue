<script setup lang="ts">
import { ref } from 'vue';
import Test from './components/Test.vue';

const input = ref('')

</script>

<template>
  <Test v-model="input"></Test>
</template>
