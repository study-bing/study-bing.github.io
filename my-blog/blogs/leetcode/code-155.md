---
title: 最小栈
date: 2021-11-01
tags:
    - leetcode
categories:
    - js
---

<https://leetcode-cn.com/problems/min-stack/>
![最小栈](./img/155.jpg)
## 1.常规解法

```js
var MinStack = function() {
    this.list = []
    // 优化
    this.minList = [Number.MAX_SAFE_INTEGER]
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.list.push(val)
    this.minList.push(Math.min(val, this.minList[this.minList.length - 1]))
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.list.pop()
    this.minList.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
     return this.list[this.list.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minList[this.minList.length - 1]
};

```
