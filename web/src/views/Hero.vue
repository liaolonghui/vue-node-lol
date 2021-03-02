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
    <!-- end of top -->
    <div>
      <div class="bg-white px-3 pt-1">
        <div class="nav d-flex jc-around py-2 border-bottom">
          <div class="nav-item" :class="{active: active === 0}" @click="$refs.mySwiper.$swiper.slideTo(0)">
            <div class="nav-link">英雄详情</div>
          </div>
          <div class="nav-item" :class="{active: active === 1}" @click="$refs.mySwiper.$swiper.slideTo(1)">
            <div class="nav-link">更多信息</div>
          </div>
        </div>
      </div>
      <!-- swiper -->
      <swiper ref="mySwiper" @slide-change="() => active=$refs.mySwiper.$swiper.realIndex">
        <swiper-slide>
          <div>
            <div class="bg-white pt-2 pb-3 border-bottom">
              <!-- router -->
              <div class="d-flex jc-around px-3">
                <router-link to="/about" tag="button" class="flex-1 btn btn-lg fs-md">
                  <i class="iconfont icon-LOLyuanxing text-primary pr-2"></i>
                  <span>更多英雄</span>
                </router-link>
                <router-link to="/about" tag="button" class="flex-1 btn btn-lg ml-2">
                  <i class="iconfont icon-menu text-primary pr-2"></i>
                  <span>了解装备</span>
                </router-link>
              </div>
              <!-- skills -->
              <!-- skills不为空数组时展示 -->
              <div class="skills mt-4" v-if="hero.skills.length">
                <div class="d-flex jc-around">
                  <img :src="item.icon" v-for="(item, i) in hero.skills" :key="i" @click="currentIndex = i" class="icon" :class="{active: currentIndex === i}">
                </div>
                <div class="px-3">
                  <h3>{{currentSkill.name}}</h3>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p>小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <!-- 出装 -->
            <m-card title="出装推荐" icon="menu" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around mt-3 pb-2 border-bottom">
                <div v-for="item in hero.items1" :key="item._id">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs text-center">{{item.name}}</div>
                </div>
              </div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around mt-3">
                <div v-for="item in hero.items2" :key="item._id">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs text-center">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <!-- 其他 -->
            <m-card title="使用技巧" icon="menu">
              <p class="m-0">{{hero.usageTips}}</p>
            </m-card>
            <m-card title="对线技巧" icon="menu">
              <p class="m-0">{{hero.battleTips}}</p>
            </m-card>
            <m-card title="团战思路" icon="menu">
              <p class="m-0">{{hero.teamTips}}</p>
            </m-card>
            <!-- 英雄关系 -->
            <m-card title="英雄关系" icon="LOLyuanxing" class="mb-1">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in hero.partners" :key="item.name" class="mt-3 d-flex">
                <img :src="item.hero.avatar" width="50" height="50" style="border-radius: 50%;">
                <p class="flex-1 ml-3">{{item.description}}</p>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div><h1>NO MORE</h1></div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      active: 0,
      hero: null,
      currentIndex: 0
    }
  },
  computed: {
    currentSkill() {
      return this.hero.skills[this.currentIndex]
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
@import '../assets/scss/variables.scss';

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

// skillImgs
.skills {
  img.icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid map-get($map: $colors, $key: 'white');
    &.active {
      border-color: map-get($map: $colors, $key: 'primary');
    }
  }
}

.hero-items {
  img.icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}

</style>