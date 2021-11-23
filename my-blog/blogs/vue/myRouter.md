---
title: 简陋版vue-router(嵌套路由)
date: 2021-11-24
tags:
    - vue
categories:
    - vue
---

## 1.介绍

本文简单的记录了一下 vue-router 在 vue2 中的实现原理  
1.注册  
2.hash 状态下的路由切换  
3.嵌套路由

## 2.思路

### 1.install

首先 VueRouter 挂一个 install 方法让 vue-router 注册，并且挂在到 vue 全局  
注册 router-link 和 router-view 组件

#### 1.install 根实例绑定

<<< @/blogs/vue/myRouter/install.js

#### 2.router-link

<<< @/blogs/vue/myRouter/components/link.js

#### 3.router-view

<<< @/blogs/vue/myRouter/components/view.js

### 2.VueRouter 类

#### 1.新建一个 VueRouter 类

1.初始化数据  
2.并运用 createMatcher 函数将数据处理  
3.根据 mode 生成 history 对象

<<< @/blogs/vue/myRouter/index.js

#### 2.createMatcher

1.动态添加路由  
2.用来匹配的方法

<<< @/blogs/vue/myRouter/create-matcher.js

### 3.createMatcher

得到一下数据  
pathList : [/, /about, /about/a]  
pathMap : {'/': xxx, '/about': xxx, '/about/a': xxx}

<<< @/blogs/vue/myRouter/create-route-map.js

### 3.history

#### 1.基层 History 类

1.transitionTo 过渡页面的方法  
2.updateRoute 更新当前路径并执行回调  
3.listen 订阅者，存储回调事件并在 updateRoute 中执行  
4.createRoute 将路径变成{path: xxx, record: []}的格式，record 有每一层的路径对象，以便 router-view 渲染使用

<<< @/blogs/vue/myRouter/history/base.js

#### 2.HashHistory

1.setupListeners 监听 hash 变化函数  
2.getCurrentLocation 获取到当前 hash 值

<<< @/blogs/vue/myRouter/history/hash.js
