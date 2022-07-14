---
title:  平衡二叉树
date: 2021-07-28
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/balanced-binary-tree/>
## 1.常规解法
给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
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
 * @return {boolean}
 */
var isBalanced = function (root) {
    return process(root).isB
};
function process(node) {
    if(!node){
        return {
            isB: true,
            height: 0
        }
    }
    let leftData = process(node.left)
    let rightData = process(node.right)
    let height = Math.max(leftData.height, rightData.height) + 1
    let isB = true
    if(Math.abs(leftData.height - rightData.height) > 1 || !leftData.isB || !rightData.isB){
        isB = false
    }
    return {
        isB, height
    }
}
```
