<template>
  <div class="home">
    <!-- swiper -->
    <!-- this.$refs.mySwiper.$swiper -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <a style="display: block; width: 100%;" href="https://lol.qq.com/act/a20210205lunarbeast/index.html"><img class="w-100" src="../assets/images/swiper01.jpeg"></a>
      </swiper-slide>
      <swiper-slide>
        <a style="display: block; width: 100%;" href="https://lol.qq.com/act/a20210205lunarbeast/pass.html"><img class="w-100" src="../assets/images/swiper02.png"></a>
      </swiper-slide>
      <swiper-slide>
        <a style="display: block; width: 100%;" href="https://lolriotmall.qq.com/act/a20210114spring/page3.html"><img class="w-100" src="../assets/images/swiper03.jpeg"></a>
      </swiper-slide>
      <swiper-slide>
        <a style="display: block; width: 100%;" href="http://lol.qq.com/act/a20210122sale/"><img class="w-100" src="../assets/images/swiper04.jpeg"></a>
      </swiper-slide>
      <div class="pagination-home text-right px-3" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <!-- nav-icons -->
    <div class="nav-icons bg-white mt-3 text-center pt-4">
      <div class="d-flex flex-wrap">
        <a href="https://lol.qq.com/act/a20180418yxny/" class="nav-item mb-4">
          <i class="sprite sprite-news"></i>
          <div class="fs-sm py-2">玩家服务</div>
        </a>
        <a href="https://lol.qq.com/act/a20181124novel/?ADTAG=innercop.lol.web.top" class="nav-item mb-4">
          <i class="sprite sprite-story"></i>
          <div class="fs-sm py-2">电竞小说</div>
        </a>
        <a href="https://lolriotmall.qq.com/index.shtml" class="nav-item mb-4">
          <i class="sprite sprite-market"></i>
          <div class="fs-sm py-2">周边商城</div>
        </a>
        <a href="https://lol.qq.com/act/a20191210super/index.shtml" class="nav-item mb-4">
          <i class="sprite sprite-tyf"></i>
          <div class="fs-sm py-2">峡谷之巅</div>
        </a>
        <a href="https://lol.qq.com/data/info-heros.shtml" class="nav-item mb-4">
          <i class="sprite sprite-new"></i>
          <div class="fs-sm py-2">游戏资料</div>
        </a>
        <a href="https://yz.lol.qq.com/zh_CN/" class="nav-item mb-4">
          <i class="sprite sprite-world"></i>
          <div class="fs-sm py-2">瓦罗兰宇宙</div>
        </a>
        <a href="https://yz.lol.qq.com/zh_CN/champions/" class="nav-item mb-4">
          <i class="sprite sprite-yd"></i>
          <div class="fs-sm py-2">英雄故事</div>
        </a>
        <a href="https://lol.qq.com/gicp/news/423/2/1334/1.html" class="nav-item mb-4">
          <i class="sprite sprite-vertion"></i>
          <div class="fs-sm py-2">版本介绍</div>
        </a>
        <a href="https://101.qq.com/?ADTAG=cooperation.glzx.web" class="nav-item mb-4">
          <i class="sprite sprite-battle"></i>
          <div class="fs-sm py-2">对局环境</div>
        </a>
        <a href="https://bbs.lol.qq.com/forum.php" class="nav-item mb-4">
          <i class="sprite sprite-talk"></i>
          <div class="fs-sm py-2">官方论坛</div>
        </a>
        <a href="https://lol.qq.com/act/a20190507lolbdzx/index.html" class="nav-item mb-4">
          <i class="sprite sprite-wx"></i>
          <div class="fs-sm py-2">绑定微信</div>
        </a>
      </div>
      <!-- 拉条 -->
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->
    <!-- news -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <!-- 对 对应的某一项新闻分类（如新闻，公告，活动，赛事）的数据 进行布局 -->
      <template #items="{category}">
        <router-link tag="div" :to="`/article/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
          <span class="text-primary">[{{news.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-dark pr-2 text-ellipsis">{{news.title}}</span>
          <span class="text-grey fs-md">{{news.updatedAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card title="英雄列表" icon="LOLyuanxing" :categories="heroCats">
      <!-- 对 对应的某一项英雄分类（如战士，法师，刺客，坦克，射手，辅助）的数据 进行布局 -->
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/hero/${hero._id}`" class="p-2 text-center" style="width: 20%" v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100" />
            <span>{{hero.name}}</span>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card class="my-3" title="精彩视频" icon="news">
      <h2 class="text-center">无了......</h2>
    </m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Home',
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        }
      },
      // 新闻分类数据
      newsCats: [],
      // 英雄分类数据
      heroCats: []
    }
  },
  methods: {
    // 获取newsCats
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    // 获取heroCats
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.pagination-home {
  position: absolute;
  z-index: 10;
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    background-color: map-get($map: $colors, $key: 'white');
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background-color: map-get($map: $colors, $key: 'primary');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    display: block;
    text-decoration: none;
    color: map-get($map: $colors, $key: 'grey-1');
    font-weight: 550;
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>