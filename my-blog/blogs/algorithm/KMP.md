---
title: 数据结构-KMP
date: 2021-10-29
tags:
    - 算法
categories:
    - js
---
## 1.介绍
KMP算法是一种字符串匹配算法，可以在 O(n+m) 的时间复杂度内实现两个字符串的匹配

## 2.哈希表表的一些方法
`getIndexOf(a, b)`  ：a上是否能找到b

## 3.代码实现
```js
function getIndexOf(s, m) {
    if (!s || !s || m.length < 1 || s.length < m.length) {
        return -1
    }
    let str1 = s.split('')
    let str2 = m.split('')
    let [i1, i2] = [0, 0]
    let next = getNextArray(str2)
    while (i1 < str1.length && i2 < str2.length) {
        if (str2[i2] === str1[i1]) {
            i1++
            i2++
        } else if (i2 === 0) {
            i1++
        } else {
            i2 = next[i2]
        }
    }
    return i2 === str2.length ? i1 - i2 : -1
}
function getNextArray(strList = []) {
    if (strList.length === 1) {
        return [-1]
    }
    let next = Array(strList.length)
    next[0] = -1
    next[1] = 0
    let [i, cn] = [2, 0]
    while (i < next.length) {
        if (strList[i - 1] === strList[cn]) {
            next[i++] = ++cn
        } else if (cn > 0) {
            cn = next[cn]
        } else {
            next[i++] = 0
        }
    }
    return next
}
```
>参考资料<https://www.bilibili.com/video/BV13g41157hK?p=12>
