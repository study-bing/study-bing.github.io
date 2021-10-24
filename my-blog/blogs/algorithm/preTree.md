---
title: 数据结构-前缀树
date: 2021-10-22
tags:
    - 算法
categories:
    - js
---
## 1.介绍
Trie又被称为前缀树、字典树，所以当然是一棵树。经常用来快速检索，比如插入abc，add，abe 此时想要知道ab为开头的字符串有几个就可以使用

## 2.前缀树的一些方法
`insert(str)`  ：插入  
`search(str)`  ：搜索  
`delete(str)`  ：删除  

## 3.代码实现
```js
class TreeNode {
    constructor(val = 'root') {
        this.pass = 0 // 表示通过的次数
        this.end = 0 // 表示作为最后一个字符串的次数
        this.val = val // 字符串值
        this.nexts = Array(26) // 保留空间（这里可以换成map，暂时只实现26个字母）
    }
}
class PreTree {
    constructor() {
        this.root = new TreeNode()
    }
    insert(str = '') {
        let index = 0
        let node = this.root
        node.pass++
        for (let i = 0; i < str.length; i++) {
            index = str.charCodeAt(i) - 97
            if (!node.nexts[index]) {
                node.nexts[index] = new TreeNode(str[i])
            }
            node = node.nexts[index]
            node.pass++
        }
        node.end++
    }
    delete(str = '') {
        if (this.search(str) > 0) {
            let index = 0
            let node = this.root
            node.pass--
            for (let i = 0; i < str.length; i++) {
                index = str.charCodeAt(i) - 97
                if (--node.nexts[index].pass === 0) {
                    node.nexts[index] = null
                    return false
                }
                node = node.nexts[index]
            }
            node.end--
            return true
        }
        return false
    }
    search(str = '') {
        let index = 0
        let node = this.root
        for (let i = 0; i < str.length; i++) {
            index = str.charCodeAt(i) - 97
            if (!node.nexts[index]) {
                return 0
            }
            node = node.nexts[index]
        }
        return node.end
    }
}
let preTree = new PreTree()
preTree.insert('abc')
preTree.insert('bbb')
preTree.insert('abc')
preTree.insert('abc')
preTree.delete('abc')
console.log(preTree.search('abc'))

}
```