---
title: js中的常用排序
date: 2021-09-12
tags:
    - 算法
categories:
    - js
---

## 1. 冒泡排序

> 原理：从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素

```js
function bubbleSort(array) {
    if (Array.isArray(array)) {
        for (let i = array.length - 1; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]]
                }
            }
        }
        return array
    }
}
```

## 2. 插入排序

> 原理：第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作

```js
function insertSort(array) {
    if (Array.isArray(array)) {
        for (let index = 1; index < array.length; index++) {
            for (let j = index; array[j - 1] > array[j] && j > 0; j--) {
                array[j - 1] = array[j - 1] ^ array[j]
                array[j] = array[j - 1] ^ array[j]
                array[j - 1] = array[j - 1] ^ array[j]
            }
        }
    }
}
```

## 3. 选择排序

> 原理：遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作

```js
function selectSort(array) {
    if (Array.isArray(array)) {
        for (let i = 0; i < array.length - 1; i++) {
            let minIdex = i
            for (let j = i + 1; j < array.length; j++) {
                minIdex = array[j] < array[minIdex] ? j : minIdex
            }
            [array[i], array[minIdex]] = [array[minIdex], array[i]]
        }
        return array
    }
}
```

## 4. 快速排序

> 原理：在数据集之中，找一个基准点，建立两个数组，分别存储左边和右边的数组，利用递归进行下次比较。  
> 1,9,3,5,7,8,9  比如中间数是5 则  比5小放在左边，比5打放在右边
>**一般在小样本量上会用插入排序**
```js
function quickSort(array = [], l, r) {
    if (l < r) {
        // if(l > r - 60){ // 一般在小样本量上会用插入排序
        //     insertSort(array)
        //     return
        // }
        swap(array, l + parseInt(+Math.random() * (r - l + 1)), r)
        let p = partition(array, l, r)
        quickSort(array, l, p[0] - 1)
        quickSort(array, p[1] + 1, r)
    }
}
function partition(array, l, r) {
    let start = l  // <区边界
    let end = r // >区边界
    while (l < end) {
        if (array[l] < array[r]) {
            swap(array, start++, l++)
        } else if (array[l] > array[r]) {
            swap(array, --end, l)
        } else {
            l++
        }
    }
    swap(array, end, r)
    return [start, end]
}
function swap(array, l, r) {
    [array[l], array[r]] = [array[r], array[l]]
}
```

## 5.归并排序

> 原理：  
> （1）把长度为 n 的输入序列分成两个长度为 n/2 的子序列；  
> （2）对这两个子序列分别采用归并排序；  
> （3）将两个排序好的子序列合并成一个最终的排序序列；

```js
function process(array, l, r) {
    //采用自上而下的递归方法
    if (l === r) {
        return 0
    }
    let middle = l + ((r - l) >> 1) // 等于l+(r-l)/2

    process(array, l, middle)
    process(array, middle + 1, r)
    merge(array, l, middle, r)
}

function merge(array, l, m, r) {
    let result = []
    let i = 0
    let p1 = l
    let p2 = m + 1
    while (p1 <= m && p2 <= r) {
        result[i++] = array[p1] <= array[p2] ? array[p1++] : array[p2++]
    }
    while (p1 <= m) {
        result[i++] = array[p1++]
    }
    while (p2 <= r) {
        result[i++] = array[p2++]
    }
    for (let index = 0; index < result.length; index++) {
        array[l + index] = result[index]
    }
}
```
## 6.堆排序
> 原理：   
> 1.首先我们要构建一个堆  
    >根节点（亦称为堆顶）的关键字是堆里所有结点关键字中最大者，称为大根堆，又称最大堆（大顶堆）  
    >根节点（亦称为堆顶）的关键字是堆里所有结点关键字中最小者，称为小根堆，又称最小堆（小顶堆）  
    >1.1实现一个函数数组的除第一个元素外其他部分已经是一个堆，然后将这个元素添加到堆里面  
    >1.2将要排序的数组构建成一个堆  
