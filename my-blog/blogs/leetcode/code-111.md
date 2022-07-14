---
title:  二叉树的最小深度
date: 2021-10-02
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/>
## 1.常规解法
给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。
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
var minDepth = function(root) {
    if(root){
        return depth(root.left, root.right, 1)
    }
    return 0
};
function depth(p, q, count) {
    if (p && q) {
        count++
        return Math.min(depth(p.left, p.right, count), depth(q.left, q.right, count))
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
