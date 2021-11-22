---
title: 杨辉三角2
date: 2021-10-04
tags:
 - 简单
categories:
 - leetcode
---

<https://leetcode-cn.com/problems/path-sum>
## 1.常规解法
给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。
```js
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
    if (rowIndex === 0) {
        return [1]
    }
    let dp = Array(rowIndex)
    dp[0] = [1]
    dp[1] = [1, 1]
    for (let i = 2; i <= rowIndex; i++) {
        let arr = Array(i + 1).fill(1)
        for (let j = 1; j < i; j++) {
            arr[j] = dp[i - 1][j] + dp[i - 1][j - 1]
        }
        dp[i] = arr
    }
    return dp[rowIndex]
};
```
