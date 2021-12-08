<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="ruleFormValidate"
      :model="formdata"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          :placeholder="$t('msg.login.usernameRule')"
          name="username"
          type="text"
          v-model="formdata.username"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          :placeholder="$t('msg.login.passwordRule')"
          name="password"
          :type="passwordType"
          v-model="formdata.password"
        ></el-input>
        <span class="show-pwd" @click="onChangePwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>
      <!--登录按钮-->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="onChangeSubmit"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
// import formRules from './rules'

import LangSelect from '@/components/LangSelect/'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const passwordType = ref('password')
const ruleFormValidate = ref(null)
const store = useStore()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.passwordRule')
    }
  ]
})
const formdata = ref({
  username: '',
  password: ''
})

const onChangePwd = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password')
}
const onChangeSubmit = () => {
  ruleFormValidate.value.validate((valid) => {
    if (valid) {
      store.dispatch('user/loginAction', formdata.value).then((res) => {
        store.dispatch('user/getUserInfoAction')
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .tips {
      font-size: 16px;
      color: white;
      line-height: 24px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  ::v-deep .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  ::v-deep .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  ::v-deep .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
