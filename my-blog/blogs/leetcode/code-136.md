---
title: 只出现一次的数字
date: 2021-10-08
tags:
 - 简单
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/single-number/>
![只出现一次的数字](./img/136.jpg)

## 1.递归解法

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let result = 0
    for(let i = 0; i < nums.length; i++){
        result = result ^  nums[i]
    }
    return result
};
```