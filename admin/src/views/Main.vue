<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: #dedded;">
      <el-menu router :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: left; height: 88px;">
        <span>英雄联盟（伪）后台管理</span>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    background-color: #4499D5;
    color: #eee;
    line-height: 88px;
  }
  .el-header span {
    font-size: 30px;
    font-weight: bold;
  }
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {}
    }
  };
</script>