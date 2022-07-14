---
title: 二分查找
date: 2021-08-02
tags:
    - 简单算法题
categories:
    - leetcode
---

<https://leetcode-cn.com/problems/binary-search/>
![二分查找](./img/704.jpg)

思路：排序，取中间值 mid，与目标值相比，大于则最大值变成 mid-1，否则最小值变成 mid+1

```js
var search = function(nums, target) {
	let left = 0
	let right = nums.length - 1
	let mid
	while (left <= right) {
		mid = left + ((right - left) >> 1)
		if (nums[mid] > target) {
			right = mid - 1
		} else if (nums[mid] < target) {
			left = mid + 1
		} else {
			return mid
		}
	}
	return -1
}
```
