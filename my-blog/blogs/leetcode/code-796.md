---
title: 旋转字符串
date: 2021-08-17
tags:
    - 简单
categories:
    - leetcode
---

<https://leetcode-cn.com/problems/rotate-string/>
![旋转字符串](./img/796.jpg)

思路：当给定字符串拼接自己后，可以有旋转的所有可能，所有直接可以判定给定值是否在里面

```js
var rotateString = function (s, goal) {
    if(s.length !== goal.length){
        return false
    }
    let newS = s + s
    return newS.indexOf(goal) > -1
};
```
