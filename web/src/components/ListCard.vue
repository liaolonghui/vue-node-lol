<template>
  <m-card :title="title" :icon="icon">  <!-- card-header -->
    <!-- card-body-nav -->
    <div class="nav jc-between">
      <!-- i与active一致的那一项加上active样式类 -->
      <div class="nav-item" :class="{active: active === i}" @click="active = i" v-for="(category, i) in categories" :key="i">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <!-- card-body-swiper -->
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0   // 默认第一个高亮
    }
  },
}
</script>