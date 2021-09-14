---
title: 模拟简单的节流
date: 2021-05-06
tags:
 - js
categories:
 - js
---
``` js
<!--
 * @Description: 模拟简单的节流
-->
function throttle(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            return false
        }
        timer = setTimeout((...args) => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}
```