module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-lol', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.log('连接数据库失败：' + err)
    } else {
      console.log('连接数据库成功')
    }
  })

  // 防止当A模型种关联了B模型但没有引入B模型，有时会出错
  require('require-all')(__dirname + '/../models')
}