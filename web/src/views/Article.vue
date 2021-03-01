<template>
  <!-- 当article中有数据时才渲染 -->
  <div class="page-article" v-if="article">
    <div class="d-flex py-3 px-2">
      <i class="iconfont icon-back fs-md"></i>
      <strong class="flex-1">{{article.title}}</strong>
      <div class="text-grey fs-sm">{{article.updatedAt.slice(0,10)}}</div>
    </div>
    <!-- 内容 -->
    <div v-html="article.body"></div>
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