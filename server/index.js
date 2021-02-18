const express = require('express')

const app = express()

app.use(require('cors')())  // 跨域
app.use(express.json())  // 为了可以直接使用req.body获取到前端传来的post数据
app.use('/uploads', express.static(__dirname + '/uploads'))  // 静态资源

// database
require('./plugins/db')(app)
// routes
require('./routes/admin')(app)

app.listen(3000, ()=>{
  console.log('监听于http://localhost:3000')
})