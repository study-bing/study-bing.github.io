---
title: 相同的树
date: 2021-07-20
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/same-tree/>

给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    if (p && q) {
        if (p.val === q.val) {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
        }else{
            return false
        }
    } else if ((p && !q) || (!p && q)) {
        return false
    } else {
        return true
    }
};
```
