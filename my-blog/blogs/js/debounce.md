---
title: 模拟简单的防抖
date: 2021-05-05
tags:
 - js
categories:
 - js
---
``` js
<!--
 * @Description: 模拟简单的防抖
-->
function debounce(func, wait) {
    var timeout
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout((...arg) => {
            timeout = null
            func.apply(this, ...arg)
        }, wait)
    }
}
```