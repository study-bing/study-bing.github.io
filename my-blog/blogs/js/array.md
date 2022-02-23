---
title: 常用的数组方法以及对象解构
date: 2021-11-12
tags:
 - js基础
categories:
 - js
---
## 1.数组方法
`join`  ：join()方法用于把数组中的所有元素转换一个字符串，默认使用逗号作为分隔符
``` js
let arr = [1, 2, 3]
console.log(arr.join()) // 1,2,3
console.log(arr.join('-')) // 1-2-3
console.log(arr) // [1,2,3](原数组不变)
```
`push`  ：push()方法从数组末尾向数组添加元素，可以添加一个或多个元素，改变原数组
```js
//pop()方法用于删除数组的最后一个元素并返回删除的元素
let arr1 = ['lily', 'lucy', 'Tom']
let count = arr1.push('Jack', 'Sean')
console.log(count) // 5,返回的是数组长度
console.log(arr1) // ['lily','lucy','Tom','Jack','Sean']
```
`pop`  ：pop()方法用于删除数组的最后一个元素并返回删除的元素
```js
let item = arr1.pop()
console.log(item) // Sean
console.log(arr1) // ['lily','lucy','Tom','Jack']
```
`unshift`：  unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度
```js
let arr2 = ['lily', 'lucy', 'Tom']
let count1 = arr2.unshift('Jack', 'Sean')
console.log(count1) // 5
console.log(arr2) // ['Jack','Sean','lily','lucy','Tom']
```
`shift` ： shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
```js
let item1 = arr2.shift()
console.log(item1) // Jack
console.log(arr2) // [''Sean','lily','lucy','Tom']
```
`sort`  ：用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序，默认排序顺序为按字母升序
```js
let arr3 = ['a', 'd', 'c', 'b']
console.log(
    arr3.sort((val1, val2) => {
        return val2 - val1
    })
) // ['a','b','c','d']
// ['100','23','32']
```
`reverse`  ：reverse()：用于颠倒数组中元素的顺序
```js
let arr4 = [13, 24, 51, 3]
console.log(arr4.reverse()) // [3,51,24,13]
console.log(arr4) // [3,51,24,13](原数组改变)
```
`concat`  ：concat()：用于连接两个或多个数组，该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
```js
let arr5 = [1, 3, 5, 7]
let arrCopy = arr5.concat(9, [11, 13])
console.log(arrCopy) // [1,3,5,7,9,11,13]
console.log(arr5) // [1,3,5,7](原数组未被修改)
```
`slice`  ：返回从原数组中指定开始下标到结束下标之间的项组成的新数组，可以接受一或两个参数，即要返回项的起始和结束位置(不包括结束位置的项)
```js
let arr6 = [1, 3, 5, 7, 9, 11]
let arrCopy1 = arr1.slice(1)
let arrCopy2 = arr1.slice(1, 4)
let arrCopy3 = arr1.slice(1, -2) // 相当于arr1.slice(1,4),负数从右开始数
let arrCopy4 = arr1.slice(-4, -1) // 相当于arr1.slice(2,5);
console.log(arr6) // [1,3,5,7,9,11](原数组没变)
console.log(arrCopy1) // [3,5,7,9,11]
console.log(arrCopy2) // [3,5,7]
console.log(arrCopy3) // [3,5,7]
console.log(arrCopy4) // [5,7,9]
```
`splice`  ：可以实现删除、插入和替换,改变原数组
>删除元素，并返回删除的元素，2个参数：起始位置和要删除的项数  
>向指定索引处添加或替换元素，3个参数：起始位置、0(要删除的项数)和要插入的项  
>替换元素
```js
//8-1 删除元素，并返回删除的元素，2个参数：起始位置和要删除的项数
let arr7 = [1, 3, 5, 7, 9, 11]
let arrRemoved = arr1.splice(0, 2)
console.log(arr7) // [5,7,9,11]
console.log(arrRemoved) // [1,3]

//8-2 向指定索引处添加或替换元素，3个参数：起始位置、0(要删除的项数)和要插入的项
// 添加元素
let arr8 = [22, 3, 31, 12]
arr8.splice(1, 0, 12, 35)
console.log(arr8) // [22,12,35,3,31,12]

// 替换元素
let arr9 = [22, 3, 8, 58]
arr9.splice(1, 1, 6) // [3]
console.log(arr9) // [22,6,8,58]
```
`forEach`  ：针对每一个元素执行提供的函数 没有返回值，会修改原数组
```js
let arr = [1,2,3]
arr.forEach(el => {
    console.log(el)
})
// 1,2,3
```
`map`  ：创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来，得到一个新的数组并返回
```js
let arr = [1,2,3]
let arrChange = arr.map(el => {
    return el + 1
})
// arrChange = [2,3,4]
```
`every`  ：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true
```js
let arr10 = [1, 2, 3, 4, 5]
let arr11 = arr10.every((x) => {
    return x < 10
})
console.log(arr11) // true

let arr12 = arr10.every((x) => {
    return x < 3
})
console.log(arr12) // false
```
`some`  ：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true
```js
let arr13 = arr10.some((x) => {
    return x < 5
})
console.log(arr13) //true
let arr14 = arr10.some((x) => {
    return x < 1
})
console.log(arr14) //false
```
`includes`  ：用来判断一个数组是否包含一个指定的值，使用===运算符来进行值比较如果是返回true，否则false，参数有两个，第一个是(必填)需要查找的元素值，第二个是(可选)开始查找元素的位置
```js
let arr15 = [22, 3, 31, 12, 58]
let includes = arr15.includes(31)
console.log(includes) // true

let includes2 = arr15.includes(31, 3) // 从索引3开始查找31是否存在
console.log(includes2) // false
```
`14、reduce和reduceRight()`  ：都会实现迭代数组的所有项(即累加器)，然后构建一个最终返回的值
> reduce()方法从数组的第一项开始，逐个遍历到最后  
> reduceRight()方法从数组的最后一项开始。向前遍历到第一项
```js

//4个参数：前一个值、当前值、项的索引和数组对象
let arr16 = [1, 2, 3, 4, 5]
let sum = arr16.reduce((prev, cur, index, array) => {
    console.log(index)
    console.log(array)
    return prev + cur
}, 10) // 数组一开始加了一个初始值10，可以不设默认0
console.log(sum) // 25
```
`entries()、keys()和values()`  ：entries()、keys()和values()--用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历区别是keys()是对键名的遍历、values()是对键值的遍历、entries()是对键值对的遍历
```js
for (let index of ['a', 'b'].keys()) {
    console.log(index)
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
    console.log(elem)
}
// a
// b

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem)
}
// 0 'a'
// 1 'b'
```
`14.toLocaleString()和toString()`  ：都是将数组转换为字符串
```js
let arr17 = [22, 3, 31, 12]
let str = arr17.toLocaleString()
let str2 = arr17.toString()
console.log(str) // 22,3,31,12
console.log(str2) // 22,3,31,12

```
## 2.对象解构
```js
//一：解构用于变量声明
//对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
//而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
foo // "aaa"
bar // "bbb"

//等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。
//第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined。
let { bar1, foo1 } = { foo1: 'aaa', bar1: 'bbb' }
console.log(bar1) // "bbb"
console.log(foo1) //'aaa'

let { baz } = { foo1: 'aaa', bar1: 'bbb' }
console.log(baz) // undefined
//对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
console.log(f) // 'hello'
console.log(l) // 'world'

//对象的解构也可以指定默认值,默认值生效的条件是，对象的属性值严格等于undefined。
let { x = 3 } = {}
console.log(x) // 3

let { x1, y1 = 5 } = { x1: 1 }
console.log(x1) // 1
console.log(y1) // 5

let { x2: y2 = 3 } = {}
console.log(y2) // 3

let { x3: y3 = 3 } = { x3: 5 }
console.log(y3) // 5

let { message: msg = 'Something went wrong' } = {}
console.log(msg) // "Something went wrong"
let { x4 = 3 } = { x: undefined }
console.log(x4) // 3

let { x5 = 3 } = { x5: null }
console.log(x5) // null
```