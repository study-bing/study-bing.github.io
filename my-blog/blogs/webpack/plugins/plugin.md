---
title: webpack自定义plugin
date: 2021-12-16
tags:
 - webpack基础
categories:
 - webpack
---
## 1.介绍
webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象

## 2.编译完提示
**webpack-plugin.js**

<<< @/blogs/webpack/loaders/webpack-plugin.js
