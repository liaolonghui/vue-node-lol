<template>
  <el-card>
    <h1>{{id ? '编辑管理员' : '新建管理员'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username" style="width: 20rem;" required></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" style="width: 20rem;" type="password" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
    // 新建管理员或编辑管理员
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/admin_users', this.model)
      }
      if (res.status === 200) {
        this.$router.push('/admin_users/list')
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
    // 获取管理员信息
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.id && this.fetch()
  },
  // 防止复用的组件不刷新
  watch: {
    '$route': function (to){
      // 当访问‘新建’时应该把model重置
      if( to.path === '/admin_users/create' ) {
        this.model = {}
      }
    }
  }
}
</script>