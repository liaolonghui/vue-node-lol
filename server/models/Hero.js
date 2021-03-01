const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 名称
  name: { type: String },
  // 称号
  title: { type: String },
  // 头像
  avatar: { type: String },
  // 英雄原画
  banner: { type: String },
  // 分类
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],  // 数组类型，里面可有多个category对象
  // 打分
  scores: {   // 对象类型，每个对象有好几个属性
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  // 技能
  skills: [{   //数组类型，里面可有多个对象，每个对象有icon、name、description等属性
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 逆风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 使用技巧
  usageTips: { type: String },
  // 对线技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 英雄关系（此处仅有'最佳搭档'）
  partners: [{    // 数组类型，内含多个对象，每个对象有hero、description。
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)