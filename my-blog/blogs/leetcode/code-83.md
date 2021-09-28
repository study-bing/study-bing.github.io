---
title: 删除排序链表中的重复元素
date: 2021-09-28
tags:
    - leetcode
categories:
    - js
---

<https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/>
![ 删除排序链表中的重复元素](./img/70.jpg)
## 1.常规解法
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function (head) {
    if (!head) {
        return null
    }
    let current = head.next
    let pre = head
    while (current) {
        // 不等于就跳过
        if (pre.val !== current.val) {
            pre.next = current
            pre = current
        }
        current = current.next
        // 清空后节点
        pre.next = null
    }
    return head
};
```