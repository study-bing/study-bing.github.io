---
title: compose函数和pipe函数
date: 2021-10-26
tags:
 - js基础
categories:
 - js
---

## 1.compose

compose 函数可以将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。(参数从右往左执行)

比如给定一个输入值 x，先给这个值加 10，然后结果乘以 10，然后分别有一个加法函数和乘法函数

```js
const add = (x) => x + 10
const multiply = (x) => x * 10
// 常规调用
multiply(add(10))
```

如果使用 compose,则希望得到下面的结果

```js
// 参数从右往左执行，所以multiply在前，add在后
compose(multiply, add)(10)
```

## 2.compose 函数

```js
const compose = (...args) => (x) => args.reduceRight((res, cb) => cb(res), x)
function compose(...args){
    return (x) => {
        return args.reduceRight((res, cb) =>{
             return cb(res)
        }, x)
    }
}
```

## 3.pipe

pipe 函数跟 compose 函数的左右是一样的，也是将参数平铺，只不过他的顺序是从左往右

## 4.pipe函数

```js
const compose = (...args) => (x) => args.reduce((res, cb) => cb(res), x)
```
