<template>
  <!-- 当article中有数据时才渲染 -->
  <div class="page-article" v-if="article">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-back fs-lg text-blue"></i>
      <strong class="flex-1 pl-2 text-blue">{{article.title}}</strong>
      <div class="text-grey fs-sm">{{article.updatedAt.slice(0,10)}}</div>
    </div>
    <!-- 内容 -->
    <div v-html="article.body" class="px-3 fs-lg body"></div>
    <!-- 底部相关资讯 -->
    <div class="px-3 py-3 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <strong class="pl-2 text-blue">相关资讯</strong>
      </div>
      <div class="fs-lg">
        <router-link tag="div" :to="`/article/${item._id}`" v-for="item in article.related" :key="item._id" class="mt-2 text-blue">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
  <!-- 没数据时 -->
  <div v-else>
    <h2>不存在此文章</h2>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      article: null
    }
  },
  methods: {
    async fetchArticle() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.article = res.data
    }
  },
  created() {
    this.fetchArticle()
  },
}
</script>

<style lang="scss">
.page-article {
  .body {
    line-height: normal;
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>