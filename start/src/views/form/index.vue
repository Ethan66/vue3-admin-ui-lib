<template>
  <div>
    <form-wrap :form="configs.$dialog" ref="formWrapRef" />
    <el-button @click="onClick" type="primary">提交</el-button>
    <el-button @click="formWrapRef.formRef.resetFields()">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import pageConfig from './config'

const configs = reactive(pageConfig())
const formWrapRef = ref()

const onClick = () => {
  formWrapRef.value.formRef.validate((valid: boolean) => {
    console.warn('----- my data is valid: ', valid)
  })
}
</script>

<style scoped></style>
