---
title: 数据结构-单链表
date: 2021-09-16
tags:
    - 算法
categories:
    - js
---
## 1.介绍
链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成
>原理：  
>1.head属性指向链表的第一个节点；  
>2.链表中的最后一个节点指向null；  
>3.当链表中一个节点也没有的时候，head直接指向null；  

## 2.与数组比较
1. 数组存在的缺点：  
    - 数组的创建通常需要申请一段连续的内存空间（一整块内存），并且大小是固定的。所以当原数组不能满足容量需求时，需要扩容（一般情况下是申请一个更大的数组，比如2倍，然后将原数组中的元素复制过去）。  
    - 在数组的开头或中间位置插入数据的成本很高，需要进行大量元素的位移。  
2. 链表的优势：  
    - 链表中的元素在内存中不必是连续的空间，可以充分利用计算机的内存，实现灵活的内存动态管理。    
    - 链表不必在创建时就确定大小，并且大小可以无限地延伸下去。  
    - 链表在插入和删除数据时，时间复杂度可以达到O(1)，相对数组效率高很多。  
3. 链表的缺点：  
    - 链表访问任何一个位置的元素时，都需要从头开始访问（无法跳过第一个元素访问任何一个元素）。  
    - 无法通过下标值直接访问元素，需要从头开始一个个访问，直到找到对应的元素。  
    - 虽然可以轻松地到达下一个节点，但是回到前一个节点是很难的。  

## 3.单链表的一些方法
`get(position)`  ：在单链表中寻找position位置的元素  
`find(data)`  ：在单链表中寻找data元素，返回链表中的位置  
`insert(position, data)`  ：向单链表position位置中插入元素  
`update(position, data)`  ：将单链表中position位置元素修改为data  
`removeAt(position)`  ：在单链表中删除position位置节点  
`remove(data)`  ：在单链表中删除一个节点  
`append(data)`  ：在单链表的尾部添加元素  
`findLast()`  ：获取单链表的最后一个节点  
`isEmpty()`  ：判断单链表是否为空   
`size()`  ：获取单链表的长度  
`toString()`  ：单链表的遍历显示  
`clear()`  ：清空单链表  

## 4.代码实现
```js
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}
class LinkedList {
    constructor() {
        this.length = 0
        this.head = null
    }
    // 在单链表的尾部添加元素
    append(data) {
        let nodeElement = new Node(data)
        if (this.head === null) {
            this.head = nodeElement
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = nodeElement
        }
        this.length++
    }
    // 向单链表中插入元素
    insert(position, data) {
        // 下标不符合直接return false
        if (position > this.length || position < 0) {
            return false
        }
        let nodeElement = new Node(data)
        if (position === 0) {
            nodeElement.next = this.head
            this.head = nodeElement
        } else {
            let current = this.head
            let preElement = null
            let index = 0
            // a->b->c preElement记录a current记录c  b为插入的元素
            while (index < position) {
                preElement = current
                current = current.next
                index++
            }
            nodeElement.next = current
            preElement.next = nodeElement
        }
        this.length++
        return true
    }
    // 在单链表中寻找position位置的元素
    get(position) {
        // 下标不符合直接return null
        if (position >= this.length || position < 0) {
            return null
        }
        let current = this.head
        let index = 0
        while (index < position) {
            current = current.next
            index++
        }
        return current.data
    }
    // 单链表的遍历显示
    toString() {
        let current = this.head
        let list = []
        while (current) {
            list.push(current.data)
            current = current.next
        }
        return list.join('')
    }
    // 在单链表中寻找item元素
    find(data) {
        if (!data) {
            return -1
        }
        let current = this.head
        let index = 0
        while (current) {
            if (current.data === data) {
                return index
            }
            current = current.next
            index++
        }
        return -1
    }
    // 获取单链表的最后一个节点
    findLast() {
        let current = this.head
        let index = 0
        while (index < this.length - 1) {
            current = current.next
            index++
        }
        return current ? current.data : null
    }
    // 将单链表中position位置元素修改为data
    update(position, data) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = this.head
        let index = 0
        while (index < position) {
            current = current.next
            index++
        }
        current.data = data
        return true
    }
    // 在单链表中删除position位置节点
    removeAt(position) {
        // 下标不符合直接return false
        if (position > this.length || position < 0) {
            return false
        }
        let current = this.head
        if (position === 0) {
            this.head = current.next
        } else {
            let preElement = null
            let index = 0
            // a->b->c preElement记录a current记录c  b为删除的元素
            while (index < position) {
                preElement = current
                current = current.next
                index++
            }
            preElement.next = current.next
        }
        this.length--
        return current.data
    }
    // 在单链表中删除一个节点
    remove(data) {
        let position = this.find(data)
        return this.removeAt(position)
    }
    // 如果单链表里没有任何元素都返回true，否则返回false。
    isEmpty() {
        return this.length > 0
    }
    // 清空单链表
    clear() {
        this.head = null
        this.length = 0
    }
    // 返回单链表的元素个数，这个方法和数组的length属性很类似。
    size() {
        return this.length
    }
}
```
>参考资料<https://www.bilibili.com/video/BV1x7411L7Q7?p=101>