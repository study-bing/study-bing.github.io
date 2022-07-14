---
title: 限制并发数量
date: 2022-01-15
tags:
  - 练习
categories:
  - js基础
---

## 1.题目

异步请求 n 个 限制个数 m 个

## 2.解答

```js
class LimitPromise {
  constructor(urls = [], max) {
    this.urls = urls
    this.max = max
    this.count = 1
  }
  start() {
    if (!this.max) {
      return
    }
    while (this.count <= this.max && this.urls.length > 0) {
      this.count++
      this.testPromise(this.urls.shift())
    }
  }
  testPromise(url) {
    setTimeout(() => {
      console.log(url)
      this.count--
      this.start()
    }, url * 1000)
  }
}
let urls = [6, 3, 2, 1, 2]
let limit = new LimitPromise(urls, 2)
limit.start()
```
