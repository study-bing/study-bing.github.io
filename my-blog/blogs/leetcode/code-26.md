---
title:  删除有序数组中的重复项
date: 2021-06-28
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/>
![ 删除有序数组中的重复项](./img/26.jpg)

## 1.常规解法

```js
let removeDuplicates = function(nums) {
    if(nums.length === 0){
        return 0
    }
    let i = 0, j= 1
    while(j < nums.length){
        if(nums[i] !== nums[j]){
            nums[++i] = nums[j]
        }
        j++
    }
    return ++i
};
```
