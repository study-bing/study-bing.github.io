---
title: 二叉树的最大深度
date: 2021-09-29
tags:
 - 简单
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/>
![ 二叉树的最大深度](./img/104.jpg)
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
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if(root){
        return depth(root.left, root.right, 1)
    }
    return 0
};
function depth(p, q, count) {
    if (p && q) {
        count++
        return Math.max(depth(p.left, p.right, count), depth(q.left, q.right, count))
    }
    else if (p) {
        count++
        return depth(p.left, p.right, count)
    }
    else if (q) {
        count++
        return depth(q.left, q.right, count)
    } else {
        return count
    }
}
```
