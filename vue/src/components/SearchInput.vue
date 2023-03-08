<template>
  <div class="search-input-container">
    <el-input
      v-model="inputVal"
      class="input"
      @input="handleChange()"></el-input>
    <el-button
      class="search"
      type="primary"
      size="default"
      @click="handleSearch()">Search</el-button>
    <el-button
      class="reset"
      type="primary"
      size="default"
      @click="resetSearch()">Reset</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits(['update:modelValue', 'search'])
const inputVal = ref('')

watch(
  () => props.modelValue,
  () => {
    inputVal.value = props.modelValue
  },
  {
    immediate: true
  }
)

const handleChange = () => {
  emits('update:modelValue', inputVal.value)
}

const resetSearch = () => {
  inputVal.value = ''
  emits('update:modelValue', inputVal.value)
}

const handleSearch = () => {
  emits('search', inputVal.value)
}
</script>

<style scoped></style>
