<template>
  <div>
    <h1>{{id ? '编辑广告位' : '新建广告位'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name" required></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"/> 添加广告</el-button>
        <el-row type="flex" style="flex-wrap: wrap;">
          <el-col :md="24" style="border: 1px solid #ccc; padding: 1rem; margin: 1rem;" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接(URL)" style="margin-bottom: 1rem;">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        name: '',
        items: []
      },
    }
  },
  methods: {
    // 新建广告位或编辑广告位
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/ads', this.model)
      }
      if (res.status === 200) {
        this.$router.push('/ads/list')
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
    // 获取广告位信息
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
  },
  created() {
    this.id && this.fetch()
  },
  // 防止复用的组件不刷新
  watch: {
    '$route': function (to){
      // 当访问‘新建’时应该把model重置
      if( to.path === '/ads/create' ) {
        this.model = {
          name: '',
          items: []
        }
      }
    }
  }
}
</script>

<style>
  
</style>