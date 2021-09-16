---
title: 数据结构-栈
date: 2021-09-15
tags:
    - 算法
categories:
    - js
---

## 1.栈的定义
栈是一种和列表类似的数据结构，可以用它来解决很多的编程问题，栈是一种高效的数据结构，因为数据只能在栈的顶端添加或者删除，所以这样的操作很快而且容易实现。

遵循 先入后出(LIFO，last-in-first-out) 的原则

## 2.栈的一些方法
`push(val)`: 添加一个新元素到栈顶  
`pop()`: 移除栈顶的元素，同时返回被移除的元素  
`peek()`: 返回栈顶的元素，不对栈做任何的修改（这个方法不会移除栈顶的元素，仅仅是返回它）  
`isEmpty()`: 如果栈里没有任何元素都返回true，否则返回false  
`clear()`: 移除栈里的所有元素  
`size()`: 返回栈里的元素个数，这个方法和数组的length属性很类似  

## 3.自定义栈
```js
class Stack {
    constructor() {
        this.items = []
    }
    // 添加一个新元素到栈顶
    push(val) {
        this.items.push(val)
    }
    // 移除栈顶的元素，同时返回被移除的元素
    pop() {
        return this.items.pop(val)
    }
    // 返回栈顶的元素，不对栈做任何的修改（这个方法不会移除栈顶的元素，仅仅是返回它）
    peek() {
        return this.items[this.items.length - 1]
    }
    // 如果栈里没有任何元素都返回true，否则返回false
    isEmpty() {
        return this.items.length > 0
    }
    // 移除栈里的所有元素
    clear() {
        this.items.length = 0
    }
    // 返回栈里的元素个数，这个方法和数组的length属性很类似
    size() {
        return this.items.length
    }
}
```

## 4.例子（十进制转换二进制）
```js
// 十进制转换二进制
function dec2bin(decNum) {
    let stack = new Stack()
    while (decNum > 0) {
        stack.push(decNum % 2)
        decNum = Number.parseInt(decNum / 2)
    }
    let decShow = []
    while (stack.size() > 0) {
        decShow.push(stack.pop())
    }
    return decShow.join('')
}
```
