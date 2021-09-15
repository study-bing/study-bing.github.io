---
title: 无重复字符的最长子串
date: 2021-09-15
tags:
 - leetcode
categories:
 - leetcode
---
<https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/>
![无重复字符的最长子串](./img/3.jpg)

```js
let lengthOfLongestSubstring = function (s) {
    let sSet = new Set() // 定义一个set来记录是否存在
    let maxLength = 0
    for (let i = 0, j = 0; i < s.length; i++) {
        if (sSet.has(s[i])) {
            // 加入的如果之前有则消除
            while (sSet.has(s[i])) {
                sSet.delete(s[j])
                j++
            }
        }
        sSet.add(s[i])
        maxLength = Math.max(sSet.size, maxLength)
    }
    return maxLength
}
```