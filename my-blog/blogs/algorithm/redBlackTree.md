---
title: 数据结构-红黑树
date: 2021-09-24
tags:
    - 算法
categories:
    - js
---
## 1.二叉搜索树的缺陷
当插入的数据是有序的数据，就会造成二叉搜索树的深度过大。比如原二叉搜索树右 20 22 21 组成，加入了 9 8 7 6 5 4 3 2 则变成了一边倒

## 2.非平衡树
插入连续数据后，二叉搜索树中的数据分布就变得不均匀了，我们称这种树为非平衡树
>对于一棵平衡二叉树来说，插入/查找等操作的效率是O（logN）
>对于一棵非平衡二叉树来说，相当于编写了一个链表，查找效率变成了O（N

## 3.常见平衡树
为了能以较快的时间O（logN）来操作一棵树，我们需要保证树总是平衡,要求树中每个节点左边的子孙节点的个数，应该尽可能地等于右边的子孙节点的个数  
AVL树：是最早的一种平衡树，它通过在每个节点多存储一个额外的数据来保持树的平衡。由于AVL树是平衡树，所以它的时间复杂度也是O（logN）。但是它的整体效率不如红黑树，开发中比较少用。  
红黑树：同样通过一些特性来保持树的平衡，时间复杂度也是O（logN）。进行插入/删除等操作时，性能优于AVL树，所以平衡树的应用基本都是红黑树。


