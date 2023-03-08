<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import SearchInput from './components/SearchInput.vue';

const input = ref('')
const handleSearch = (searchVal:string)=>{
  ElMessageBox.alert(searchVal)
}

</script>

<template>
  <SearchInput v-model="input" @search="handleSearch"></SearchInput>
  <p>{{ input }}</p>
</template>
