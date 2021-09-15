---
title: webpack自定义loader
date: 2021-08-20
tags:
 - webpack
categories:
 - js
---
## 1.介绍
loader本质上是一个函数。webpack引入loader将无法识别的内容转换成js。

## 2.同步loader
**loader1.js**

<<< @/blogs/webpack/loaders/loader1.js

## 3.异步loader
**loader2.js**

<<< @/blogs/webpack/loaders/loader2.js

## 4.loader的参数获取以及校验
>`const { getOptions } = require('loader-utils');` // 可以获取loader中的参数  
>`const { validate } = require('schema-utils');` // 可以校验参数
**loader3.js**

<<< @/blogs/webpack/loaders/loader3.js

**schema.json**

<<< @/blogs/webpack/loaders/schema.json

## 5.模拟babel-loader
**babelLoader.js**

<<< @/blogs/webpack/loaders/babelLoader.js

**babelSchema.json**

<<< @/blogs/webpack/loaders/babelSchema.json

## 6.webpack配置
**webpack.config.js**

<<< @/blogs/webpack/loaders/webpack.config.js