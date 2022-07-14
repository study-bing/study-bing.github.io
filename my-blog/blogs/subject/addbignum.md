---
title: 计算大数字
date: 2022-01-20
tags:
  - 练习
categories:
  - js基础
---

## 1.题目

两个超出 number 最大值的数字相加，求和

## 2.解答
通过字符串拆解，一位一位相加
```js
function addbignum(num1, num2) {
  let maxLength = Math.max(num1.length, num2.length)
  num1 = num1.padStart(maxLength, 0)
  num2 = num2.padStart(maxLength, 0)
  let [sum, f, t] = ['', 0, 0]
  for (let i = maxLength - 1; i >= 0; i--) {
    t = Number(num1[i]) + Number(num2[i]) + f
    f = Math.floor(t / 10)
    sum = (t % 10) + sum
  }
  if (f === 1) {
    sum = '1' + sum
  }
  return sum
}

console.log(addbignum('1231231231321313', '2123123123123122'))
```
