---
title: 柯里化函数
date: 2022-01-30
tags:
  - 练习
categories:
  - js基础
---

## 1.题目

“柯里化函数:把接收多个参数的函数变成一个可以接收单一参数的函数,并且返回接受余下的参数并返回结果的新函数

## 2.解答
```js
function curry(fn, ...arg) {
    if (fn.length > arg.length) {
        return (...arg2) => {
            return curry.call(this, fn, ...arg, ...arg2)
        }
    } else {
        return fn.apply(this, arg)
    }
}
function add(a, b, c) {
    return a + b + c
}
let add1 = curry(add)
console.log(add1(1)(2)(3))
```
