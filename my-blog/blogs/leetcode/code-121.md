---
title:  买卖股票的最佳时机
date: 2021-10-06
tags:
    - leetcode
categories:
    - js
---

<https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/>
![ 买卖股票的最佳时机](./img/121.jpg)
## 1.常规解法
```js
/**
 * @param {number[]} prices
 * @return {number}
 */
// var maxProfit = function (prices) {
//     return process(0, prices[0], 0, prices)
// };
// function process(index, min, profit, prices) {
//     if (index === prices.length) {
//         return 0
//     }
//     profit = Math.max(profit, prices[index] - min)
//     min = Math.min(min, prices[index])
//     return Math.max(process(index + 1, min, profit, prices), profit)
// }

var maxProfit = function (prices) {
    let minprice = prices[0]
    let maxprofit = 0
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minprice) {
            minprice = prices[i];
        } else if (prices[i] - minprice > maxprofit) {
            maxprofit = prices[i] - minprice;
        }
    }
    return maxprofit;
};
```
