---
title: 模拟call,apply,bind
date: 2021-09-08
tags:
    - js基础
categories:
    - js
---

## 1.介绍

call、apply、bind 都是改变 this 指向的方法  
不同之处：

call、apply 的区别：接受参数的方式不一样。

bind：不立即执行。而 apply、call 立即执行。

## 2.模拟 call

```js
Function.prototype.myCall = function(context, ...args) {
	context = context || globalThis
	context.fn = this
	let result = context.fn(...args)
	Reflect.deleteProperty(context, 'fn')
	return result
}
const testobj = {
	name: 'aaa',
	testFn(age) {
		console.log(`${this.name}${age}岁了`)
	}
}
const testobj2 = {
	name: 'bing'
}

testobj.testFn.myCall(testobj2, 22, 232) //bing22岁了
```

## 3.模拟 apply

```js
Function.prototype.myApply = function(context, ...args) {
	context = context || globalThis
	context.fn = this
	let result = context.fn(...args)
	Reflect.deleteProperty(context, 'fn')
	return result
}
const testobj = {
	name: 'aaa',
	testFn(age) {
		console.log(`${this.name}${age}岁了`)
	}
}
const testobj2 = {
	name: 'bing'
}

testobj.testFn.myApply(testobj2, 22, 232) //bing22岁了
```

## 3.模拟 bind

```js
Function.prototype.myApply = function(context, ...args) {
	context = context || globalThis
	context.fn = this
	let result = context.fn(...args)
	Reflect.deleteProperty(context, 'fn')
	return result
}
Function.prototype.myBind = function(context, ...args) {
	let fn = this
	return function(...arg2) {
		console.log([...args, ...arg2])
		return fn.my_apply(context, [...args, ...arg2])
	}
}
const testobj = {
	name: 'aaa',
	testFn(age) {
		console.log(`${this.name}${age}岁了`)
	}
}
const testobj2 = {
	name: 'bing'
}

let fn = testobj.testFn.myBind(testobj2, 22, 232)
fn() // bing22岁了
```
