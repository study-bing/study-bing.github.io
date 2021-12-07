---
title: 模拟简单的防抖
date: 2021-05-05
tags:
 - js基础
categories:
 - js
---
## 1.函数防抖
（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时

## 2.模拟简单的防抖
``` js
function debounce(func, wait) {
    var timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            func.apply(this, args)
        }, wait)
    }
}
```