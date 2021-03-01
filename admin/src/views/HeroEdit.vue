<template>
  <div>
    <h1>{{id ? '编辑英雄' : '新建英雄'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="英雄名称" style="width: 380px;">
            <el-input v-model="model.name" required></el-input>
          </el-form-item>
          <el-form-item label="称号" style="width: 380px;">
            <el-input v-model="model.title" required></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
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
        </el-tab-pane>
        <!-- 技能信息 -->
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"/> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="11" style="border: 1px solid #ccc; padding: 1rem; margin: 1rem;" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 最佳搭档信息 -->
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"/> 添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="11" style="border: 1px solid #ccc; padding: 1rem; margin: 1rem;" v-for="(item, i) in model.partners" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option v-for="hero in heroes" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
      categories: [],  // 类型
      items: [],  // 物品,
      heroes: [],  // 英雄
      model: {
        name: '',
        title: '',
        avatar: '',
        categories: [],
        scores: {  // model.scores.XXX这样的多层级使用时必须先把scores先定义好。
          difficult: 0
        },
        skills: [],
        partners: []
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
    },
    // 获取物品列表
    async fetchHeroes() {
      const res = await this.$http.get('rest/heroes')
      this.heroes = res.data
    }
  },
  created() {
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes()
    this.id && this.fetch()
  },
  // 防止复用的组件不刷新
  watch: {
    '$route': function (to){
      // 当访问‘新建’时应该把model重置
      if( to.path === '/heroes/create' ) {
        this.model = {
          name: '',
          title: '',
          avatar: '',
          categories: [],
          scores: {},  // model.scores.XXX这样的多层级使用时必须先把scores先定义好。
          skills: [],
          partners: []
        }
      }
    }
  }
}
</script>