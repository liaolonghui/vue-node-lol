const { populate } = require('../../models/Category')

module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const Category = require('../../models/Category')

  // 创建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 编辑分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 分类列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    // 为分类模块时populate
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)  // .limit(10)
    res.send(items)
  })
  // 获取分类详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}