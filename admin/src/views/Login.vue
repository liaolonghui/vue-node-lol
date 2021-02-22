<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form label-width="4rem" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" required></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" required type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      // 保存token      localStorage.token = res.data.token      localStorage.setItem('token', res.data.token)
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  },
}
</script>

<style>
.login-container {
  box-sizing: border-box;
  padding: 10rem;
  height: 100%;
  background: url('../assets/login_bg.jpg') no-repeat;
  background-position: 0 -8rem;
}
.login-card {
  width: 30rem;
  margin: 0 auto;
  opacity: 0.96;
}
</style>