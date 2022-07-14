---
title: 最小栈
date: 2021-09-29
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/>
## 1.常规解法

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
let sortedArrayToBST = function (nums) {
    return inserNode(nums, 0, nums.length - 1)
};
function inserNode(nums, left, right) {
    if (left > right) {
        return null
    }
    let mid = left + ((right - left) >> 1)
    return new TreeNode(nums[mid], inserNode(nums, left, mid - 1), inserNode(nums, mid + 1, right))
}
```
