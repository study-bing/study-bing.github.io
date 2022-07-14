---
title: 杨辉三角
date: 2021-10-03
tags:
 - 简单算法题
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/path-sum>
## 1.常规解法
给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和
```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    if(numRows === 1){
        return [[1]]
    }
    let dp = Array(numRows)
    dp[0] = [1]
    dp[1] = [1, 1]
    for (let i = 2; i < numRows; i++) {
        let arr = Array(i+1).fill(1)
        for (let j = 1; j < i; j++) {
            arr[j] = dp[i - 1][j] + dp[i - 1][j - 1]
        }
        dp[i] = arr
    }
    return dp
};
```
