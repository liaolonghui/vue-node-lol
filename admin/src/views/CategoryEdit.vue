<template>
  <div>
    <h1>{{id ? '编辑分类' : '新建分类'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      model: {}
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('categories', this.model)
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
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetch()
  },
}
</script>