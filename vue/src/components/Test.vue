<template>
  <input
    v-model="inputVal"
    class="input"
    placeholder="Please input a phone number"
    @input="emits('update:modelValue', inputVal)" />
  <span
    v-show="status.length"
    class="status">
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emits = defineEmits(['update:modelValue'])
const inputVal = ref('')
const status = ref('')

watch(
  () => props.modelValue,
  () => {
    inputVal.value = props.modelValue
    const phoneNumber = Number(inputVal.value)

    if (inputVal.value) {
      const isNumber = !isNaN(phoneNumber)
      if (isNumber && inputVal.value.length !== 11) {
        status.value = 'Phone number length should be 11'
      }

      if (!isNumber && inputVal.value) {
        status.value = 'Please input a correct phone number'
      }

      if (isNumber && inputVal.value.length === 11) {
        if (/^1[3-9]\d{9}$/.test(inputVal.value)) {
          status.value = ''
        } else {
          status.value = 'Phone number is not acceptable'
        }
      }
    } else {
      status.value = ''
    }
  }
)
</script>

<style scoped>
.status {
  color: #f00;
}
</style>
