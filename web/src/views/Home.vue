<template>
  <div class="home">
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
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
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
      }
    }
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
</style>