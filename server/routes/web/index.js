module.exports = app => {
  const router = require('express').Router()
  // 因为已经全部require-all了  所以直接用mongoose.model()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

  router.get('/news/list', async (req, res) => {
    // 用populate则获取出来的数据可能会分布不均匀（有新闻，公告，活动，赛事等多个分类，如果需要每个分类都只要5条数据则有些问题）
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    // 聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    // 热门
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).limit(5).lean()
    })
    // 对cats再处理一下
    cats.map(cat => {
      cat.newsList.map(news => {
        // 让每一个新闻都有一个分类名
        news.categoryName = cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  router.get('/heroes/list', async (req, res) =>{
    const heroCategory = await Category.findOne({
      name: '英雄分类'
    })
    // 聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: heroCategory._id } },
      {
        $lookup: {
          from: 'heros',    // 因为mongoose默认存储的集合名只加s
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      },
    ])
    // 热门
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })
    
    res.send(cats)
  })

  app.use('/web/api', router)
}