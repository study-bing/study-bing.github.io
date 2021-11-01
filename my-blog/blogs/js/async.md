---
title: 模拟async await
date: 2021-11-01
tags:
    - js
categories:
    - js
---

## 1.用 generator 模式 async
co函数自动执行generator函数；
co 函数式判断是否已经执行到底，如果没有则继续 next(),直到执行完  
由于 async 返回的是 Promise 所以 co 函数 return 了 Promise

```js
function co(it) {
	return new Promise((resolve, reject) => {
		function next(data) {
			let { value, done } = it.next(data)
			if (done) {
				resolve(value)
			} else {
				Promise.resolve(value).then(res => {
					next(res)
				}, reject)
			}
		}
		next()
	})
}
```

## 2.测试

```js
function fn(nums) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(nums * 2)
		}, 1000)
	})
}
function* gen() {
	const num1 = yield fn(1)
	const num2 = yield fn(num1)
	const num3 = yield fn(num2)
	return num3
}
async function asyncFn() {
	const num1 = await fn(1)
	const num2 = await fn(num1)
	const num3 = await fn(num2)
	return num3
}
asyncFn().then(res => console.log(res)) // 3秒后输出 8
co(gen()).then(res => {
	console.log(res) // 3秒后输出 8
})
```
