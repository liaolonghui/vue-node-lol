<template>
  <div>
    <h1>{{id ? '编辑物品' : '新建物品'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="model.name" required></el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    }
  },
  methods: {
    // 新建分类或编辑分类
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/items', this.model)
      }
      if (res.status === 200) {
        this.$router.push('/items/list')
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
    // 获取item信息
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    // 上传图片成功后
    afterUpload(res) {
      // this.model.icon = res.url
      this.$set(this.model, 'icon', res.url)
    },
  },
  created() {
    this.id && this.fetch()
  },
  // 防止复用的组件不刷新
  watch: {
    '$route': function (to){
      // 当访问‘新建’时应该把model重置
      if( to.path === '/items/create' ) {
        this.model = {}
      }
    }
  }
}
</script>