## 4.红黑树的一些方法
`insert(key)`  ：向BST插入元素    
`preOrderTraversal(function)`： 先序遍历,无参数默认返回key的数组  
![先序遍历](./img/bst-pre.jpg) 
`midOrderTraversal(function)`： 中序遍历,无参数默认返回key的数组（key升序） 
![中序遍历](./img/bst-mid.jpg)   
`postOrderTraversal(function)`： 后序遍历,无参数默认返回key的数组  
![后序遍历](./img/bst-post.jpg)  
`remove(key)`  ：从BST删除元素  
>1.没有子节点的情况下  
>2.左节点为空，右节点有值  
>3.右节点为空，左节点有值  
>4.被删除的节点既有左子树而且又有右子树 
## 5.红黑树代码实现
```js
function isEmpty(val) {
    return val === undefined || val === null
}
class Node {
    constructor(key) {
        this.left = null
        this.right = null
        this.key = key
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null
    }
    // 插入方法
    insert(key) {
        let newNode = new Node(key)
        if (this.root) {
            // 递归方法实现
            // this.insertNode(this.root, newNode)
            // 循环方法实现
            let current = this.root
            while (true) {
                if (key < current.key) {
                    if (isEmpty(current.left)) {
                        current.left = newNode
                        return
                    }
                    current = current.left
                } else {
                    if (isEmpty(current.right)) {
                        current.right = newNode
                        return
                    }
                    current = current.right
                }
            }
        } else {
            this.root = newNode
        }
    }
    // 插入的递归方法
    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (isEmpty(node.left)) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
            node = node.left
        } else {
            if (isEmpty(node.right)) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }
    // 先序遍历 先访问根节点(root)  -> 左子节点(left-child) -> 右子节点(right-child)
    preOrderTraversal(handel) {
        let res = []
        // 如果没有传入函数，则默认返回一个key的数组
        if (typeof handel !== 'function') {
            handel = (key) => {
                res.push(key)
            }
        }
        this.preOrderTraversalNode(this.root, handel)
        return res
    }
    // 先序遍历递归函数
    preOrderTraversalNode(node, handle) {
        if (!isEmpty(node)) {
            handle(node.key)
            this.preOrderTraversalNode(node.left, handle)
            this.preOrderTraversalNode(node.right, handle)
        }
    }
    // 中序遍历 先访问左子节点(left-child) -> 根节点(root) -> 右子节点(right-child)
    midOrderTraversal(handel) {
        let res = []
        // 如果没有传入函数，则默认返回一个key的数组
        if (typeof handel !== 'function') {
            handel = (key) => {
                res.push(key)
            }
        }
        this.midOrderTraversalNode(this.root, handel)
        return res
    }
    // 中序遍历递归函数
    midOrderTraversalNode(node, handle) {
        if (!isEmpty(node)) {
            this.midOrderTraversalNode(node.left, handle)
            handle(node.key)
            this.midOrderTraversalNode(node.right, handle)
        }
    }
    // 后序遍历 先访问左子节点(left-child) -> 右子节点(right-child) -> 根节点(root)
    postOrderTraversal(handel) {
        let res = []
        // 如果没有传入函数，则默认返回一个key的数组
        if (typeof handel !== 'function') {
            handel = (key) => {
                res.push(key)
            }
        }
        this.postOrderTraversalNode(this.root, handel)
        return res
    }
    // 后序遍历递归函数
    postOrderTraversalNode(node, handle) {
        if (!isEmpty(node)) {
            this.postOrderTraversalNode(node.left, handle)
            this.postOrderTraversalNode(node.right, handle)
            handle(node.key)
        }
    }
    // 最大值
    max() {
        return this._getValue('right')
    }
    // 最小值
    min() {
        return this._getValue('left')
    }
    _getValue(arrow) {
        if (isEmpty(this.root)) {
            return null
        }
        let key = ''
        let current = this.root
        while (!isEmpty(current)) {
            key = current.key
            current = current[arrow]
        }
        return key
    }
    // 搜索树种的key
    search(key) {
        let current = this.root
        while (current) {
            if (key < current.key) {
                current = current.left
            } else if (key > current.key) {
                current = current.right
            } else {
                return true
            }
        }
        return false
    }
    // 删除
    remove(key) {
        if (isEmpty(this.root)) {
            return false
        }
        let current = this.root
        let parent = null
        let isLeftChild = true
        // 找到节点
        while (current.key !== key) {
            parent = current
            if (key < current.key) {
                current = current.left
                isLeftChild = true
            } else if (key > current.key) {
                current = current.right
                isLeftChild = false
            }
            if (isEmpty(current)) {
                return false
            }
        }
        // 1.没有子节点的情况下
        if (isEmpty(current.left) && isEmpty(current.right)) {
            if (current === this.root) {
                this.root = null
            } else {
                if (isLeftChild) {
                    parent.left = null
                } else {
                    parent.right = null
                }
            }
        } else if (isEmpty(current.left)) {
            // 2.左节点为空，右节点有值
            if (current === this.root) {
                this.root = current.right
            }
            if (isLeftChild) {
                parent.left = current.right
            } else {
                parent.right = current.right
            }
        } else if (isEmpty(current.right)) {
            // 3.右节点为空，左节点有值
            if (current === this.root) {
                this.root = current.left
            }
            if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.left
            }
        } else {
            // 被删除的节点既有左子树而且又有右子树
            // 前驱：比删除节点大一点点的，即左子树的最大值
            // 后继：比删除节点小一点点的，即右子树的最小值
            let successor = this._getSuccessor(current)
            successor.left = current.left
            if (this.root === current) {
                this.root = successor
            } else if (isLeftChild) {
                parent.left = successor
            } else {
                parent.right = successor
            }
        }
        return true
    }
    // 后继
    _getSuccessor(delNode) {
        let successor = delNode
        let parentSuccessor = delNode
        let current = delNode.right
        // 寻找节点
        while (current) {
            parentSuccessor = successor
            successor = current
            current = current.left
        }
        // 如果后继节点不是删除节点的右节点
        if (successor !== delNode.right) {
            parentSuccessor.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }
}
let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
bst.preOrderTraversal()
console.log(bst.preOrderTraversal()) //[ 11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]
console.log(bst.midOrderTraversal()) // [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25)]
console.log(bst.postOrderTraversal()) // [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]
console.log(bst.min())
console.log(bst.max())
console.log(bst.search(6))
console.log(bst.search(13))
console.log(bst.search(16))
console.log(bst.remove(11))
console.log(bst.preOrderTraversal()) //[ 12, 7, 5, 3, 6, 9, 8, 10, 15, 13, 14, 20, 18, 25]
```