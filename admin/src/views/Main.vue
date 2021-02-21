<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: #dedded;">
      <el-menu router unique-opened :default-active="$route.path">
        <!-- 内容管理 -->
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
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
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 运营管理 -->
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>运营管理</template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 系统设置 -->
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
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
  .el-submenu__title {
    background-color: #ccc;
  }
</style>

<script>
  export default {
    data() {
      return {}
    }
  };
</script>