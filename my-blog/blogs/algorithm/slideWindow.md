---
title: 滑动窗口
date: 2021-11-03
tags:
 - 算法
categories:
 - js
---
## 1.介绍
滑动：说明这个窗口是移动的，也就是移动是按照一定方向来的。

窗口：窗口大小并不是固定的，可以不断扩容直到满足一定的条件；也可以不断缩小，直到找到一个满足条件的最小窗口；当然也可以是固定大小
## 2.思路
我们在字符串 S 中使用双指针中的左右指针技巧，初始化 left = right = 0，把索引闭区间 [left, right] 称为一个「窗口」。

我们先不断地增加 right 指针扩大窗口 [left, right]，直到窗口中的字符串符合要求（包含了 T 中的所有字符）。

此时，我们停止增加 right，转而不断增加 left 指针缩小窗口 [left, right]，直到窗口中的字符串不再符合要求（不包含 T 中的所有字符了）。同时，每次增加 left，我们都要更新一轮结果。

重复第 2 和第 3 步，直到 right 到达字符串 S 的尽头

## 3.题
### 1.给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度

left right 刚开始都为0，right++ 如果没重复继续加入设置的set结构，记录最大值，如果发现则left++直到没有重复，记录最大值
```js
var lengthOfLongestSubstring = function (s) {
    let sSet = new Set()
    let maxLength = 0
    for (let right = 0, left = 0; right < s.length; right++) {
        if (sSet.has(s[right])) {
            while (sSet.has(s[right])) {
                sSet.delete(s[left])
                left++
                
            }
        }
        sSet.add(s[right])
        maxLength = Math.max(sSet.size, maxLength)
    }
    return maxLength
}
```
### 2. 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。返回滑动窗口中的最大值。
```js
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sliding-window-maximum
```
题解
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if(nums.length === 1){
        return nums
    }
    let left = 0
    let list = []
    let result = []
    for(let right = 0; right  < nums.length; right++){
        while(list.length > 0 && nums[list[list.length - 1]] <= nums[right]){
            // 从大到小排序
            list.pop()
        }
        list.push(right)
        if(right >= k - 1){
            if(list[0] === left - 1){
                list.shift()
            }
            result.push(nums[list[0]])
            left++
        }
    }
    return result
};
```