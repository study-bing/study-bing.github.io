---
title: 移除元素
date: 2021-06-30
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/remove-element/>
![ 移除元素](./img/27.jpg)

## 1.常规解法

```js
let removeElement = function(nums, val) {
    let i = 0, j= 0
    while(j < nums.length){
        if(val !== nums[j]){
            nums[i] = nums[j]
            i++
        }
        j++
    }
    return i
};
```
