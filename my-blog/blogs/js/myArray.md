---
title: 常用的数组方法自我实现
date: 2021-05-18
tags:
    - js基础
categories:
    - js
---

## 1.some

```js
Array.prototype.mySome = function(cb) {
	let list = this
	for (let i = 0; i < list.length; i++) {
		const element = list[i]
		let res = cb(element, i)
		if (res) {
			return true
		}
	}
	return false
}
// let res = [1, 2, 3, 4].mySome(el => {
// 	return el > 2
// })
// console.log('mySome', res)
```

## 2.every

```js
Array.prototype.myEvery = function(cb) {
	let list = this
	for (let i = 0; i < list.length; i++) {
		const element = list[i]
		let res = cb(element, i)
		if (!res) {
			return false
		}
	}
	return true
}
// res = [1, 2, 3, 4].myEvery(el => {
// 	return el > 0
// })
// console.log('myEvery', res)
```

## 3.map

```js
Array.prototype.myMap = function(cb) {
	let list = this
	let result = []
	for (let i = 0; i < list.length; i++) {
		result.push(cb(list[i], i))
	}
	return result
}
// res = [1, 2, 3, 4].myMap(el => {
// 	return el + 1
// })
// console.log('myMap', res)
```

## 4.filter

```js
Array.prototype.myFilter = function(cb) {
	let list = this
	let result = []
	for (let i = 0; i < list.length; i++) {
		if (cb(list[i], i)) {
			result.push(list[i])
		}
	}
	return result
}
// res = [1, 2, 3, 4].myFilter(el => {
// 	return el > 1
// })
// console.log('myFilter', res)
```

## 5.find

```js
Array.prototype.myFind = function(cb) {
	let list = this
	for (let i = 0; i < list.length; i++) {
		if (cb(list[i], i)) {
			return list[i]
		}
	}
	return
}
// res = [1, 2, 3, 4].myFind(el => {
// 	return el > 1
// })
// console.log('myFind', res)
```

## 6.findIndex

```js
Array.prototype.myFindIndex = function(cb) {
	let list = this
	for (let i = 0; i < list.length; i++) {
		if (cb(list[i], i)) {
			return i
		}
	}
	return -1
}
// res = [1, 2, 3, 4].myFindIndex(el => {
// 	return el > 6
// })
// console.log('myFindIndex', res)
```

## 7.reduce

```js
Array.prototype.myReduce = function(cb, initValue) {
	let list = this
	if (list.length === 0) {
		return []
	}
	let result = initValue
	for (let i = 0; i < list.length; i++) {
		// 判断是否初始值
		if (result == null) {
			result = list[i]
		} else {
			result = cb(result, list[i], i, list)
		}
	}
	return result
}
const array1 = [1, 2, 3, 4]
const reducer = (previousValue, currentValue) => previousValue + currentValue

// 1 + 2 + 3 + 4
// console.log(array1.myReduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
// console.log(array1.myReduce(reducer, 5));
// expected output: 15
// res = [1, 2, 3, 4].myReduce((pre, current, index, list) => {
// 	return pre + current
// }, 0)
// console.log('myReduce', res)
```

## 8.myUnique 去重

```js
// for实现
Array.prototype.myUnique = function() {
	let list = this
	let result = []
	let obj = Object.create(null)
	for (let i = 0; i < list.length; i++) {
		const element = list[i]
		if (!obj[element]) {
			obj[element] = true
			result.push(element)
		}
	}
	return result
}
// es6 Set
Array.prototype.myUnique = function() {
	let list = this
	return [...new Set(list)]
}
// res = [1, 2, 3, 4, 1, 2, 3, 4].myUnique()
// console.log('myUnique', res)
```

## 9.slice

```js
Array.prototype.mySlice = function(begin = 0, end) {
	let list = this
	if (list.length === 0) {
		return []
	}
	if (begin < 0) {
		begin = list.length + begin
	}
	end = end > list.length ? list.length : end || list.length
	if (end < 0) {
		end = list.length + end
	}
	if (begin > end) {
		return []
	}
	let result = []
	for (let i = begin; i < end; i++) {
		const element = list[i]
		result.push(element)
	}
	return result
}
res = [1, 2, 3, 4].mySlice([5, 6, 7], 8, 9)
console.log('mySlice', res)
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals.mySlice(2))
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.mySlice(2, 4))
// expected output: Array ["camel", "duck"]

console.log(animals.mySlice(1, 5))
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.mySlice(-2))
// expected output: Array ["duck", "elephant"]

console.log(animals.mySlice(2, -1))
// expected output: Array ["camel", "duck"]
```

## 10.flat

```js
function isEmpty(data) {
	if (typeof data === 'undefined' || data === '' || data === null) {
		return true
	} else {
		return false
	}
}
Array.prototype.myFlat = function (depth = 1) {
	let list = this
	let result = []
	return list.reduce((preValue, current) => {
		if (Array.isArray(current)) {
			if (depth - 1 > 0) {
				preValue = preValue.concat(current.myFlat(depth - 1))
			} else {
				preValue = preValue.concat(current)
			}
		} else if (!isEmpty(current)) {
			preValue = preValue.concat(current)
		}
		return preValue
	}, result)
}
var arr1 = [1, 2, [3, 4]]
console.log(arr1.myFlat())
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]]
console.log(arr2.myFlat())
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]]

console.log(arr3.myFlat(2))
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]

console.log(arr4.myFlat(Infinity))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
