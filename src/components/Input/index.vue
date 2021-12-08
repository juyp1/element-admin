<template>
  <el-input :model-value="modelValue" @input="change"></el-input>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const change = (e) => {
  console.log(e)
  emit('update:modelValue', e)
}
</script>

<style lang="scss" scoped></style>
