<template>
  <div class="navbar">
    <!--汉堡按钮-->
    <hamburger class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <header-search class="right-menu-item hover-effect"></header-search>
      <screen-full class="right-menu-item hover-effect"></screen-full>
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <lang-select class="right-menu-item hover-effect"></lang-select>

      <!--头像-->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avarar-wrapper">
          <el-avatar
            shape="square"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <!-- <i class="el-icon-s-tools"></i> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>主页</el-dropdown-item>
            <el-dropdown-item @click="logout">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import hamburger from '@/components/Hamburger'
import breadcrumb from '@/components/Breadcrumb'
import langSelect from '@/components/LangSelect'
import themeSelect from '@/components/ThemeSelect'
import screenFull from '@/components/Screenfull'
import headerSearch from '@/components/HeaderSearch'
const store = useStore()
const logout = () => {
  store.dispatch('user/logoutAction')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .breadcrumb-container {
    float: left;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
