---
title: 整数反转
date: 2021-09-17
tags:
 - 简单
categories:
 - leetcode
---
<https://leetcode-cn.com/problems/reverse-integer/>
![整数反转](./img/7.jpg)

## 1.常规解法
**思路：用x除以10的余数 * 10慢慢相加**
```js
let reverse = function(x) {
    let result = 0
    while(x !== 0){
        let num = x % 10
        // 向下取整
        // x = ~~(x / 10)  
        // ~~：常用来取整，字符串中带了其他字母，符号，或者其他除数字外的东西，一律输出 Number类型的0
        x = Math.trunc(x / 10)
        // 如果这用字符串相加，需要判断是否为负数
        result = result * 10 + num 
        // 越界了
        if (result < Math.pow(-2, 31) || result > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return result
}
```

## 2.常规解法用字符串相加
**思路：用x除以10的余数 * 10慢慢相加**
```js
let reverse = function(x) {
    if(x === 0){
        return 0
    }
    let result = ''
    let isNegative = false
    if(Math.sign(x) === -1){
        isNegative = true
        x = Math.abs(x)
    }
    while(x !== 0){
        let num = x % 10
        x = Math.trunc(x / 10)
        result = result + num
    }
    if(isNegative){
        result = -result
    }
     // 越界了
    if (result < Math.pow(-2, 31) || result > Math.pow(2, 31) - 1) {
        return 0;
    }
    return result
}
```
## 3.为解题而解题（因为一般不用数组封装好的方法）
**思路：变为数组直接取反**
```js
let reverse = function(x) {
    let result = 0;
    if(Math.sign(x) === -1){
        let strX = String(x).substr(1);
        result = -Number(strX.split('').reverse().join(''));
    }
    else{
        result = Number(String(x).split('').reverse().join(''));
    }
    if(result > Math.pow(-2, 31) && result < (Math.pow(2, 31) - 1)){
        return result;
    }
    else{
        return 0;
    }
};
```