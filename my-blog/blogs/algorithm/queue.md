---
title: 数据结构-队列（数组实现）
date: 2021-09-15
tags:
    - 算法
categories:
    - js
---

## 1.队列的定义
队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。

遵循 先进先出(FIFO，First-In-First-Out) 的原则

## 2.队列的一些方法
`enqueue(val)`: 添加一个新元素到队列顶    
`dequeue()`: 移除队列尾部的元素，同时返回被移除的元素  
`front()`: 返回队列顶的元素，不对队列做任何的修改（这个方法不会移除队列顶的元素，仅仅是返回它）  
`isEmpty()`: 如果队列里没有任何元素都返回true，否则返回false   
`clear()`: 移除队列里的所有元素  
`size()`: 返回队列里的元素个数，这个方法和数组的length属性很类似  

## 3.自定义队列
```js
class Queue {
    constructor() {
        this.items = []
    }
    // 添加一个新元素到队列顶
    enqueue(val) {
        this.items.push(val)
    }
    // 移除队列尾部的元素，同时返回被移除的元素
    dequeue() {
        return this.items.shift()
    }
    // 返回队列顶的元素，不对队列做任何的修改（这个方法不会移除队列顶的元素，仅仅是返回它）
    front() {
        return this.items[0]
    }
    // 如果队列里没有任何元素都返回true，否则返回false
    isEmpty() {
        return this.items.length > 0
    }
    // 移除队列里的所有元素
    clear() {
        this.items.length = 0
    }
    // 返回队列里的元素个数，这个方法和数组的length属性很类似
    size() {
        return this.items.length
    }
}
```
## 4.例子
给一组玩家数组以及一位数字，数到数字的玩家退出，返回最后剩下的玩家名称
```js
function demo(nameList, num) {
    let queue = new Queue()
    for (let index = 0; index < nameList.length; index++) {
        queue.enqueue(nameList[index])
    }
    let count = 1 // 从1开始数
    while (queue.size() > 1) {
        if (count === num) {
            queue.dequeue()
            count = 1
        } else {
            queue.enqueue(queue.dequeue())
            count++
        }
    }
    return queue.front()
}
```
## 5.优先级队列
```js
// 优先级队列，根据传入的优先级进行排序（从小到大）
class priorityQueue extends Queue {
    constructor() {
        super()
        this.items = []
    }
    enqueue(val, priority) {
        let queueElement = {
            val,
            priority, // 传入的优先级
        }
        let added = false
        for (let index = 0; index < this.items.length; index++) {
            const element = this.items[index]
            if (queueElement.priority < element.priority) {
                this.items.splice(index, 0, queueElement)
                added = true
                break
            }
        }
        if (!added) {
            this.items.push(queueElement)
        }
    }
}
```