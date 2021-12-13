---
title: 对象的一些方法
date: 2021-05-20
tags:
    - js基础
categories:
    - js
---

## 1.仿 new 函数

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
new 关键字会进行如下的操作：

创建一个空的简单 JavaScript 对象（即{}）；
为步骤 1 新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象 ；
将步骤 1 新创建的对象作为 this 的上下文 ；
如果该函数没有返回对象，则返回 this

```js
function newTest(context, args) {
	let obj = Object.create(context.prototype)
	let result = context.apply(obj, args)
	return typeof result === 'object' ? obj || result : obj
}
```

## 2.仿 instanceof

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

```js
function myInstanceof(obj, Fn) {
	let left = obj.__proto__
	let right = Fn.prototype
	while (left) {
		if (left === right) {
			return true
		}
		left = left.__proto__
	}
	return false
}

function Car(make, model, year) {
	this.make = make
	this.model = model
	this.year = year
}
const auto = new Car('Honda', 'Accord', 1998)

console.log(myInstanceof(auto, Car))
// expected output: true

console.log(myInstanceof(auto, Object))
// expected output: true
```

## 3.浅拷贝

开发了很久才发现自己把赋值和浅拷贝混为一谈了，2 个有本质的区别  
赋值：对于基本数据类型来说，当我们进行赋值操作（=）时，实际上是在内存中新开一段栈内存，然后再将值赋值到新的栈中

浅拷贝：指创建一个新对象，该对象拥有原始对象*第一层属性的精确拷贝*。即：如果原始对象的属性是基本类型数据，则拷贝的就是基本数据类型的值；如果原始对象的属性是引用类型，则拷贝的是内存地址。当原始对象的引用类型属性发生改变时，拷贝对象的对应属性值也会发生变化。这里需要强调一下，浅拷贝与赋值是有所区别的，赋值时与原数据指向同一对象，而浅拷贝则指向了不同对象。

```js
function shallowCopy(target) {
	if (typeof target === 'object' && target !== null) {
		if (Array.isArray(target)) {
			return [...target]
		} else {
			return { ...target }
		}
	} else {
		return target
	}
}
function shallowCopy2(target) {
	if (typeof target === 'object' && target !== null) {
		let result = Array.isArray(target) ? [] : {}
		for (const key in target) {
			if (Object.hasOwnProperty.call(target, key)) {
				result[key] = target[key]
			}
		}
	} else {
		return target
	}
}
```

## 4.深拷贝
深拷贝不会拷贝引用类型的引用，而是将引用类型的值全部拷贝一份，形成一个新的引用类型，这样就不会发生引用错乱的问题，使得我们可以多次使用同样的数据，而不用担心数据之间会起冲突
```js
function deepClone1(target) {
	// 无法拷贝函数，内部环引用会报错
	return JSON.parse(JSON.stringify(target))
}

function deepClone2(target, map = new Map()) {
	if (typeof target === 'object' && target !== null) {
		let isArray = Array.isArray(target)
		// 解决环引用
		let cache = map.get(target)
		if (cache) {
			return cache
		}
		let result = isArray ? [] : {}
		map.set(target, result)
		if (isArray) {
			target.forEach(key => {
				result[key] = deepClone2(target[key], map)
			})
		} else {
			for (const key of Object.keys(target)) {
				result[key] = deepClone2(target[key], map)
			}
		}
		return result
	} else {
		return target
	}
}
```
