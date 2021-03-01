<template>
  <div class="page-hero" v-if="hero">
    <!-- topbar -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/images/logo.jpg" height="30">
      <div class="px-2 flex-1">
        <span>英雄联盟</span>
        <span class="ml-3">攻略站</span>
      </div>
      <router-link tag="span" to="/">更多英雄 &gt;</router-link>
    </div>
    <!-- 具体详情 -->
    <div>{{hero.name}}</div>
  </div>
  <div v-else>
    <h2>英雄不存在</h2>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      hero: null
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.hero = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>