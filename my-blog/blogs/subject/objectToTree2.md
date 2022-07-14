---
title: 对象转树
date: 2022-01-01
tags:
  - 练习
categories:
  - js基础
---

## 1.题目

```js
let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
]
转换为
const  result = [
    {
        id: 1,
        name: "部门1",
        pid: 0,
        children: [
            { id: 2, name: "部门2", pid: 1, children: [] },
            {
                id: 3,
                name: "部门3",
                pid: 1,
                children: [
                    {
                        id: 4,
                        name: "部门4",
                        pid: 3,
                        children: [
                            { id: 5, name: "部门5", pid: 4, children: [] },
                        ],
                    },
                ],
            },
        ],
    },
]
```

## 2.递归
```js
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
];
/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}
 
/**
* 转换方法
*/
const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid)
  return result;
}
let newArr = arrayToTree(arr, 0);
console.log(newArr);
```

## 3.借助对象的引用
```js
function arrayToTree(list) {
    let itemMap = {}
    let result = []
    for (const item of list) {
        itemMap[item.id] = { ...item, children: [] }
    }
    for (const item of list) {
        let id = item.id
        let pid = item.pid
        let treeItem = itemMap[id]
        if (pid === 0) {
            result.push(treeItem)
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }
    }
    return result
}
```