> 2.将堆顶元素与最后一个元素互换，将其他的元素从新构建一个堆
```js
function heapify(array, index, heapSize) {
    let left = index * 2 + 1
    while (left < heapSize) {
        let largest =
            left + 1 < heapSize && array[left + 1] > array[left]
                ? left + 1
                : left
        largest = array[largest] > array[index] ? largest : index
        if (largest === index) {
            break
        }
        swap(array, largest, index)
        index = largest
        left = index * 2 + 1
    }
}
function swap(array, l, r) {
    [array[l], array[r]] = [array[r], array[l]]
}

function heapSort(array) {
    if (Array.isArray(array)) {
        if (array.length < 2) {
            return
        }
        // O(N)
        // 数慢慢插入变成大根堆
        // for (let index = 0; index < array.length; index++) {
        //     hearInsert(array, index) // O(logN)
        // }
        // 换位变成大根堆
        for (let index = array.length - 1; index >= 0; index--) {
            heapify(array, index, array.length)
        }
        let heapSize = array.length
        swap(array, 0, --heapSize)
        // O(N)
        while (heapSize > 0) {
            heapify(array, 0, heapSize) // O(logN)
            swap(array, 0, --heapSize)
        }
    }
}
function hearInsert(array, index) {
    while (array[index] > array[parseInt((index - 1) / 2)]) {
        swap(array, index, parseInt((index - 1) / 2))
        index = parseInt((index - 1) / 2)
    }
}
let list = [2, 3, 4, 4, 6, 2, 2, 5, 9, 7, 1]
heapSort(list)
console.log(list)

```

## 9.桶排序
```js
// 获取个十百千位的数字 x数字，d第几位
function getDigit(x, d) {
    return parseInt(x / Math.pow(10, d - 1)) % 10
}
// 算出最长位数
function maxbits(array) {
    let max = 0
    for (let index = 0; index < array.length; index++) {
        max = Math.max(max, array[index])
    }
    let res = 0
    while (max !== 0) {
        res++
        max = parseInt(max / 10)
    }
    return res
}
function radixSort(arr) {
    if (Array.isArray(arr) && arr.length > 1) {
        radixSortHandle(arr, 0, arr.length - 1, maxbits(arr))
    } else {
        return false
    }
}
function radixSortHandle(arr, left, right, digit) {
    let radix = 10
    let j = 0
    let bucket = Array(right - left + 1).fill(0)
    for (let index = 0; index <= digit; index++) {
        let count = Array(radix).fill(0)
        for (let i = left; i <= right; i++) {
            j = getDigit(arr[i], index)
            count[j]++
        }
        for (let i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1]
        }
        let num = 0
        for (let i = right; i >= left; i--) {
            num = getDigit(arr[i], index)
            bucket[count[num] - 1] = arr[i]
            count[num]--
        }
        for (let i = left, j = 0; i <= right; i++, j++) {
            arr[i] = bucket[j]
        }
    }
}
let arry = [23, 34, 102, 32, 54, 32]
radixSort(arry)
console.log(arry)
```

## 8.复杂度
:::tip
1.稳定性: 同个个体之前，如果不因为排序而改变相对次序则为稳定  
2.递归行为的时间复杂度计算公式 `T(N) = aT(N/b) + O(N^d)`  
`>log(b,a) > d 复杂度为O(N^log(b,a))`  
`log(b,a) = d 复杂度为O(N^d*logN)`  
`log(b,a) < d 复杂度为O(N^d)`
:::

| 排序         | 是否稳定 | 最好时间复杂度 | 最坏时间复杂度 | 平均时间复杂度 | 空间复杂度 |
| ------------ | -------- | -------------- | -------------- | -------------- | ---------- |
| 冒泡排序     | 稳定     | O(N)           | O(N^2)         | O(N^2)         | O(1)       |
| 插入排序 | 稳定     | O(N)           | O(N^2)         | O(N^2)         | O(1)       |
| 选择排序 | 不稳定   | O(N^2)         | O(N^2)         | O(N^2)         | O(1)       |
| 堆排序       | 不稳定   | O(N * logN)      | O(N * logN)      | O(N * logN)      | O(1)       |
| 快速排序     | 不稳定   | O(N * logN)      | O(N^2)         | O(N * logN)      | O(logN)  |
| 归并排序     | 稳定     | O(N * logN)      | O(N * logN)      | O(N * logN)      | O(N)       |
::: danger
目前没找找到复杂度 O(N * logN)并且空间复杂度O(1)又稳定的排序！！！

通常不考虑稳定性会用快排，因为快排的常数项经过试验是最低的！考虑空间的话用堆排！
:::

## 8.比较器
>返回负数第一位放前  
>返回正数第二位放前  
>返回0不作为

例子：sort第二个参数的函数