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
    <div class="top" :style="{'background-image': `url(${hero.banner})`}">
      <div class="info pl-2 pb-2 text-white h-100 d-flex flex-column jc-end">
        <span class="text-light-1 fs-md">{{hero.title}}</span>
        <span class="fs-xl py-2">{{hero.name}}</span>
        <span class="text-light-1 fs-md">{{hero.categories.map(v => v.name).join('/')}}</span>
        <div class="scores pt-1 d-flex ai-center" v-if="hero.scores">
          <span>难度</span>
          <span class="dotted bg-primary">{{hero.scores.difficult}}</span>
          <span>技能</span>
          <span class="dotted bg-blue">{{hero.scores.skills}}</span>
          <span>攻击</span>
          <span class="dotted bg-red">{{hero.scores.attack}}</span>
          <span>生存</span>
          <span class="dotted bg-green">{{hero.scores.survive}}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex jc-center ai-center h-100 no-hero">
    <h2>英雄不存在</h2>
    <router-link tag="div" to="/" class="bg-primary text-white text-center ml-3" style="width: 50px; height: 25px; line-height: 25px; border-radius: 25px;">首页</router-link>
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

<style lang="scss">
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: 100% auto;
    .info {
      background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.9));
      .scores {
        .dotted {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.8rem;
          text-align: center;
          border-radius: 50%;
          border: 0.0385rem solid #fff;
          margin: 0 0.25rem;
        }
      }
    }
  }
}

.no-hero {
  background: url(../assets/images/bg.jpg) no-repeat 0 0;
  background-size: cover;
  padding-top: 23.0769rem;
}
</style>