---
title: 数组中求合集
date: 2022-01-06
tags:
  - 练习
categories:
  - js基础
---

## 1.题目

```js
const arr = [
    ["a", "b", "c"],
    ["a", "d"],
    ["d", "e"],
    ["f", "g"],
    ["h", "g"],
    ["i"],
]
转换为
const  result = [
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h'],
    ['i']
]
```

## 2.解答
先将第二层数据排序，再排序第一层，遍历，如有包含则合并，没有则加入到结果数组
```js
function transform(arr) {
    arr = arr.map((el) => el.sort()).sort()
    let result = []
    const item = arr.reduce((pre, cur) => {
        if (
            cur.some((el) => {
                return pre.includes(el)
            })
        ) {
            pre = pre.concat(cur)
        } else {
            result.push(pre)
            pre = cur
        }
        return [...new Set(pre)]
    })
    result.push(item)
    return result
}
transform(arr)
console.log(transform(arr));
```