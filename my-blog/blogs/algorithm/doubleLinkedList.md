---
title: 数据结构-双向链表
date: 2021-09-17
tags:
    - 算法
categories:
    - js
---
## 1.介绍
既可以从头遍历到尾，又可以从尾遍历到头。也就是说链表连接的过程是双向的，它的实现原理是：一个节点既有向前连接的引用，也有一个向后连接的引用
>原理：  
>1.双向链表不仅有head指针指向第一个节点，而且有tail指针指向最后一个节点；  
>2.每一个节点由三部分组成：item储存数据、prev指向前一个节点、next指向后一个节点；  
>3.双向链表的第一个节点的prev指向null；  
>4.双向链表的最后一个节点的next指向null；  
## 2.双向链表的一些方法
`get(position)`  ：在双向链表中寻找position位置的元素  
`find(data)`  ：在双向链表中寻找data元素，返回链表中的位置  
`insert(position, data)`  ：向双向链表position位置中插入元素  
`update(position, data)`  ：将双向链表中position位置元素修改为data  
`removeAt(position)`  ：在双向链表中删除position位置节点  
`remove(data)`  ：在双向链表中删除一个节点  
`append(data)`  ：在双向链表的尾部添加元素  
`findLast()`  ：获取双向链表的最后一个节点  
`isEmpty()`  ：判断双向链表是否为空   
`size()`  ：获取双向链表的长度  
`toString()`  ：双向链表的遍历显示  
`clear()`  ：清空双向链表  
`forwardString()` ：返回正向遍历节点字符串形式

## 3.代码实现
```js
class Node {
    constructor(data) {
        this.data = data
        this.next = null
        this.prev = null
    }
}
class doubleLinkedList {
    constructor() {
        this.length = 0
        this.head = null
        this.tail = null // 最后一个元素
    }
    // 在双向链表的尾部添加元素
    append(data) {
        let nodeElement = new Node(data)
        if (this.length === 0) {
            this.head = nodeElement
            this.tail = nodeElement
        } else {
            // a->b->c  tail为c  d要加入，先prev指向c  c的next指向d  最后d变为最后一个元素也就是tail
            nodeElement.prev = this.tail
            this.tail.next = nodeElement
            this.tail = nodeElement
        }
        this.length++
    }
    // 向双向链表中插入元素
    insert(position, data) {
        // 下标不符合直接return false
        if (position > this.length || position < 0) {
            return false
        }
        let nodeElement = new Node(data)
        if (this.length === 0) {
            this.head = nodeElement
            this.tail = nodeElement
        } else {
            if (position === 0) {
                nodeElement.next = this.head
                this.head.prev = nodeElement
                this.head = nodeElement
            } else if (position === this.length) {
                nodeElement.prev = this.tail
                this.tail.next = nodeElement
                this.tail = nodeElement
            } else {
                let current = this.head
                let index = 0
                while (index < position) {
                    current = current.next
                    index++
                }
                nodeElement.next = current
                nodeElement.prev = current.prev
                current.prev.next = nodeElement
                current.prev = nodeElement
            }
        }
        this.length++
        return true
    }
    // 在双向链表中寻找position位置的元素
    get(position) {
        // 下标不符合直接return null
        if (position >= this.length || position < 0) {
            return null
        }
        let current = {}
        // position大于总数的1/2时从后面遍历
        if (position > this.length >> 1) {
            current = this.tail
            let index = this.length - 1
            while (index > position) {
                current = current.prev
                index--
            }
        } else {
            current = this.head
            let index = 0
            while (index < position) {
                current = current.next
                index++
            }
        }
        return current.data
    }
    // 双向链表的遍历显示
    toString() {
        let current = this.head
        let list = []
        while (current) {
            list.push(current.data)
            current = current.next
        }
        return list.join('')
    }
    // 返回正向遍历节点字符串形式
    forwardString() {
        let current = this.tail
        let list = []
        while (current) {
            list.push(current.data)
            current = current.prev
        }
        return list.join('')
    }
    // 在双向链表中寻找item元素
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
    // 获取双向链表的最后一个节点
    findLast() {
        return this.tail
    }
    // 将双向链表中position位置元素修改为data
    update(position, data) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = {}
        if (position > this.length >> 1) {
            current = this.tail
            let index = this.length - 1
            while (index > position) {
                current = current.prev
                index--
            }
        } else {
            current = this.head
            let index = 0
            while (index < position) {
                current = current.next
                index++
            }
        }
        current.data = data
        return true
    }
    // 在双向链表中删除position位置节点
    removeAt(position) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            if (position === 0) {
                current.prev = null
                this.head = this.head.next
            } else if (position === this.length - 1) {
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else {
                let index = 0
                while (index++ < position) {
                    current = current.next
                }
                current.next.prev = current.prev
                current.prev.next = current.next
            }
        }
        this.length--
        return current.data
    }
    // 在双向链表中删除一个节点
    remove(data) {
        let position = this.find(data)
        return this.removeAt(position)
    }
    // 如果双向链表里没有任何元素都返回true，否则返回false。
    isEmpty() {
        return this.length > 0
    }
    // 清空双向链表
    clear() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    // 返回双向链表的元素个数，这个方法和数组的length属性很类似。
    size() {
        return this.length
    }
}
```