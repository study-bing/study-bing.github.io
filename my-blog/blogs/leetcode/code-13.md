---
title: 罗马数字转整数
date: 2021-06-24
tags:
 - 简单
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/roman-to-integer/>
![罗马数字转整数](./img/13.jpg)

## 1.常规解法

```js
let romanToInt = function(s) {
    let numObj = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
        IV: 4,
        IX: 9,
        XL: 40,
        XC: 90,
        CD: 400,
        CM: 900,
    }
    let result = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i + 1] && numObj[s[i] + s[i + 1]]) {
            result += numObj[s[i] + s[i + 1]]
            i++
            continue
        }
        result += numObj[s[i]]
    }
    return result
}
```
