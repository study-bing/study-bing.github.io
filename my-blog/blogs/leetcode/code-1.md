---
title: 两数之和
date: 2021-06-14
tags:
 - 简单算法题
categories:
 - leetcode
---
<https://leetcode-cn.com/problems/two-sum/>
![两数之和](./img/1.jpg)

```js
let twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};
```