<template>
  <div>
    <h1>{{id ? '编辑分类' : '新建分类'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  methods: {
    // 新建分类或编辑分类
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/categories', this.model)
      }
      if (res.status === 200) {
        this.$router.push('/categories/list')
        this.$message({
          type: 'success',
          message: `${this.id ? '编辑' : '保存'}成功！`
        })
      } else {
        this.$message({
          type: 'error',
          message: `${this.id ? '编辑' : '保存'}失败！`
        })
      }
    },
    // 获取分类信息
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    // 获取分类可选父级选项（即获取所有分类列表）
    async fetchParents() {
      const res = await this.$http.get('rest/categories')
      this.parents = res.data
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  },
  // 防止复用的组件不刷新
  watch: {
    '$route': function (to){
      // 当访问‘新建’时应该把model重置
      if( to.path === '/categories/create' ) {
        this.model = {}
      }
    }
  }
}
</script>