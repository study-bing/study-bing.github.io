---
title: 数据结构-并查集
date: 2021-10-28
tags:
    - 算法
categories:
    - js
---
## 1.介绍
并查集被很多OIer认为是最简洁而优雅的数据结构之一，主要用于解决一些元素分组的问题  
用集合中的某个元素来代表这个集合，该元素称为集合的代表元。  
一个集合内的所有元素组织成以代表元为根的树形结构。  
对于每一个元素 parent[x]指向x在树形结构上的父亲节点。如果x是根节点，则令parent[x] = x。  
对于查找操作，假设需要确定x所在的的集合，也就是确定集合的代表元。可以沿着parent[x]不断在树形结构中向上移动，直到到达根节点   

## 2.哈希表表的一些方法
`isSameSet(a, b)`  ：是否在一个集合 
`union(a, b)`  ：将a,b设置到一个集合    

## 3.代码实现
```js
class Element {
    constructor(val) {
        this.val = val
    }
}
class UnionFindSet {
    constructor(list = []) {
        this.elementMap = new Map()
        this.fatherMap = new WeakMap()
        this.sizeMap = new WeakMap()
        for (let index = 0; index < list.length; index++) {
            const val = list[index]
            const element = new Element(val)
            this.elementMap.set(val, element)
            this.fatherMap.set(element, element)
            this.sizeMap.set(element, 1)
        }
    }
    /**
     * @author: linbin
     * @Date: 2021-10-28 09:45:15
     * @description: 判断是否在一个集合
     * @param {*} a
     * @param {*} b
     * @return {*}
     */
    isSameSet(a, b) {
        if (this.elementMap.has(a) && this.elementMap.has(b)) {
            return (
                this.findHead(this.elementMap.get(a)) ===
                this.findHead(this.elementMap.get(b))
            )
        }
        return false
    }
    /**
     * @author: linbin
     * @Date: 2021-10-28 09:46:07
     * @description: 查找最顶端的值
     * @param {*} val
     * @return {*}
     */
    findHead(val) {
        let array = []
        while (this.fatherMap.get(val) !== val) {
            array.push(val)
            val = this.fatherMap.get(val)
        }
        while (array.length > 0) {
            this.fatherMap.set(array.pop(), val)
        }
        return val
    }
    /**
     * @author: linbin
     * @Date: 2021-10-28 10:19:22
     * @description: 将2个值并集
     * @param {*}
     * @return {*}
     */
    union(a, b) {
        if (this.elementMap.has(a) && this.elementMap.has(b)) {
            let aF = this.findHead(this.elementMap.get(a))
            let bF = this.findHead(this.elementMap.get(b))
            if (aF !== bF) {
                let big = this.sizeMap.get(aF) >= this.sizeMap.get(bF) ? aF : bF
                let small = big === aF ? bF : aF
                this.fatherMap.set(small, big)
                this.sizeMap.set(
                    big,
                    this.sizeMap.get(aF) + this.sizeMap.get(bF)
                )
                this.sizeMap.delete(small)
            }
        }
    }
}
let u = new UnionFindSet([1, 2, 3, 4])
u.union(1, 2)
console.log(u.isSameSet(1, 2))

```
>参考资料<https://www.bilibili.com/video/BV13g41157hK?p=12>