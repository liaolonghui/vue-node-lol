<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.jpg" height="30">
      <div class="px-2 flex-1">
        <div class="text-white">英雄联盟</div>
        <div class="text-grey-1 fs-xxs">充钱也不能变强</div>
      </div>
      <a href="https://lol.qq.com/download.shtml"><button type="button" class="btn bg-primary">立即下载</button></a>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav d-flex text-white jc-around pb-1" @click="onActive($event)">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/about">赛事中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/about">攻略中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    onActive(e) {
      if (e.target === e.currentTarget) return
      for (const iterator of e.currentTarget.childNodes) {
        iterator.classList.remove('active')
      }
      e.target.parentNode.classList.add('active')
    }
  },
}
</script>