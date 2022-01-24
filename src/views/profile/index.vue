<template>
  <div class="">
    {{ $t('msg.test') }}
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <Input v-model="uname" />
    <h2>{{ uname }}</h2>
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary" v-permission="['addUser']">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
      <el-button>中文</el-button>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/Input'
const uname = ref('')
</script>

<style lang="scss" scoped></style>
