// 广告位
// 每一个广告位有好几个广告
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 广告位名称
  name: { type: String },
  // 广告位所含广告（可有多个）
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schema)