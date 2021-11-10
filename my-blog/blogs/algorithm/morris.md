---
title: morris遍历
date: 2021-11-05
tags:
    - 算法
categories:
    - js
---
## 1.介绍
morris遍历可以将非递归遍历中的空间复杂度降为O(1)。从而实现时间复杂度为O(N)，而空间复杂度为O(1)的精妙算法。

## 2.实现原理
记作当前节点为cur。  
如果cur无左孩子，cur向右移动（cur=cur.right）
如果cur有左孩子，找到cur左子树上最右的节点，记为mostright  
如果mostright的right指针指向空，让其指向cur，cur向左移动（cur=cur.left） 
如果mostright的right指针指向cur，让其指向空，cur向右移动（cur=cur.right）
>实质：建立一种机制，对于没有左子树的节点只到达一次，对于有左子树的节点会到达两次
## 3.morris遍历代码
```js
// 如果cur无左孩子，cur向右移动（cur=cur.right）
// 如果cur有左孩子，找到cur左子树上最右的节点，记为mostright
// 如果mostright的right指针指向空，让其指向cur，cur向左移动（cur=cur.left）
// 如果mostright的right指针指向cur，让其指向空
function morris(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
        // 如果cur有左孩子，找到cur左子树上最右的节点，记为mostright
		let mostRight = cur.left
		if (mostRight) {
            // 如果mostright的right指针指向cur，让其
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
            // 如果mostright的right指针指向cur，让其指向空
			if (mostRight) {
				mostRight.right = null
			} else {
                // 如果mostright的right指针指向空，让其指向cur，cur向左移动（cur=cur.left）
				mostRight.right = cur
				cur = cur.left
				continue
			}
		}
        // 如果cur无左孩子，cur向右移动（cur=cur.right）
		cur = cur.right
	}
}
```
## 4.morris遍历实现前序、中序、后序遍历
### 1.前序遍历
前序遍历，只出现1次直接打印，出现2次的，第1次打印
```js
function morrisPre(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				mostRight.right = null
			} else {
				console.log(cur.val)
				mostRight.right = cur
				cur = cur.left
				continue
			}
		} else {
			console.log(cur.val)
		}
		cur = cur.right
	}
}
```
### 2.中序遍历
中序遍历，只出现1次直接打印，出现2次的，第2次打印
```js
function morrisIn(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				mostRight.right = null
			} else {
				mostRight.right = cur
				cur = cur.left
				continue
			}
		}
		console.log(cur.val)
		cur = cur.right
	}
}
```
### 3.后序遍历
后序遍历，出现2次的，第2次出现时候逆序打印自己左树的右边界,最后打印中间节点的逆序右边界
```js
// 逆序打印
function printEdge(node) {
    // 逆序
	let tail = reverseEdge(node)
	let cur = tail
	while (cur != null) {
		console.log(cur.val)
		cur = cur.right
	}
    // 再次逆序变回原样
	reverseEdge(tail)
}
// 节点变成链
function reverseEdge(node) {
	let pre = null
	let next = null
	while (node != null) {
		next = node.right
		node.right = pre
		pre = node
		node = next
	}
	return pre
}
function morrisPost(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				printEdge(cur.left)
				mostRight.right = null
			} else {
				mostRight.right = cur
				cur = cur.left
				continue
			}
		}
		cur = cur.right
	}
	// 别忘记
	printEdge(head)
}
```