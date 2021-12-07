---
title: 模拟简单的节流
date: 2021-05-06
tags:
 - js基础
categories:
 - js
---
## 1.函数节流
（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
## 2.模拟简单的节流
``` js
function throttle(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            return false
        }
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}
```