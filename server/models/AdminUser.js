const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  // 密文保存password（为了保护用户隐私）   
  password: {
    type: String,
    // 设置为不可查询
    select: false,
    // 散列
    set(val) {
      return require('bcrypt').hashSync(val, 10)  // 一般10-12
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)