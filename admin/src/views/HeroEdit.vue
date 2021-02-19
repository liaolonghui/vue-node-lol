<template>
  <el-card>
    <h1>{{id ? '编辑英雄' : '新建英雄'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="英雄名称" style="width: 380px;">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="称号" style="width: 380px;">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + 'upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate style="margin-top: 0.7rem" v-model="model.scores.difficult" :max="9" show-score></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate style="margin-top: 0.7rem" v-model="model.scores.skills" :max="9" show-score></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate style="margin-top: 0.7rem" v-model="model.scores.attack" :max="9" show-score></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate style="margin-top: 0.7rem" v-model="model.scores.survive" :max="9" show-score></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="model.items1" multiple>
          <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="逆风出装">
        <el-select v-model="model.items2" multiple>
          <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧" style="width: 600px;">
        <el-input type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
      <el-form-item label="对线技巧" style="width: 600px;">
        <el-input type="textarea" v-model="model.battleTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路" style="width: 600px;">
        <el-input type="textarea" v-model="model.teamTips"></el-input>
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
      categories: [],  // 类型
      items: [],  // 物品
      model: {
        name: '',
        title: '',
        avatar: '',
        categories: [],
        scores: {  // model.scores.XXX这样的多层级使用时必须先把scores先定义好。
          difficult: 0
        },
      },
    }
  },
  methods: {
    // 新建分类或编辑分类
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/heroes', this.model)
      }
      if (res.status === 200) {
        this.$router.push('/heroes/list')
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
    // 获取hero信息
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // this.model = res.data   此时不要直接赋值，不然在后端返回的数据中没有scores时会报错
      this.model = Object.assign({}, this.model, res.data)
    },
    // 上传图片成功后
    afterUpload(res) {
      this.model.avatar = res.url      
      // this.$set(this.model, 'avatar', res.url)     如果是新增属性则有响应式问题，所以用this.$set
    },
    // 获取分类列表
    async fetchCategories() {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    // 获取物品列表
    async fetchItems() {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    }
  },
  created() {
    this.fetchCategories()
    this.fetchItems()
    this.id && this.fetch()
  },
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>