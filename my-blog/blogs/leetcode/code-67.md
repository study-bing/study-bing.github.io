---
title: 二进制求和
date: 2021-09-24
tags:
    - leetcode
categories:
    - js
---

<https://leetcode-cn.com/problems/add-binary/>
![ 二进制求和](./img/67.jpg)
## 1.循环判断解法
```js
var addBinary = function (a, b) {
    let len = Math.max(a.length, b.length)
    // 补0变成同等长度
    a = a.padStart(len, '0')
    b = b.padStart(len, '0')
    let result = ''
    let isCarry = false // 是否晋级
    for (let i = len - 1; i >= 0; i--) {
        if (a[i] === b[i]) {
            if (isCarry) {
                if (a[i] === '1') {
                    isCarry = true
                } else {
                    isCarry = false
                }
                result = '1' + result
            } else if (a[i] === '1') {
                result = '0' + result
                isCarry = true
            } else {
                result = '0' + result
            }
        } else {
            if (isCarry) {
                result = '0' + result
                isCarry = true
            } else {
                result = '1' + result
                isCarry = false
            }
        }

    }
    if (isCarry) {
        result = '1' + result
    }
    return result
};
```
## 2.进制转换解法
```js
var addBinary = function(a, b) {
    a = '0b' + a ;
    b = '0b' + b ;
    let sum = BigInt(a) + BigInt(b);
    return sum.toString(2);
};
```