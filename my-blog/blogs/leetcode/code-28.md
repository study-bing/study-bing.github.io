---
title: 实现 strStr()
date: 2021-07-01
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/implement-strstr/>
![ 实现 strStr()](./img/28.jpg)

## 1.常规解法

```js
let strStr = function(haystack, needle) {
    const n = haystack.length, m = needle.length;
    for (let i = 0; i + m <= n; i++) {
        let flag = true;
        for (let j = 0; j < m; j++) {
            if (haystack[i + j] != needle[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            return i;
        }
    }
    return -1;
};
```
## 2.骚操作

```js
let strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};
```