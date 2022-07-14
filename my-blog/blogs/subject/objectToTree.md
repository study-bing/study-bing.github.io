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
const entries = [
    {
        province: "浙江",
        city: "杭州",
        name: "西湖",
    },
    {
        province: "四川",
        city: "成都",
        name: "锦里",
    },
    {
        province: "四川",
        city: "成都",
        name: "方所",
    },
    {
        province: "四川",
        city: "阿坝",
        name: "九寨沟",
    },
]
转换为
const  result = [
    {
     value:'浙江'，
     children:[
      {
       value:'杭州',
       children:[
        {
         value:'西湖'
        }
       ]
      }
     ]
    },
    {
     value:'四川'，
     children:[
      {
       value:'成都',
       children:[
        {
         value:'锦里'
        },
        {
         value:'方所'
        }
       ]
      },
      {
       value:'阿坝',
       children:[
        {
         value:'九寨沟'
        }
       ]
      }
     ]
    },
   ]
```

## 2.解答

```js
function transform(list, level) {
  const res = []
  const level = ['province', 'city', 'name']
  list.forEach((item) => {
    pushItem(res, item, 0)
  })

  function pushItem(arr, obj, i) {
    const o = {
      value: obj[level[i]],
      children: [],
    }
    // 判断传入数组里是否有value等于要传入的项
    const hasItem = arr.find((el) => el.value === obj[level[i]])
    let nowArr
    if (hasItem) {
      // 存在，则下一次遍历传入存在项的children
      nowArr = hasItem.children
    } else {
      // 不存在 压入arr，下一次遍历传入此项的children
      arr.push(o)
      nowArr = o.children
    }
    if (i === level.length - 1) delete o.children
    i++
    if (i < level.length) {
      // 递归进行层级的遍历
      pushItem(nowArr, obj, i)
    }
  }
  return res
}

transform(entries, level)
console.log(transform(entries, level))
```
